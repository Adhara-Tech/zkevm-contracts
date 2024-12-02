import { ethers } from "hardhat";
import hre from "hardhat";
import fs from "fs";
import input from "./input.json";

import {
  PolygonZkEVMBridgeV2,
} from "../../typechain-types";

async function main() {
  const output = input;
  const outputPath = "info.json"
  if(hre.network.name = "zkevmDevnet") {
    hre.config.networks.zkevmDevnet.url = input.rpc;
  }
  const bridgeFactory = await ethers.getContractFactory("PolygonZkEVMBridgeV2");
  const polygonZkEVMBridgeContract = bridgeFactory.attach(input.bridgeAddress) as PolygonZkEVMBridgeV2;
  const gasTokenMetadata = await polygonZkEVMBridgeContract.getTokenMetadata(input.gasTokenAddress);
  output.gasTokenMetadata = gasTokenMetadata;
  await fs.writeFileSync(outputPath, JSON.stringify(output, null, 1))
}

main().then(() => {
    process.exit(0);
}, (err) => {
    console.log(err.message);
    console.log(err.stack);
    process.exit(1);
});