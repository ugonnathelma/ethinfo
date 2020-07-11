import QRCode from "qrcode";

const getAccountBalanceEndpoints = (address: string) =>
  ({
    rinkeby: `https://api-rinkeby.etherscan.io/api?module=account&action=balance&address=${address}&apikey=${process.env.REACT_APP_API_KEY}`,
    mainnet: `https://api.etherscan.io/api?module=account&action=balance&address=${address}&apikey=${process.env.REACT_APP_API_KEY}`,
  } as { [key: string]: string });

const getAccountTransactionsEndpoint = (address: string) =>
  ({
    rinkeby: `http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${address}&page=1&offset=10&sort=desc&tag=latest&apikey=${process.env.REACT_APP_API_KEY}`,
    mainnet: `http://api.etherscan.io/api?module=account&action=txlist&address=${address}&tag=latest&page=1&offset=10&sort=desc&apikey=${process.env.REACT_APP_API_KEY}`,
  } as { [key: string]: string });

const getEthInfo = async (address: string, network: string) => {
  const accountBalanceEndpoint = getAccountBalanceEndpoints(address)[network];
  const accountTransactionEndpoint = getAccountTransactionsEndpoint(address)[
    network
  ];

  const accountBalance = await fetch(accountBalanceEndpoint);
  const accountBalanceJson = await accountBalance.json();
  const accountTransactions = await fetch(accountTransactionEndpoint);
  const accountTransactionJson = await accountTransactions.json();

  const qrCode = await QRCode.toDataURL(address);

  return {
    address,
    qrCode,
    balance: accountBalanceJson.result,
    transactions: accountTransactionJson.result,
  };
};

export default getEthInfo;
