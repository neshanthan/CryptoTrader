import { ICoin } from 'models/coin';

export interface IExchangeAPI {
  placeBuyTrade(coin: ICoin, rate: number, amount: number, currencyPair: string): string;
  placeSellTrade(coin: ICoin, rate: number, amount: number, currencyPair: string): string;
  cancelTrade(ID: string): boolean;
  deposit(coin: ICoin): string;
  withdraw(coin: ICoin, address: string): boolean;
}
