import { Dispatch, SetStateAction } from 'react';
import { ICustomization } from '../types';

export interface Icontext {
  isStaging: boolean;
  signer: any;
  address: string;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  customization: ICustomization;
}

export interface IexternalContext {
  isStaging: boolean;
  signer: any;
  address: string;
  customization: ICustomization;
}
