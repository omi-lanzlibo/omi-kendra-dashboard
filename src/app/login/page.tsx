import ProtectedPage from "../protected";
import { LoginForm } from "@/components/login_component";

export default function Login() {
  return (
    <ProtectedPage>
      <LoginForm></LoginForm>
    </ProtectedPage>
  );
}
