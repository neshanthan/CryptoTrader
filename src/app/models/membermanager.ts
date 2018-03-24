import { IMember } from 'models/member';

export interface IMemberManager {
  allMembers: IMember[]; // Can have 0 or many members
  request?: {
    isFetching?: boolean;
    error?: boolean;
    message?: any;
    };
  }

export interface IMemberManagerAction {
  type: string;
  payload?: {
    sessionID?: number;
    message?: any;
  };
}
