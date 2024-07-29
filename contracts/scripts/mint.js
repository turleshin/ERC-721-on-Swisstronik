const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpcLink = hre.network.config.url;
  const [encryptedData] = await encryptDataField(rpcLink, data);
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0xAf55CD6221cCAdBf41e57799220F9678fa0EFE64";
  const [signer] = await hre.ethers.getSigners();

  const contractFactory = await hre.ethers.getContractFactory("Shin");
  const contract = contractFactory.attach(contractAddress);

  const functionName = "mint";
  const parameters = [signer.address]; // Pass the signer's address as the parameter
  const data = contract.interface.encodeFunctionData(functionName, parameters);

  const mintTransaction = await sendShieldedTransaction(
    signer,
    contractAddress,
    data,
    0
  );

  await mintTransaction.wait();

  console.log("Transaction Receipt: ", mintTransaction.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
