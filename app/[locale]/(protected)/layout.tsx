import AdminLayout from "@/components/partials/layouts/AdminLayout";

function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}

export default Layout;
