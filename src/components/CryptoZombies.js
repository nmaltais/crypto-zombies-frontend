
import { useWeb3React } from '@web3-react/core';
import { useState, useEffect, useRef} from 'react';
import  {ABI, address} from './config.js';
import Zombie from  './Zombie';

function CryptoZombies() {
  const { account, library }  = useWeb3React();
  let cryptoZombies = new library.eth.Contract(ABI, address);

  const [army, setArmy] = useState([]);

  function getZombiesByOwner(owner) {
    return cryptoZombies.methods.getZombiesByOwner(owner).call();
  }

  const refreshArmy = useRef(() => {});
  refreshArmy.current = (account) => {
    setArmy([]);
    getZombiesByOwner(account).then(zombies => {
      console.log({zombies});
      zombies.forEach(zombie => {
        getZombieDetails(zombie).then(
          (zombieDetails) => {
            console.log(zombieDetails);
            setArmy( prevArmy => [...prevArmy, zombieDetails])
          }
        );
      });
    });
  }

  useEffect(() => {
    refreshArmy.current(account);
  }, [account, refreshArmy]);


  function getZombieDetails(id) {
    return cryptoZombies.methods.zombies(id).call();
  }
  
  function createRandomZombie(name = 'NoName') {
    // This is going to take a while, so update the UI to let the user know
    // the transaction has been sent
    return cryptoZombies.methods.createRandomZombie(name)
    .send({ from: account })
    .on("receipt", function(receipt) {
      console.log({receipt});
      console.log("Successfully created " + name + "!")
      // Transaction was accepted into the blockchain, let's redraw the UI
      refreshArmy.current(account);
    })
    .on("error", function(error) {
      console.error({error});
      // Do something to alert the user their transaction has failed
    });
  }
  // function zombieToOwner(id) {
  //   return cryptoZombies.methods.zombieToOwner(id).call()
  // }

  const renderedArmy = army.map(zombie => <li key={zombie.dna}><Zombie dna={zombie.dna}/></li>);

  return (
    <div>
      {army.length ?
        <div>
          <h1>Your army:</h1>
          <ul>{renderedArmy}</ul>
        </div>
      :
        <div>
          <h1>You have no zombies</h1>
          <button onClick={() => createRandomZombie()}>Give me a random Zombie</button>
        </div>
      }
    </div>
  )
}

export default CryptoZombies;
