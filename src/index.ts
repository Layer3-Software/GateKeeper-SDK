import AccessControlModal from "./AccessControlModal";
import GatekeeperContext, {
  GatekeeperContextProvider,
} from "./contexts/GatekeeperContext";
import getSignature from "./utils/getSignature";
import { getNonce, register } from "./utils/backendCalls";
import withGatekeeperWeak from "./hoc/withGatekeeperWeak";
import withGatekeeperStrong from "./hoc/withGatekeeperStrong";
import ProtectedRouteStrong from "./routes/ProtectedRouteStrong";
import ProtectedRouteWeak from "./routes/ProtectedRouteWeak";

export {
  getSignature,
  getNonce,
  register,
  GatekeeperContext,
  GatekeeperContextProvider,
  withGatekeeperStrong,
  withGatekeeperWeak,
  ProtectedRouteStrong,
  ProtectedRouteWeak,
};
export default AccessControlModal;
