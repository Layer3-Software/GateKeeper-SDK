/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, waitFor } from "@testing-library/react";
import GateKeeperModal from "../GateKeeperModal";
import { WEBSITE } from "../config";
import sortUrlParams from "../utils/sortUrlParams";

describe("Gatekeeper modal", () => {
  const DATA_TEST_ID = "gatekeeper_iframe";

  test("Should return null if account is not provide", () => {
    const { queryByTestId } = render(<GateKeeperModal account="" />);
    const iframeElement = queryByTestId(DATA_TEST_ID);
    expect(iframeElement).toBeNull();
  });

  test("Should load without issues", async () => {
    const account = "account1";
    const { getByTestId } = render(<GateKeeperModal account={account} />);
    const iframeElement = getByTestId(DATA_TEST_ID);
    expect(iframeElement).toBeDefined();

    await waitFor(() => {
      expect(iframeElement.ownerDocument.readyState).toBe("complete");
    });
  });

  test("Should generate the correct iframe URL (for roles)", async () => {
    const account = "account1";
    const roles = ["role1", "role2"];

    const customization = {
      backgroundColor: "#e3dc11",
      primaryColor: "#d5c9c9",
      textColor: "#4bcf46",
      buttonTextColor: "#e73434",
    };

    const params = {
      bgColor: customization?.backgroundColor,
      primaryColor: customization?.primaryColor,
      address: account,
      textColor: customization?.textColor,
      buttonTextColor: customization?.buttonTextColor,
      isIframe: "true",
      polygonId: "true",
      roles: roles.toString(),
    };

    const sortedUrlParams = sortUrlParams(new URLSearchParams(params));
    const expectedSrc = `${WEBSITE}/verify?${sortedUrlParams}`;

    const { getByTestId } = render(
      <GateKeeperModal
        account={account}
        roles={roles}
        polygonId={true}
        customization={customization}
      />,
    );

    const iframeElement = getByTestId(DATA_TEST_ID);

    expect(iframeElement).toBeDefined();
    expect(iframeElement).toHaveProperty("src", expectedSrc);
  });

  test("Should generate the correct iframe URL (for checks)", async () => {
    const account = "account2";
    const checks = ["check1", "check2"];

    const customization = {
      backgroundColor: "#e3dc11",
      primaryColor: "#d5c9c9",
      textColor: "#4bcf46",
      buttonTextColor: "#e73434",
    };

    const params = {
      bgColor: customization?.backgroundColor,
      primaryColor: customization?.primaryColor,
      textColor: customization?.textColor,
      buttonTextColor: customization?.buttonTextColor,
      isIframe: "true",
      address: account,
      polygonId: "true",
      checksIds: checks?.toString(),
      isStaging: "true",
    };

    const sortedUrlParams = sortUrlParams(new URLSearchParams(params));

    const expectedSrc = `${WEBSITE}/verify?${sortedUrlParams}`;

    const { getByTestId } = render(
      <GateKeeperModal
        account={account}
        checksIds={checks}
        polygonId={true}
        isStaging={true}
        customization={customization}
      />,
    );

    const iframeElement = getByTestId(DATA_TEST_ID);

    expect(iframeElement).toBeDefined();
    expect(iframeElement).toHaveProperty("src", expectedSrc);
  });
});
