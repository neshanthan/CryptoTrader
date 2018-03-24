// Can be created on construction so no need to for constructor

export interface IOpenTrade {
  ID: string;
  exchangeID: number;
  rate: number;
  currencyPairUsed: string;
  type: string; // Specify whether it is buy or sell trade
}
