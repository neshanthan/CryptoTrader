import { IMember, IMemberAction } from 'models/member';
import { ICoin } from 'models/coin';
import { IOpenTrade } from 'models/opentrade';
import { IAlert } from 'models/alert';

/** Action Types */
export const LOGOUT: string = 'member/LOGOUT';
export const CHANGEPASSWORD: string = 'member/CHANGEPASSWORD';
export const LOCKACCOUNT: string = 'member/LOCKACCOUNT';
export const DEPOSIT: string = 'member/DEPOSIT';
export const PLACEBUYTRADE: string = 'member/PLACEBUYTRADE';
export const PLACESELLTRADE: string = 'member/PLACESELLTRADE';
export const CANCELTRADE: string = 'member/CANCELTRADE';
export const ADDALERT: string = 'member/ADDALERT';
export const REMOVEALERT: string = 'member/REMOVEALERT';
export const ADDEXCHANGEACCOUNT: string = 'member/ADDEXCHANGEACCOUNT';
export const REMOVEEXCHANGEACCOUNT: string = 'member/REMOVEEXCHANGEACCOUNT';
export const CHANGEDETAILS: string = 'member/CHANGEDETAILS';
export const REQUESTSTART: string = 'member/REQUESTSTART';
export const REQUESTSUCCESS: string = 'member/REQUESTSUCCESS';
export const REQUESTFAILURE: string = 'member/REQUESTFAILURE';

/** Member: Initial State */
const initialState: IMember = {
  username: 'Enter Username',
  password: 'sad',
  pII: null,
  lockUntilDate: new Date(),
  spendingLimit: 2,
  spendingLimitResetDate: 'asd',
  prefferedFiat: 'asd',
  sessionID: 'asd',
  type: 'real',
};

/** Reducer: memberReducer */
export function memberReducer(state = initialState, action?: IMemberAction) {

  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        sessionID: null,
      };

    case CHANGEPASSWORD:
      return {
        ...state,
        password: action.payload.newPassword,
      };

    case LOCKACCOUNT:
      return {
        ...state,
        lockUntilDate: action.payload.newLockDate,
      };

    default:
      return state;
  }
}

/** Action Creator: Logout the user */
export function logout(): IMemberAction {
  return {
    type: LOGOUT,
  };
}

/** Action Creator: Change the user password */
export function changePassword(newPassword: string): IMemberAction {
  newPassword = newPassword + 'replacewithhash';
  return {
    type: CHANGEPASSWORD,
    payload: {
      newPassword,
    },
  };
}

/** Action Creator: Change the user lock date */
export function lockAccount(newLockDate: Date): IMemberAction {
  return {
    type: LOCKACCOUNT,
    payload: {
      newLockDate,
    },
  };
}

/** Action Creator: Deposit currency into the users acconunt/ pick which API money is going too */
export function deposit(coin: ICoin, amount: number, address: string, exchangeID: string): IMemberAction {
  // Perform acctions that will change the state to show coins have been deposited

  console.log('Deposit Debug', coin, amount, address, exchangeID); // Debug

  return {
    type: DEPOSIT,
    payload: {
      newPassword: 'delete this',
    },
  };
}

/** Action Creator: Place buy order into the users exchange account/ pick which API money is going too */
export function placeBuyTrade(coin: ICoin, rate: number, address: string, exchangeID: string): IMemberAction {
  // Place order on on exchange and update account by creating open trade to show that it has placeed

  console.log('Place Buy Trade Debug', coin, rate, address, exchangeID); // Debug

  return {
    type: PLACEBUYTRADE,
    payload: {
      newPassword: 'delete this',
    },
  };
}

/** Action Creator: Place Sell order into the users exchange account/ pick which API money is going too */
export function placeSellTrade(coin: ICoin, rate: number, address: string, exchangeID: string): IMemberAction {
  // Place order on on exchange and update account by creating open trade to show that it has placeed

  console.log('Place Sell Trade Debug', coin, rate, address, exchangeID); // Debug

  return {
    type: PLACESELLTRADE,
    payload: {
      newPassword: 'delete this',
    },
  };
}

  /** Action Creator: Cancel an open order in the users exchange account/ pick which API money is going too */
export function cancelTrade(openTrade: IOpenTrade): IMemberAction {
  // Cancel trade on on exchange and update account by removing open trade to show that it is rremoved

  console.log('Cancel Trade Debug', openTrade); // Debug

  return {
    type: CANCELTRADE,
    payload: {
      newPassword: 'delete this',
    },
  };
}

  /** Action Creator: Cancel an open order in the users exchange account/ pick which API money is going too */
  export function addAlert(type: string, pricepercentage: number, coin: ICoin): IMemberAction {
    // Cancel trade on on exchange and update account by removing open trade to show that it is rremoved

    console.log('Add Alert Debug', type, pricepercentage, coin); // Debug

    return {
      type: CANCELTRADE,
      payload: {
        newPassword: 'delete this',
      },
    };
  }

/** Action Creator: Cancel an open order in the users exchange account/ pick which API money is going too */
export function removeAlert(alert: IAlert): IMemberAction {
  // Cancel trade on on exchange and update account by removing open trade to show that it is rremoved

  console.log('Delete Alert Debug', alert); // Debug

  return {
    type: CANCELTRADE,
    payload: {
      newPassword: 'delete this',
    },
  };
}

/** Action Creator: Change the details of user account, supplied with previous state for things that stay the same */
export function changeDetails(details: IOpenTrade): IMemberAction {
  // Cancel trade on on exchange and update account by removing open trade to show that it is rremoved

  console.log('Change Details Debug', details); // Debug

  return {
    type: CHANGEDETAILS,
    payload: {
      newPassword: 'delete this',
      },
  };
}

/** Action Creator: To change state to show request has started - used for time delayed i.e fetching data */
export function requestStart(): IMemberAction {
  return {
    type: REQUESTSTART,
  };
}

/** Action Creator - Called when action completed sucessufully, only called if success action doesn;t change state */
export function requestSuccess(message: any): IMemberAction {
  return {
    type: REQUESTSUCCESS,
    payload: {
      message,
    },
  };
}

/** Action Creator - Called when request was failed */
export function requestFailure(message: any): IMemberAction {
  return {
    type: REQUESTFAILURE,
    payload: {
      message,
    },
  };
}
