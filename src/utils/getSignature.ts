import { getNonce, register } from "./backendCalls";

export const SIGN_MESSAGE =
  "Only sign if you are trying to login, or verify your credentials on GateKeeper.";

export interface SignatureResponse {
  signature?: string;
  error?: string;
}

const getSignature = async (
  address: string,
  signer: any,
  appId: string,
  isStaging: boolean = false,
): Promise<SignatureResponse> => {
  if (!address) return { error: "No address provided" };
  if (!signer) return { error: "No signer provided" };
  if (!appId) return { error: "No appId provided" };

  const { nonce } = await getNonce(address, isStaging);

  if (nonce === undefined || nonce === null) {
    const signature = await signer.signMessage(SIGN_MESSAGE);
    await register(address, signature, appId, isStaging);
    return { signature };
  }

  const signature = await signer.signMessage(`${SIGN_MESSAGE} Nonce: ${nonce}`);

  return { signature };
};

export default getSignature;
