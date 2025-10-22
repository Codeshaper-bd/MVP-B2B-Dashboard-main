import { Link } from "@/i18n/routing";
import { getSeoMeta } from "@/lib/get-seo-meta";
import AuthBackground from "@/components/partials/auth/auth-background";
import RegForm from "@/components/partials/auth/reg-form";

export const metadata = getSeoMeta({ title: "Register" });

function RegisterPage() {
  return (
    <AuthBackground
      title="Welcome to Fennec"
      formCardWrapperClassName="lg:w-[600px]"
    >
      <div className="w-full">
        <RegForm />
        <div className="mx-auto mt-4 text-center text-sm font-normal text-default-600 md:max-w-sm">
          {"Already have an account? "}
          <Link
            href="/en/auth/login"
            className="font-semibold text-default-900 transition-all hover:text-primary hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </AuthBackground>
  );
}

export default RegisterPage;
