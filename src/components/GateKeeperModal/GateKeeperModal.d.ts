export interface ModalProps {
  account: string;
  geoIds?: string[];
  checkIds: string[];
  checkCallback?: any;
  polygonId?: boolean;
  customization?: {
    backgroundColor?: string;
    primaryColor?: string;
    textColor?: string;
    buttonTextColor?: string;
  };
}

interface ModalTextProps {
  header: string;
  title: string;
  description: string;
}

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
