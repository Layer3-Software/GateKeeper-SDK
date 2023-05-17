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

export interface GateKeeperModalProps {
  account: string;
  checksIds?: string[];
  roles?: string[];
  checkCallback?: any;
  polygonId?: boolean;
  isStaging?: boolean;
  nftClaimLinks?: nftClaimLinksInterface;
  customization?: ICustomization;
}
