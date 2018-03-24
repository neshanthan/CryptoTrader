import { IMemberManager, IMemberManagerAction } from 'models/membermanager';

/** Action Types */
export const REQUESTSTART: string = 'membermanager/REQUESTSTART';
export const REQUESTSUCCESS: string = 'membermanager/REQUESTSUCCESS';
export const REQUESTFAILURE: string = 'membermanager/REQUESTFAILURE';

/** Initial State */
const initialState: IMemberManager = {
  allMembers: null,
  request: {
    isFetching: false,
  },
};

/** Reducer */
export function starsReducer(state = initialState, action: IMemberManagerAction) {
  switch (action.type) {
    case REQUESTSTART:
      return {
        ...state,
        isFetching: true,
      };

    case REQUESTSUCCESS:
      return {
        ...state,
        isFetching: false,
      };

    case REQUESTFAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.payload.message,
        error: true,
      };

    default:
      return state;
  }
}

/** Async Action Creator */
export function getStars() {
  return (dispatch) => {
    dispatch(requestStart());

    return fetch('https://api.github.com/repos/barbar/vortigern')
      .then((res) => {
        if (res.ok) {
          return res.json()
            .then((res) => dispatch(requestSuccess(res.stargazers_count)));
        } else {
          return res.json()
            .then((res) => dispatch(requestFailure(res)));
        }
      })
      .catch((err) => dispatch(requestFailure(err)));
  };
}

/** Action Creator: To change state to show request has started - used for time delayed i.e fetching data */
export function requestStart(): IMemberManagerAction {
  return {
    type: REQUESTSTART,
  };
}

/** Action Creator - Called when action completed sucessufully, only called if success action doesn;t change state */
export function requestSuccess(message: any): IMemberManagerAction {
  return {
    type: REQUESTSUCCESS,
    payload: {
      message,
    },
  };
}

/** Action Creator - Called when request was failed */
export function requestFailure(message: any): IMemberManagerAction {
  return {
    type: REQUESTFAILURE,
    payload: {
      message,
    },
  };
}
