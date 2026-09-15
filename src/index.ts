import { readConfig, setConfig } from "./lib/config.js";

const main = () => {
  setConfig("adamakram2");
  const config = readConfig();
  console.log(config);
}

main();