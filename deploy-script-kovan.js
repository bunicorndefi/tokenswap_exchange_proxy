async function main() {
  // We get the contract to deploy
  const ExchangeProxy = await ethers.getContractFactory("ExchangeProxy");
  const Registry = await ethers.getContractFactory("BRegistry");
  const WETH = '0xd0A1E359811322d97991E03f863a0C30C2cF029C';
  const BFactory = '0xF6e18c0ec06cc7d073FAa7C33dbD330307bC5D60';

  const registry = await Registry.deploy(BFactory);
  await registry.deployed();
  console.log("Registry deployed to:", registry.address);

  const exchangeProxy = await ExchangeProxy.deploy(WETH);
  await exchangeProxy.deployed();

  console.log("Proxy deployed to:", exchangeProxy.address);

  await exchangeProxy.setRegistry(registry.address);
  console.log('Registry set.')
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
