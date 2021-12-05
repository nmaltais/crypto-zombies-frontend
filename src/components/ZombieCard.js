import Button from "@mui/material/Button";
import "./Zombie.css";
import Zombie from "./Zombie";
import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  CardMedia,
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";

const ZombieCard = (props) => {
  const { zombie, levelUp, changeName } = props;
  const [isChangingName, setIsChangingName] = useState(false);
  const [zombieNameInput, setZombieNameInput] = useState(zombie.name);

  return (
    <Card style={{ backgroundColor: zombie.inTransaction ? "red" : "" }}>
      <CardActionArea>
        <CardMedia>
          <Zombie dna={zombie.dna} />
        </CardMedia>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {isChangingName ? (
              <>
                <Box>
                  <TextField
                    autoFocus
                    id="zombieChangeNameField"
                    label=""
                    size="small"
                    variant="outlined"
                    value={zombieNameInput}
                    onChange={(e) => {
                      setZombieNameInput(e.target.value);
                    }}
                  />
                </Box>
                <Box>
                  <IconButton
                    disabled={
                      zombieNameInput.trim() === zombie.name ||
                      zombie.inTransaction
                    }
                    color="secondary"
                    edge="end"
                    size="small"
                    style={{ margin: "3px 0px 0px 5px" }}
                    onClick={async () => {
                      await changeName(zombie, zombieNameInput.trim());
                      setIsChangingName(false);
                    }}
                  >
                    <SaveTwoToneIcon />
                  </IconButton>
                </Box>
              </>
            ) : (
              <>
                <Box>
                  <Typography gutterBottom variant="h5" component="h2">
                    {zombie.name}
                  </Typography>
                </Box>
                <Box>
                  <IconButton
                    disabled={zombie.inTransaction}
                    color="secondary"
                    edge="end"
                    size="small"
                    style={{ margin: "-1px 0px 0px 5px" }}
                    onClick={() => {
                      setIsChangingName(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              </>
            )}
          </Box>
          <Typography variant="body2" color="textSecondary" component="p">
            Level: {zombie.level}
            <br />
            DNA: {zombie.dna}
            <br />
            Ready Time: {zombie.readyTime}
            <br />
            Wins: {zombie.winCount}
            <br />
            Losses: {zombie.lossCount}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          disabled={zombie.inTransaction}
          size="small"
          color="primary"
          onClick={() => {
            levelUp(zombie);
          }}
        >
          Level Up ($)
        </Button>
        <Button disabled={zombie.inTransaction} size="small" color="primary">
          Attack
        </Button>
      </CardActions>
    </Card>
  );
};

export default ZombieCard;
