import { getNonce, register } from "./backendCalls";

export const SIGN_MESSAGE =
  "Only sign if you are trying to login, or verify your credentials on GateKeeper.";

export interface SignatureResponse {
  signature: string;
  error?: string;
}

interface getSignatureParams {
  address: string;
  signer: any;
  appId?: string;
  allowUserRegistration?: boolean; // Default is true
  isStaging?: boolean; // Default is false
}

const getSignature = async ({
  address,
  signer,
  appId,
  allowUserRegistration = true,
  isStaging = false,
}: getSignatureParams): Promise<SignatureResponse> => {
  if (!address) return { error: "No address provided", signature: "" };
  if (!signer) return { error: "No signer provided", signature: "" };

  const { nonce } = await getNonce(address, isStaging);

  if (allowUserRegistration) {
    if (!appId) return { error: "No appId provided", signature: "" };
    if (nonce === undefined || nonce === null) {
      const signature = await signer.signMessage(SIGN_MESSAGE);
      await register(address, signature, appId, isStaging);
      return { signature };
    }
  }

  const signature = await signer.signMessage(`${SIGN_MESSAGE} Nonce: ${nonce}`);

  return { signature };
};

export default getSignature;
