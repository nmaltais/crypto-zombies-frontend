import Button from '@mui/material/Button';
import "./Zombie.css";
import Zombie from "./Zombie";
import React from 'react';
import { Card, CardActionArea, CardContent, Typography, CardActions } from '@mui/material';

const ZombieCard = (props) => {
  const { zombie } = props;

  return (
    <Card>
    <CardActionArea>
      <Zombie dna={zombie.dna} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {zombie.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Level: {zombie.level}
          <br/>
          DNA: {zombie.dna}
          <br/>
          Ready Time: {zombie.readyTime}
          <br/>
          Wins: {zombie.winCount}
          <br/>
          Losses: {zombie.lossCount}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary">
        Share
      </Button>
      <Button size="small" color="primary">
        Learn More
      </Button>
    </CardActions>
    </Card>
  );
};

export default ZombieCard;
