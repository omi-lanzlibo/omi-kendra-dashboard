import { DashboardScreen } from "@/components/dashboard";
import ProtectedPage from "../protected";

export default function Dashboard() {
  return (
    <ProtectedPage>
      <DashboardScreen></DashboardScreen>
    </ProtectedPage>
  );
}
