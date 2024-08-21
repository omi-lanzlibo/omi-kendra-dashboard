import { DashboardScreen } from "@/components/dashboard";
import { ProtectedRoute } from "@/components/protected";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardScreen></DashboardScreen>
    </ProtectedRoute>
  );
}
