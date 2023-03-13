/// <reference types="react-scripts" />
import { ExternalProvider } from '@ethersproject/providers';

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
  declare module '*.png';
  declare module '*.svg';
  declare module '*.jpeg';
  declare module '*.jpg';
}
