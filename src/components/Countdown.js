import { useState, useEffect } from "react";

const calculateTimeLeft = (targetTime) => {
  let difference = targetTime - Date.now();
  let timeLeft = {
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
    text: "",
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
    timeLeft.text = `${timeLeft.days > 0 ? timeLeft.days + "days " : ""}
                      ${timeLeft.hours > 0 ? timeLeft.hours + "h " : ""}
                      ${timeLeft.minutes > 0 ? timeLeft.minutes + "m " : ""}`;
  }

  return timeLeft;
};

/**
 * @param targetTime - date in miliseconds when the countdown should reach 0
 * @param updateInterval - frequency of updates in miliseconds
 * @returns time left in miliseconds since last update
 */
export default function Countdown(props) {
  const { targetTime, updateInterval } = props;
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetTime));

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(targetTime));
    }, updateInterval);
  }, [timeLeft, targetTime, updateInterval]);
  
  return timeLeft.text;
}
