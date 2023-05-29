import getSignature, { SignatureResponse } from "../getSignature";

describe("getSignature function", () => {
  const isStaging = true;
  const appId = "123";

  it("should return error if no address provide", async () => {
    const address = "";
    const signer = () => {};

    const res: SignatureResponse = await getSignature(
      address,
      signer,
      appId,
      isStaging,
    );

    expect(res).toStrictEqual({ error: "No address provided" });
  });

  it("should return error if no signer provide", async () => {
    const address = "1234xx";
    const signer = undefined;
    const res: SignatureResponse = await getSignature(
      address,
      signer,
      appId,
      isStaging,
    );

    expect(res).toStrictEqual({ error: "No signer provided" });
  });

  it("should return error if no appId provide", async () => {
    const address = "1234xx";
    const signer = () => {};
    const appId = "";
    const res: SignatureResponse = await getSignature(
      address,
      signer,
      appId,
      isStaging,
    );

    expect(res).toStrictEqual({ error: "No appId provided" });
  });
});
