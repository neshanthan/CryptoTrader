import { ICoinRecord } from 'models/coin';
import { IOpenTrade } from 'models/opentrade';
import { IMemberPII } from 'models/memberpii';

export interface IMember {
  username: string;
  password: string;
  pII: IMemberPII; // All member personally identifiable information
  lockUntilDate: boolean;
  spendingLimit: number;
  spendingLimitResetDate: string;
  prefferedFiat: string;
  sessionID: string;
  coinPortfolio?: ICoinRecord[];
  openTrades?: IOpenTrade[]; // Can have 0 or many open trades
  type: string; // If its real or practiseMember
  request: {
    message?: any;
    isFetching: boolean;
    error: boolean;
  };
}

export interface IMemberAction {
  type: string;
  payload?: {
    openTrade?: IOpenTrade;
    temp?: any;
    newPassword?: string;
    sessionID?: string;
    newLockDate?: Date;
    message?: any;
    isFetching?: boolean;
    error?: boolean;
  };
}
