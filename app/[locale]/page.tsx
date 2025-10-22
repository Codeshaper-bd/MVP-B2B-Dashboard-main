import AuthBackground from "@/components/partials/auth/auth-background";
import LoginForm from "@/components/partials/auth/login-form";

function Login() {
  return (
    <AuthBackground title="Welcome Back !">
      <div className="w-full">
        <LoginForm />
      </div>
    </AuthBackground>
  );
}

export default Login;
