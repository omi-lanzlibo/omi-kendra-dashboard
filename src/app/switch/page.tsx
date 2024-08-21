import { KendraSwitchScreen } from "@/components/kendraSwitchPage";
import { ProtectedRoute } from "@/components/protected";

export default function Toggle() {
  return (
    <ProtectedRoute>
      <KendraSwitchScreen></KendraSwitchScreen>
    </ProtectedRoute>
  );
}
