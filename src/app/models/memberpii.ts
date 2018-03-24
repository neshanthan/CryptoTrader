export interface IMemberPII { // Personally Identifiable Informatoin
    firstName: string;
    lastName: string;
    dateofBirth: Date;
    email: string;
    phoneNumber: number;
    adress: IMemberAddress;
    prefferedFiat: string;
    nationalID: string;
  }

  export interface IMemberAddress { // Personally Identifiable Informatoin
    line1: string;
    line2: string;
    city: string;
    countryProvince: string;
    postalCode: string;
    country: string;
  }
