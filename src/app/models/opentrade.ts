// Can be created on construction so no need to for constructor
import {ICoin} from './coin';
export interface IOpenTrade {
  ID: string;
  coin: ICoin;
  exchangeID: number;
  rate: number;
  amount: number; // number of coins bought
  currencyPairUsed: string;
  type: string; // Specify whether it is buy or sell trade
}
