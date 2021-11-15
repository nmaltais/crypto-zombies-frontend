import { useWeb3React } from "@web3-react/core";
import { useState, useEffect, useRef } from "react";
import { ABI, address } from "./config.js";
import { Typography, Button } from "@mui/material";
import ZombieCard from "./ZombieCard.js";
import Box from "@mui/material/Box";

function CryptoZombies() {
  const { account, library } = useWeb3React();
  let cryptoZombies = new library.eth.Contract(ABI, address);

  const [isFetchingArmy, setIsFetchingArmy] = useState(true);
  const [army, setArmy] = useState([]);

  function getZombiesByOwner(owner) {
    return cryptoZombies.methods.getZombiesByOwner(owner).call();
  }

  const refreshArmy = useRef(() => {});
  refreshArmy.current = (account) => {
    setIsFetchingArmy(true);
    setArmy([]);
    debugger;
    getZombiesByOwner(account).then((zombies) => {
      console.log({ zombies });
      debugger;
      zombies.forEach((zombie) => {
        getZombieDetails(zombie).then((zombieDetails) => {
          console.log(zombieDetails);
          setArmy((prevArmy) => [...prevArmy, zombieDetails]);
          setIsFetchingArmy(false);
        });
      });
    });
    debugger;
  };

  useEffect(() => {
    refreshArmy.current(account);
  }, [account, refreshArmy]);

  function getZombieDetails(id) {
    return cryptoZombies.methods.zombies(id).call();
  }

  function createRandomZombie(name = "NoName") {
    // This is going to take a while, so update the UI to let the user know
    // the transaction has been sent
    return cryptoZombies.methods
      .createRandomZombie(name)
      .send({ from: account })
      .on("receipt", function (receipt) {
        console.log({ receipt });
        console.log("Successfully created " + name + "!");
        // Transaction was accepted into the blockchain, let's redraw the UI
        refreshArmy.current(account);
      })
      .on("error", function (error) {
        console.error({ error });
        // Do something to alert the user their transaction has failed
      });
  }
  // function zombieToOwner(id) {
  //   return cryptoZombies.methods.zombieToOwner(id).call()
  // }

  const renderedArmy = army.map((zombie) => (
    <Box key={zombie.dna} sx={{ m: 2 }}>
      <ZombieCard zombie={zombie} />
    </Box>
  ));

  return (
    <div>
      {isFetchingArmy ? (
        <Typography variant="h2" align="center">
          Loading...
        </Typography>
      ) : (
        ""
      )}
      {!isFetchingArmy && army.length ? (
        <div>
          <Typography
            variant="h3"
            align="center"
            style={{ marginBottom: "5vh", textTransform: "uppercase" }}
          >
            Your troops
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {renderedArmy}
          </Box>
        </div>
      ) : (
        ""
      )}
      {!isFetchingArmy && !army.length ? (
        <div>
          <Typography variant="h2">You have no zombies</Typography>
          <Button onClick={() => createRandomZombie()}>
            Give me a random Zombie
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CryptoZombies;
