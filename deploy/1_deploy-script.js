module.exports = async ({
  getNamedAccounts,
  deployments
}) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // We get the contract to deploy
  const WBNB = '0xedf3a71b0768b0eb34e8bb179e556b1fdc50ad49';


  // const wBnb = await deploy('WBNB', {
  //   from: deployer,
  //   log: true,
  //   args: [],
  //   deterministicDeployment: true,
  // });

  const BFactory = '0xF6e18c0ec06cc7d073FAa7C33dbD330307bC5D60';

  const registry = await deploy('BRegistry', {
    from: deployer,
    log: true,
    args: [BFactory],
    deterministicDeployment: true,
  });

  console.log("Registry deployed to:", registry.address);

  const exchangeProxy = await deploy('ExchangeProxy', {
    from: deployer,
    log: true,
    args: [WBNB],
    deterministicDeployment: true,
    execute: {
      methodName: 'setRegistry',
      args: [registry.address],
    }
  });

  console.log("Proxy deployed to:", exchangeProxy.address);

  console.log('Registry set.')
};
module.exports.tags = ['MyContract'];