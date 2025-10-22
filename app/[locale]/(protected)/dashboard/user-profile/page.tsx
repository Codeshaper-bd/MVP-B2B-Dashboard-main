import { getSeoMeta } from "@/lib/get-seo-meta";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import ProfilePageContent from "@/components/modules/user-profile/ProfilePageContent";
import PageHeader from "@/components/partials/header/page-header";

export const metadata = getSeoMeta({ title: "User Profile" });

function UserProfilePage() {
  return (
    <div>
      <PageHeader title="User Profile" />
      <DynamicBreadcrumb />

      <ProfilePageContent />
    </div>
  );
}

export default UserProfilePage;
