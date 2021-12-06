import { useWeb3React } from "@web3-react/core";
import { injected } from "./wallet/Connectors";
import CryptoZombies from "./CryptoZombies";
import {
  AppBar,
  Toolbar,
  Button,
  useTheme,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Icon,
} from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function Home(props) {
  const { toggleTheme } = props;
  const theme = useTheme();
  const { active, account, activate, deactivate } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (err) {
      console.error(err);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <ToggleButtonGroup
            value={theme.palette.mode}
            exclusive
            onChange={(event, value) => {
              if (value) {
                toggleTheme(value);
              }
            }}
            sx={{ flexGrow: 1 }}
          >
            <ToggleButton
              value="dark"
              aria-label="dark"
              title="Dark Mode"
              alt="Dark Mode"
            >
              <DarkModeIcon />
            </ToggleButton>
            <ToggleButton
              value="light"
              aria-label="light"
              title="Light Mode"
              alt="Light Mode"
            >
              <LightModeIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          {active ? (
            <div style={{ float: "right", textAlign: "right" }}>
              <span>
                Connected with <b>{account}</b>
              </span>
              <br />
              <Button onClick={disconnect}>Disconnect</Button>
            </div>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
      <div>
        {active ? (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: '100%',
            }}
          >
            <CryptoZombies />
          </div>
        ) : (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "35%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <Typography variant="h2">Connect your wallet.</Typography>
            <br />
            <Button
              onClick={connect}
              variant="outlined"
              style={{ fontWeight: "bold" }}
              startIcon={
                <Icon style={{ height: "4vh", width: "4vh" }}>
                  <img
                    src="./img/Logo_MetaMask.svg"
                    alt=""
                    style={{
                      verticalAlign: "top",
                      height: "4vh",
                      width: "4vh",
                    }}
                  />
                </Icon>
              }
            >
              Connect to MetaMask
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
