
import { useWeb3React } from '@web3-react/core';
import { useState, useEffect, useRef} from 'react';
import  {ABI, address} from './config.js';
import Zombie from  './Zombie';

function CryptoZombies() {
  const { account, library }  = useWeb3React();
  let cryptoZombies = new library.eth.Contract(ABI, address);

  const [army, setArmy] = useState([]);

  const getZombiesByOwner = useRef(() => {});
  getZombiesByOwner.current = (owner) => {
    return cryptoZombies.methods.getZombiesByOwner(owner).call()
  }

  const updateArmy = useRef(() => {});
  updateArmy.current = (zombies) => {
    zombies.forEach(zombie => {
      getZombieDetails(zombie).then(
        zombieDetails => setArmy( prevArmy => [...prevArmy, zombieDetails])
      );
    });
  }

  useEffect(() => {
    getZombiesByOwner.current(account).then(updateArmy.current);
    setArmy([]);
  }, [account, updateArmy, getZombiesByOwner]);


  function getZombieDetails(id) {
    return cryptoZombies.methods.zombies(id).call()
  }
  // function zombieToOwner(id) {
  //   return cryptoZombies.methods.zombieToOwner(id).call()
  // }

  // let armyPics = army.map(zombie => <li><Zombie2 key={zombie.dna} dna={zombie.dna} /></li>);\

  return (
    <div>
      {army.length ?
        <div>
          <h1>Your army:</h1>
          <ul>{army.map(zombie => <li key={zombie.dna}><Zombie dna={zombie.dna} /></li>)}</ul>
        </div>
      :
      `You have no zombies`}
    </div>
  )
  // return (
  //   army.length ?
  //   `Your army of zombies: ${JSON.stringify(army)}`
  //   :
  //   `You have no zombies`
  // )
}

export default CryptoZombies;
