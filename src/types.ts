import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ICustomization {
  backgroundColor?: string;
  primaryColor?: string;
  textColor?: string;
  buttonTextColor?: string;
}

export interface nftClaimLinksInterface {
  [checkId: string]: {
    claimLink: string;
  };
}

export interface GateKeeperModalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  account: string;
  checksIds?: string[];
  roles?: string[];
  checkCallback?: Function;
  signature?: string;
  polygonId?: string;
  isStaging?: boolean;
  nftClaimLinks?: nftClaimLinksInterface;
  customization?: ICustomization;
}

export interface Iparams {
  bgColor?: string;
  signature?: string;
  primaryColor?: string;
  textColor?: string;
  buttonTextColor?: string;
  isIframe: string;
  address: string;
  checksIds?: string;
  roles?: string;
  nftClaimLinks?: string;
  polygonId?: string;
  checkCallback?: string;
  isStaging?: string;
}
