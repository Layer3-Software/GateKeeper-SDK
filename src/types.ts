export interface IuseVerified {
  account: string;
  checksIds: string[];
  roles: string[];
  checkCallback: any;
  hasPolygonID: boolean | undefined;
  nftClaimLinks: nftClaimLinksInterface | undefined;
}

export interface ErrorScreenProps {
  error: string;
  type: 'failedCheck' | 'apiError';
  customization: ICustomization;
  nftClaimLink?: string;
  goBackCallback?: () => void | undefined;
}

export interface ModalProps {
  account: string;
  checksIds?: string[];
  roles?: string[];
  checkCallback?: any;
  polygonId?: boolean;
  nftClaimLinks?: nftClaimLinksInterface;
  customization?: ICustomization;
}

export interface nftClaimLinksInterface {
  [checkId: string]: {
    claimLink: string;
  };
}
export interface ICustomization {
  backgroundColor?: string;
  primaryColor?: string;
  textColor?: string;
  buttonTextColor?: string;
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

export interface AuthorizationRequestMessage {
  id: string;
  typ: string;
  type: string;
  thid: string;
  body: object;
  from: string;
  to?: string;
}

export interface VcModalProps {
  customization: ICustomization;
  roles?: string[];
  response: PolygonAuthorizationResponse | any;
  shouldGetDID: boolean | undefined;
  closeModal: () => void;
}

export interface PolygonAuthorizationResponse {
  sessionId: string;
  request: AuthorizationRequestMessage;
}

export interface QrcodeProps {
  title: string;
  qrData: PolygonAuthorizationResponse;
  customization: ICustomization;
  subTitle?: string;
  handleSocketResponse: (msg: any) => void;
}

export interface PolygonSocket {
  id: string;
  callback: (msg: SocketMessage) => void;
}

export interface SocketMessage {
  success: boolean;
  claimData?: object;
  error?: string;
}