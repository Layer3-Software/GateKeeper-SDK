export interface ModalProps {
  account: string;
  geoIds?: string[];
  checkIds: string[];
  checkCallback?: any;
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
