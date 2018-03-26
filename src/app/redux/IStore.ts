import { IMember } from 'models/member';
import { ICoins } from 'models/coin';

export interface IStore {
  member: IMember;
  coins: ICoins;
};
