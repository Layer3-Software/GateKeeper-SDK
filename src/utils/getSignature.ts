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
  if (!address) return { error: "No address provided.", signature: "" };
  if (!signer) return { error: "No signer provided.", signature: "" };

  try {
    const res = await getNonce(address, isStaging);

    if (res.error) {
      return { error: res.error, signature: "" };
    }

    if (allowUserRegistration) {
      if (!appId) return { error: "No appId provided", signature: "" };
      if (res.nonce === undefined || res.nonce === null) {
        const signature = await signer.signMessage(SIGN_MESSAGE);
        const res = await register(address, signature, appId, isStaging);

        if (res.error) {
          return { error: res.error, signature: "" };
        }

        return { signature };
      }
    }

    const signature = await signer.signMessage(
      `${SIGN_MESSAGE} Nonce: ${res.nonce}`,
    );

    return { signature };
  } catch (error) {
    throw new Error(`Error in getSignature function: ' + ${error}`);
  }
};

export default getSignature;
