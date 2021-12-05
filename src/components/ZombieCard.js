import Button from "@mui/material/Button";
import { useState } from "react";
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
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import UndoIcon from "@mui/icons-material/Undo";
import "./Zombie.css";
import Zombie from "./Zombie";
import status from "./ZombieStatus";
import Countdown from "./Countdown";

const ZombieCard = (props) => {
  const { zombie, levelUp, changeName, attackRandomEnemyZombie } = props;
  const [isChangingName, setIsChangingName] = useState(false);
  const [zombieNameInput, setZombieNameInput] = useState(zombie.name);

  const editNameBtn = (
    <IconButton
      disabled={zombie.status !== status.READY}
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
  );

  const saveNameBtn = (
    <IconButton
      disabled={
        !zombieNameInput.trim() ||
        zombieNameInput.trim() === zombie.name ||
        zombie.status !== status.READY
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
  );

  const undoNameChangeBtn = (
    <IconButton
      disabled={zombie.status !== status.READY}
      color="secondary"
      edge="end"
      size="small"
      style={{ margin: "3px 0px 0px 5px" }}
      onClick={async () => {
        setZombieNameInput(zombie.name);
        setIsChangingName(false);
      }}
    >
      <UndoIcon />
    </IconButton>
  );

  return (
    <Card>
      <CardActionArea>
        <CardMedia>
          <Zombie dna={zombie.dna} />
        </CardMedia>
        <CardContent>
          {zombie.status !== status.READY ? (
            <div
              style={{
                width: "100%",
                height: "calc(100% - 33vh)",
                backgroundColor: "black",
                position: "absolute",
                top: "33vh",
                left: 0,
                zIndex: 10,
                opacity: 0.9,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography gutterBottom variant="h5" component="h2">
                {zombie.status}
              </Typography>
            </div>
          ) : (
            ""
          )}
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
                  {!zombieNameInput.trim() ||
                  zombieNameInput.trim() === zombie.name
                    ? undoNameChangeBtn
                    : saveNameBtn}
                </Box>
              </>
            ) : (
              <>
                <Box>
                  <Typography gutterBottom variant="h5" component="h2">
                    {zombie.name}
                  </Typography>
                </Box>
                {zombie.level > 1 ? <Box>{editNameBtn}</Box> : ""}
              </>
            )}
          </Box>
          <Typography color="textSecondary" component="p">
            Level: {zombie.level}
            <br />
            DNA: {zombie.dna}
            <br />
            Ready Time: {zombie.readyTime}
            <br />
            Ready In:{" "}
            <Countdown
              targetTime={zombie.readyTime * 1000}
              updateInterval={1000 * 60}
            />
            <br />
            ID: {zombie.id}
            <br />
            Wins: {zombie.winCount}
            <br />
            Losses: {zombie.lossCount}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          disabled={zombie.status !== status.READY}
          size="small"
          color="primary"
          onClick={() => {
            levelUp(zombie);
          }}
        >
          Level Up{" "}
          <AttachMoneyRoundedIcon
            style={{ fontSize: "20px", margin: "-1px 0px 0px 0px" }}
          />
        </Button>
        <Button
          disabled={
            zombie.status !== status.READY ||
            zombie.readyTime * 1000 > Date.now()
          }
          size="small"
          color="primary"
          onClick={() => {
            attackRandomEnemyZombie(zombie);
          }}
        >
          Attack
        </Button>
      </CardActions>
    </Card>
  );
};

export default ZombieCard;
