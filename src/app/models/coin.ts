  export interface ICoins {
    coins: ICoin[];
    request: {
      message?: any;
      isFetching: boolean;
      error: boolean;
    };
  }

  export interface ICoin {
    // Orignal Design
    rate?: number;
    average?: number;
    high?: number;
    low?: number;
    timeLastUpdated: number;
    exchanges?: string[];
    history?: ICoinDetails[];
    // Special Case from API
    id: string;
    name: string;
    symbol: string;
    rank: number;
    price_usd: number;
    price_btc: number;
    volume_usd: number; // 24 Hour
    market_usd: number;
    available_supply: number;
    total_supply: number;
    max_supply: number;
    percentage_change_1h: number;
    percentage_change_24h: number;
    percetange_change_7d: number;

  }

  export interface ICoinDetails { // All the historical records of prices
    rate: number;
    average: number;
    high: number;
    low: number;
    time: number;
    owner: string; // The history can be 'practice', 'real', or exchangeID
  }

  export interface ICoinRecord {
    price: number;
    total: number;
    exchangeID: number;
    currencyPairUsed: string;
    fiatValue: number;
    fiatType: number;
    boughtPrice?: number; // if its a bought record then you can have bought price
    type: string; // if its a record for bought or sold
  }

  export interface ICoinAction {
    type: string;
    payload?: {
      coinRecords?: any;
      message?: any;
      isFetching?: boolean;
      error?: boolean;
    };
  }
