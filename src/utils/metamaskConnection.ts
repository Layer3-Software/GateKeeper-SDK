import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import detectEthereumProvider from '@metamask/detect-provider';

export interface MetamaskConnection {
  address: string;
  signer: JsonRpcSigner;
  error?: string;
}

const metamaskConnection = async (): Promise<
  MetamaskConnection | { error: string }
> => {
  const provider = await detectEthereumProvider();
  if (provider) {
    if (window.ethereum && window.ethereum.request) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const provider = new Web3Provider(window.ethereum, 'any');

        const signer = provider.getSigner();
        const address = await signer.getAddress();

        return { address, signer };
      } catch (err) {
        return { error: 'Please connect to MetaMask!' };
      }
    }
  }
  return { error: 'Please install MetaMask!' };
};

export default metamaskConnection;
