export interface ModalProps {
  account: string;
  geoIds?: string[];
  checkIds?: string[];
  roles?: string[];
  checkCallback?: any;
  polygonId?: boolean;
  nftClaimLinks?: nftClaimLinksInterface;
  customization?: {
    backgroundColor?: string;
    primaryColor?: string;
    textColor?: string;
    buttonTextColor?: string;
  };
}

export interface nftClaimLinksInterface {
  [checkId: string]: {
    claimLink: string;
  };
}

export interface ModalTextProps {
  header: string;
  title: string;
  description: string;
}

export type ChecksResponse = {
  type: {
    [key: string]: string;
  };
  [key: string]: boolean | object;
};

export interface KeyBooleanPair {
  [key: string]: boolean;
}

export interface Steps {
  type: string;
  complete: boolean;
}

export enum Types {
  PolygonID = 'PolygonID',
  KYC = 'KYC',
  geoId = 'geoId',
  OFAC = 'OFAC',
  NTF = 'NFT',
}

export interface TCheck {
  _id: string;
  type: string;
  active: boolean;
  options: string[];
}
