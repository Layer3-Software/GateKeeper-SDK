import { Dispatch, SetStateAction } from 'react';
import { ICustomization } from '../types';

export interface Icontext {
  isStaging: boolean;
  signer: any;
  address: string;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  customization: ICustomization;
  simulateKYC: boolean;
}

export interface IexternalContext {
  isStaging: boolean;
  signer: any;
  address: string;
  customization: ICustomization;
  simulateKYC: boolean;
}
