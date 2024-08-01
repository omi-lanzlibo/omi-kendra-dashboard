import { KendraSwitchScreen } from "@/components/kendraSwitchPage";
import ProtectedPage from "../protected";

export default function Toggle() {
  return (
    <ProtectedPage>
      <KendraSwitchScreen></KendraSwitchScreen>
    </ProtectedPage>
  );
}
