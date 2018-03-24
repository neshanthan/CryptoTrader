export interface ICoin {
    rate: number;
    average: number;
    high: number;
    low: number;
    timeLastUpdated: Date;
    exchanges: string[];
    history: ICoinDetails[];
  }

  export interface ICoinDetails { // All the historical records of prices
    rate: number;
    average: number;
    high: number;
    low: number;
    time: Date;
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
      newPassword?: string;
      newLockDate?: Date;
      message?: any;
    };
  }
