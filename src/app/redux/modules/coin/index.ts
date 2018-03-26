import { ICoins, ICoinAction } from 'models/coin';

/** Action Types */
export const GET_REQUEST: string = 'coin/GET_REQUEST';
export const GET_SUCCESS: string = 'coin/GET_SUCCESS';
export const GET_FAILURE: string = 'coin/GET_FAILURE';

/** Initial State */
const initialState: ICoins = {
    coins: null,
    request: {
      isFetching: false,
      error: false,
    },
  };

/** Reducer */
export function coinReducer(state = initialState, action: ICoinAction) {
  switch (action.type) {
    case GET_REQUEST:
        return {
            ...state,
            password: action.payload,
        };

    case GET_SUCCESS:
        const coinsU = action.payload.coinRecords;
        let coins = state.coins;
        if (coins === null) {
          coins = coinsU;
        } else {
          for (const coinNew of coinsU) {
            for (const coinOld of coins) {
              if (coinNew.id === coinOld.id) {
                if (coinNew.timeLastUpdated !== coinOld.timeLastUpdated) {
                  console.log('Add it to historical records');
                }
              }
            }
          }
        }

        return {
          ...state,
          coins,
          request: {
            isFetching: false,
            error: false,
          },
        };

    case GET_FAILURE:
        return {
          ...state,
          request: {
            isFetching: false,
            message: action.payload.message,
            error: true,
          },
        };

    default:
      return state;
  }
}

/** Async Action Creator */
export function updateCoins() {
  return (dispatch) => {
    dispatch(coinRequest());

    return fetch('http://13.72.104.16/apicache.php?url=https://api.coinmarketcap.com/v1/ticker/')
      .then((res) => {
        if (res.ok) {
          return res.json()
            .then((res) => dispatch(coinSuccess(res)));
        } else {
          return res.json()
            .then((res) => dispatch(coinFailure(res)));
        }
      })
      .catch((err) => dispatch(coinFailure(err)));
  };
}

/** Action Creator */
export function coinRequest(): ICoinAction {
  return {
    type: GET_REQUEST,
    payload: {
      error: false,
      isFetching: true,
    },
  };
}

/** Action Creator for Mapping the API to our coins */
export function coinSuccess(coinRecords): ICoinAction {
  const coinData = coinRecords.map( (item) => {
      return {
        id: item.id,
        name: item.name,
        symbol: item.symbol,
        rank: Number(item.rank),
        price_usd: Number(item.price_usd),
        price_btc: Number(item.price_btc),
        h24_volume_usd: Number(item['24h_volume_usd']),
        market_cap_usd: Number(item.market_cap_usd),
        available_supply: Number(item.available_supply),
        total_supply: Number(item.total_supply),
        max_supply: Number(item.max_supply),
        percent_change_1h: Number(item.percent_change_1h),
        percent_change_24h: Number(item.percent_change_24h),
        percent_change_7d: Number(item.percent_change_7d),
        last_updated: item.last_updated,
      };
   },
  );

  return {
    type: GET_SUCCESS,
    payload: {
      coinRecords: coinData,
      error: false,
      isFetching: true,
    },
  };
}

/** Action Creator */
export function coinFailure(message: any): ICoinAction {
  return {
    type: GET_FAILURE,
    payload: {
      message,
      error: true,
      isFetching: false,
    },
  };
}
