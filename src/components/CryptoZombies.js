import { useWeb3React } from "@web3-react/core";
import { useState, useEffect, useRef } from "react";
import { ABI, address } from "./config.js";
import { Typography, Button } from "@mui/material";
import ZombieCard from "./ZombieCard.js";
import Box from "@mui/material/Box";
import status from "./ZombieStatus";

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
    getZombiesByOwner(account).then((zombieIds) => {
      console.log({ zombieIds });
      zombieIds.forEach((zombieId) => {
        getZombieDetails(zombieId).then((zombieDetails) => {
          console.log({zombieDetails});
          zombieDetails.id = zombieId;
          zombieDetails.status = status.READY;
          setArmy((prevArmy) => [...prevArmy, zombieDetails]);
          setIsFetchingArmy(false);
        });
      });
    });
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
  function updateZombieAttributes(newZombieObj) {
    setArmy((prevArmy) => {
      return prevArmy.map(z => {
        if(z.id === newZombieObj.id){
          z = newZombieObj;
        }
        return z;
      })
    });
  }

  const levelUp = (zombie) => {
    console.log('leveling up...');
    updateZombieAttributes({...zombie, status: status.LEVELING_UP});
    return cryptoZombies.methods
      .levelUp(zombie.id)
      .send({ from: account, value: library.utils.toWei("0.001", "ether") })
      .on("receipt", function (receipt) {
        console.log({ receipt });
        console.log("Successfully leveled up!");
        // Transaction was accepted into the blockchain, let's redraw the UI
        updateZombieAttributes({...zombie, level: parseInt(zombie.level)+1, status: status.READY});
      })
      .on("error", function (error) {
        console.error({ error });
        // Do something to alert the user their transaction has failed
        console.log('failed');
        updateZombieAttributes({...zombie, status: status.READY});
      });
  }

  const changeName = (zombie, newName) => {
    console.log('changing name...');
    updateZombieAttributes({...zombie, status: status.CHANGING_NAME});
    return cryptoZombies.methods
      .changeName(zombie.id, newName)
      .send({ from: account })
      .on("receipt", function (receipt) {
        console.log({ receipt });
        console.log("Successfully changed name!");
        // Transaction was accepted into the blockchain, let's redraw the UI
        updateZombieAttributes({...zombie, name: newName, status: status.READY});
      })
      .on("error", function (error) {
        console.error({ error });
        // Do something to alert the user their transaction has failed
        console.log('failed');
        updateZombieAttributes({...zombie, status: status.READY});
      });
  }

  const attackRandomEnemyZombie = async (zombie) => {
    updateZombieAttributes({...zombie, status: status.ATTACKING});
    // // Get total number of zombies
    // const numZombies = await cryptoZombies.methods.totalZombies.call((e, num) => {
    //   return num;
    // });
    // // Get a random zombie until the owner of that zombie is not the current user
    // let targetZombieOwner = null;
    let randZombieId = 3;//null;
    // do {
    //   randZombieId = Math.floor(Math.random() * numZombies);
    //   targetZombieOwner = await cryptoZombies.methods.zombieToOwner(randZombieId).call((e, owner) => {
    //     return owner;
    //   });
    // }
    // while (targetZombieOwner === account);

    // Attack that random enemy zombie
    return cryptoZombies.methods
    .attack(zombie.id, randZombieId)
    .send({ from: account })
    .on("receipt", function (receipt) {
      console.log({ receipt });
      console.log("Successfully attacked zombie!");
      // Transaction was accepted into the blockchain, let's redraw the UI
      refreshArmy.current(account);
    })
    .on("error", function (error) {
      console.error({ error });
      // Do something to alert the user their transaction has failed
      console.log('failed');
      updateZombieAttributes({...zombie, status: status.READY});
    });
  }

  const renderedArmy = army.map((zombie) => (
    <Box key={zombie.dna} sx={{ m: 2 }}>
      <ZombieCard zombie={zombie} levelUp={levelUp} changeName={changeName} attackRandomEnemyZombie={attackRandomEnemyZombie} />
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
