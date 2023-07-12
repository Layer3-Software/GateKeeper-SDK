/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, waitFor } from "@testing-library/react";
import AccessControlModal from "../AccessControlModal";
import sortUrlParams from "../utils/sortUrlParams";
import { STAGING_WEBSITE } from "../config";

describe("Gatekeeper modal", () => {
  const DATA_TEST_ID = "gatekeeper_iframe";

  test("Should return null if account is not provide", () => {
    const { queryByTestId } = render(<AccessControlModal account="" />);
    const iframeElement = queryByTestId(DATA_TEST_ID);
    expect(iframeElement).toBeNull();
  });

  test("Should load without issues", async () => {
    const account = "account1";
    const { getByTestId } = render(<AccessControlModal account={account} />);
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
      polygonId: "1234PolygonID",
      roles: roles.toString(),
    };

    const sortedUrlParams = sortUrlParams(new URLSearchParams(params));
    const expectedSrc = `${STAGING_WEBSITE}/verify?${sortedUrlParams}`;

    const { getByTestId } = render(
      <AccessControlModal
        account={account}
        roles={roles}
        isStaging={true}
        polygonId="1234PolygonID"
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
      polygonId: "1234PolygonID",
      checksIds: checks?.toString(),
    };

    const sortedUrlParams = sortUrlParams(new URLSearchParams(params));

    const expectedSrc = `${STAGING_WEBSITE}/verify?${sortedUrlParams}`;

    const { getByTestId } = render(
      <AccessControlModal
        account={account}
        checksIds={checks}
        polygonId="1234PolygonID"
        isStaging={true}
        customization={customization}
      />,
    );

    const iframeElement = getByTestId(DATA_TEST_ID);

    expect(iframeElement).toBeDefined();
    expect(iframeElement).toHaveProperty("src", expectedSrc);
  });
});
