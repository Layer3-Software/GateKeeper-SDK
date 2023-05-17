import React from "react";
import GateKeeperModal from "../GateKeeperModal";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof GateKeeperModal> = {
  title: "Modal",
  component: GateKeeperModal,
};

type Story = StoryObj<typeof GateKeeperModal>;

export const GatekeeperModal: Story = {
  render: () => {
    const darkMode = {
      primaryColor: "rgba(76, 130, 251, 0.24)",
      buttonTextColor: "#4C82FB",
      backgroundColor: "#0d1117",
      textColor: "rgb(255, 255, 255)",
    };
    const lightMode = {
      primaryColor: "rgba(251, 17, 142, 0.24)",
      buttonTextColor: "#FB138E",
      backgroundColor: "rgb(255, 255, 255)",
      textColor: "rgb(13, 17, 28)",
    };

    // ALL PROPS //
    const account = "0x85d6298705d6b9885Eaa2de262df9442353d0218";
    const HAS_POLYGON = true;
    const CHECKS_IDS = ["check1", "check2", "check3"];
    const ROLES = ["role1", "role2", "role3"];
    const CHECK_CALLBACK = () => {};
    const NFT_CLAIM_LINKS = {
      id1: {
        claimLink:
          "https://opensea.io/assets?search[query]=0xdb46d1dc155634fbc732f92e853b10b288ad5a1d",
      },
    };
    const IS_STAGING = false;
    const IS_DARK = true;

    return (
      <GateKeeperModal
        account={account}
        customization={IS_DARK ? darkMode : lightMode}
        checkCallback={CHECK_CALLBACK}
        roles={ROLES}
        nftClaimLinks={NFT_CLAIM_LINKS}
        checksIds={CHECKS_IDS}
        polygonId={HAS_POLYGON}
        isStaging={IS_STAGING}
      />
    );
  },
};

export default meta;
