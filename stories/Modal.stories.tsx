import React from "react";
import GateKeeperModal from "../src/GateKeeperModal";
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

    const account = "0x85d6298705d6b9885Eaa2de262df9442353d0218";
    const ROLES = ["role1", "role2", "role3"];
    const HAS_POLYGON = false;
    const IS_DARK = true;

    return (
      <GateKeeperModal
        account={account}
        customization={IS_DARK ? darkMode : lightMode}
        roles={ROLES}
        polygonId={HAS_POLYGON}
      />
    );
  },
};

export default meta;
