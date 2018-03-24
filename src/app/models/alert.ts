export interface IAlert {
    notificationType: string;
  }

export interface IPriceAlert extends IAlert {
    alertPrice: number;
    oldPrice: number;
}

export interface IPercentageAlert extends IAlert {
    alertPercentage: number;
    oldPrice: number;
}

export interface IAlertAction {
    type: string;
    payload?: {
      newPassword?: string;
      newLockDate?: Date;
      message?: any;
    };
  }
