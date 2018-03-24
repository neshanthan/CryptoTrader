import { ICounter } from 'models/counter';
import { IStars } from 'models/stars';
import { IMember } from 'models/member';

export interface IStore {
  counter: ICounter;
  stars: IStars;
  member: IMember;
};
