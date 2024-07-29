require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/",
      accounts: ["0x37ef868dd5022da7c7f3573deb93fd3f75e432cad3ca0f5a39d6c7d07170109a"], //Your private key starting with "0x"
    },
  },
};
