import { ICoinRecord } from 'models/coin';
import { IOpenTrade } from 'models/opentrade';
import { IMemberPII } from 'models/memberpii';

export interface IMember {
  username: string;
  password: string;
  pII: IMemberPII; // All member personally identifiable information
  lockUntilDate: Date;
  spendingLimit: number;
  spendingLimitResetDate: string;
  prefferedFiat: string;
  sessionID: string;
  coinPortfolio?: ICoinRecord[];
  openTrade?: IOpenTrade[]; // Can have 0 or many open trades
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
    newPassword?: string;
    newLockDate?: Date;
    message?: any;
    isFetching?: boolean;
    error?: boolean;
  };
}
