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
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SellIcon from "@mui/icons-material/Sell";
import LockClockIcon from "@mui/icons-material/LockClock";
import UndoIcon from "@mui/icons-material/Undo";
import "./Zombie.css";
import Zombie from "./Zombie";
import status from "./ZombieStatus";
import Countdown from "./Countdown";

const ZombieCard = (props) => {
  const { zombie, levelUp, changeName, attackRandomEnemyZombie } = props;
  const [isChangingName, setIsChangingName] = useState(false);
  const [zombieNameInput, setZombieNameInput] = useState(zombie.name);

  const isCoolingDown = () => {
    return zombie.readyTime * 1000 > Date.now();
  };

  const editNameBtn = (
    <IconButton
      disabled={zombie.status !== status.READY || zombie.level < 2}
      title={
        zombie.level < 2
          ? "This Zombie needs to reach level 2 before you can change its name."
          : "Change this Zombie's name."
      }
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
      title="Save name change."
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
      title="Undo name change."
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

  const attackBtn = (
    <Button
      disabled={zombie.status !== status.READY || isCoolingDown()}
      title="Eat brains to contaminate people and grow your army."
      size="small"
      color="primary"
      onClick={() => {
        attackRandomEnemyZombie(zombie);
      }}
      endIcon={
        isCoolingDown() ? (
          <Box
            sx={{
              display: "flex",
              maxHeight: "20px",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <LockClockIcon
              style={{
                margin: "4px 0px -2px 0px",
                fontSize: "18px",
              }}
            />
            <Typography
              style={{
                fontSize: "8px",
                textTransform: "none",
              }}
            >
              <Countdown
                targetTime={zombie.readyTime * 1000}
                updateInterval={1000 * 60}
              />
            </Typography>
          </Box>
        ) : (
          <LocalDiningIcon />
        )
      }
    >
      Eat Brains
    </Button>
  );

  const levelUpBtn = (
    <Button
      disabled={zombie.status !== status.READY}
      title="Level up this Zombie for a fee."
      size="small"
      color="primary"
      onClick={() => {
        levelUp(zombie);
      }}
      endIcon={<SellIcon />}
    >
      Level Up
    </Button>
  );

  return (
    <Card style={{overflow: 'visible'}}>
      <CardActionArea style={{overflow: 'visible'}}>
        <CardMedia style={{overflow: 'visible'}}>
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
                <Box>{editNameBtn}</Box>
              </>
            )}
          </Box>
          <Typography color="textSecondary" component="p">
            Level: {zombie.level}
            <br />
            DNA: {zombie.dna}
            <br />
            Wins: {zombie.winCount}
            <br />
            Losses: {zombie.lossCount}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        {levelUpBtn}
        {attackBtn}
      </CardActions>
    </Card>
  );
};

export default ZombieCard;
