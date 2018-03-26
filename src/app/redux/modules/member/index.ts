import { IMember, IMemberAction } from 'models/member';
import { ICoin } from 'models/coin';
import { IOpenTrade } from 'models/opentrade';
import { IAlert } from 'models/alert';

/** Action Types */
export const LOGIN: string = 'member/LOGIN';
export const LOGINSESSION: string = 'member/LOGINSESSION';
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
export const REQUESTRESET: string = 'member/REQUESTRESET';

/** Member: Initial State */
const initialState: IMember = {
  username: 'Enter Username',
  password: 'sad',
  pII: null,
  lockUntilDate: new Date(),
  spendingLimit: 2,
  spendingLimitResetDate: 'asd',
  prefferedFiat: 'asd',
  sessionID: null,
  openTrades: [],
  type: 'real',
  request: {
    isFetching: false,
    error: false,
  },
};

/** Reducer: memberReducer */
export function memberReducer(state = initialState, action?: IMemberAction) {

  switch (action.type) {

    case LOGINSESSION:
      return {
        ...state,
        sessionID: action.payload.sessionID,
      };

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

    case REQUESTSTART:
      return {
        ...state,
        request: {
          isFetching: true,
        },
      };

    case REQUESTSUCCESS:
      return {
        ...state,
        request: {
          isFetching: false,
          message: action.payload.message,
          error: false,
        },
      };

    case REQUESTFAILURE:
      return {
        ...state,
        request: {
          isFetching: false,
          message: action.payload.message,
          error: true,
        },
      };

    case REQUESTRESET:
      return {
        ...state,
        request: {
          isFetching: false,
          message: 'RESET',
          error: false,
        },
    };

    case PLACEBUYTRADE:
      state.openTrades.push(action.payload.openTrade);
      return {
        ...state,
        OpenTrades: state.openTrades,
    };

    case PLACESELLTRADE:
      state.openTrades.push(action.payload.openTrade);
      return {
        ...state,
        OpenTrades: state.openTrades,
    };

    case CANCELTRADE:
      state.openTrades.map((item, index) => {
        if (item === action.payload.openTrade) {
          state.openTrades.splice(index, 1);
        }
      });

      return {
        ...state,
        OpenTrades: state.openTrades,
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

/** Action Creator: Logout the user */
export function resetRequest(): IMemberAction {
  return {
    type: REQUESTRESET,
  };
}

/** Action Creator: Change the user password */
export function changePassword(newPassword: string): IMemberAction {
  newPassword = hashPassword(newPassword);
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
export function placeBuyTrade(coin: ICoin, rate: number, exchangeID: number): IMemberAction {
  // Place order on on exchange and update account by creating open trade to show that it has placeed
  const openTradeA = {
    ID: 'RAND91203',
    coin,
    exchangeID,
    rate,
    currencyPairUsed: 'USD',
    type: 'BUY',

  };

  return {
    type: PLACEBUYTRADE,
    payload: {
      openTrade: openTradeA,
    },
  };
}

/** Action Creator: Place Sell order into the users exchange account/ pick which API money is going too */
export function placeSellTrade(coin: ICoin, rate: number, exchangeID: number): IMemberAction {
  // Place order on on exchange and update account by creating open trade to show that it has placeed
  const openTradeA = {
    ID: 'RAND91203',
    coin,
    exchangeID,
    rate,
    currencyPairUsed: 'USD',
    type: 'SELL',

  };

  return {
    type: PLACESELLTRADE,
    payload: {
      openTrade: openTradeA,
    },
  };
}

  /** Action Creator: Cancel an open order in the users exchange account/ pick which API money is going too */
export function cancelTrade(openTrade: IOpenTrade): IMemberAction {
  // Cancel trade on on exchange and update account by removing open trade to show that it is rremoved

  return {
    type: CANCELTRADE,
    payload: {
      openTrade,
    },
  };
}

  /** Action Creator: Cancel an open order in the users exchange account/ pick which API money is going too */
  export function addAlert(type: string, pricepercentage: number, coin: ICoin): IMemberAction {
    // Cancel trade on on exchange and update account by removing open trade to show that it is rremoved

    console.log('Add Alert Debug', type, pricepercentage, coin); // Debug

    return {
      type: ADDALERT,
      payload: {
        temp: 'Add Alert',
      },
    };
  }

/** Action Creator: Cancel an open order in the users exchange account/ pick which API money is going too */
export function removeAlert(alert: IAlert): IMemberAction {
  // Cancel trade on on exchange and update account by removing open trade to show that it is rremoved

  console.log('Delete Alert Debug', alert); // Debug

  return {
    type: REMOVEALERT,
    payload: {
      newPassword: 'Remove Alert',
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
    payload: {
      isFetching: true,
    },
  };
}

/** Action Creator - Called when action completed sucessufully, only called if success action doesn;t change state */
export function requestSuccess(message: any): IMemberAction {
  return {
    type: REQUESTSUCCESS,
    payload: {
      message,
      error: false,
      isFetching: false,
    },
  };
}

/** Action Creator - Called when request was failed */
export function requestFailure(message: any): IMemberAction {
  return {
    type: REQUESTFAILURE,
    payload: {
      message,
      error: true,
      isFetching: false,
    },
  };
}

/** Action Creator: Logout the user */
export function login(username, password) {
  password = hashPassword(password);
  return (dispatch: any) => {
    dispatch(requestStart());
    if (username === 'test' && password === 'test1234replacewithhash') {
      dispatch(loginSession('LOGINSESSIONC(2390234'));
      dispatch(requestSuccess('You have logged into sucessfully'));
    } else {
      dispatch(requestFailure('The username is incorrect'));
    }
  };
}

/** Action Creator: Logout the user */
export function loginSession(sessionID) {
  return {
    type: LOGINSESSION,
    payload: {
      sessionID,
    },
  };
}

/** Password Hashing Function */
export function hashPassword(password): string {
  return password + 'replacewithhash';
}
