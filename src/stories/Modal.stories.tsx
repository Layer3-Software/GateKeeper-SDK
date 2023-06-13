import React, { useRef } from "react";
import AccessControlModal from "../index";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AccessControlModal> = {
  title: "Modal",
  component: AccessControlModal,
};

type Story = StoryObj<typeof AccessControlModal>;

export const GatekeeperModal: Story = {
  render: () => {
    const darkMode = {
      primaryColor: "rgba(76, 130, 251, 0.24)",
      buttonTextColor: "#4C82FB",
      backgroundColor: "#0d1117",
      textColor: "rgb(255, 255, 255)",
    };
    const lightMode = {
      primaryColor: "red",
      buttonTextColor: "blue",
      backgroundColor: "#FB138E",
      textColor: "yellow",
    };
    const DEFAULT_COLORS = {
      primaryColor: "#006a65",
      textColor: "white",
      buttonTextColor: "white",
      backgroundColor: "#37444d",
    };

    // ALL PROPS //
    const account = "0x85d6298705d6b9885Eaa2de262df9442353d0218";
    const polygonID = "29f03ca7-13e1-484b-a523-286890d9a606";
    const CHECKS_IDS = ["check1", "check2", "check3"];

    const creditScore = "c7a6d91c-0d27-4450-a336-9ca67c2d87f6";
    const geoIdAllowArg = "6a021c4e-53f8-41fd-b83f-ef644957be5e";
    const geoIdDenyArg = "127d2795-e854-4441-a5eb-1ef863034075";
    const kyc = "30912fad-042e-48c0-a035-02292233af2a";
    const ofac = "7d39f54b-3a48-40e7-a3de-8514eff0d9b2";

    const ROLES = [""];

    const CHECK_CALLBACK = () => {
      console.log("callback");
    };
    const NFT_CLAIM_LINKS = {
      id1: {
        claimLink:
          "https://opensea.io/assets?search[query]=0xdb46d1dc155634fbc732f92e853b10b288ad5a1d",
      },
    };
    const IS_STAGING = true;
    const IS_DARK = true;

    const SIGNATURE =
      "0xc0b3bde3bb9fdef41fb23ea4261873a3bde4d9b79d574155609b15e6ce6ecb0d445bf1f040202f8e0fdede3dfcf5178467308205ceb59bc6714dfa901d870ad01b";

    return (
      <AccessControlModal
        account={account}
        customization={DEFAULT_COLORS}
        checkCallback={CHECK_CALLBACK}
        roles={ROLES}
        // signature={SIGNATURE}
        nftClaimLinks={NFT_CLAIM_LINKS}
        checksIds={CHECKS_IDS}
        polygonId={polygonID}
        isStaging={IS_STAGING}
      />
    );
  },
};

export default meta;
