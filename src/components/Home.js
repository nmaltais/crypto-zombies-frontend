import { useWeb3React } from "@web3-react/core"
import { injected } from "./wallet/Connectors"
import CryptoZombies from "./CryptoZombies";

export default function Home() {
  const { active, account, activate, deactivate } = useWeb3React();

  async function connect() {
    try {
      await activate(injected)
    } catch (err) {
      console.error(err);
    }
  }

  async function disconnect() {
    try {
      deactivate()
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      {
        active ? 
          <>
            <span>Connected with <b>{account}</b></span>
            <br/>
            <button onClick={disconnect}>Disconnect</button>
            <CryptoZombies />
          </>
        : 
        <>
          <span>Not connected</span>
          <br/>
          <button onClick={connect}>Connect to MetaMask</button>
        </>
      }
    </div>
  )
}