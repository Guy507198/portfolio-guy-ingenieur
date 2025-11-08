export const metadata = { title: "Admin" };

import AdminHeader from "./AdminHeader";

export default function AdminLayout({ children }) {
  return (
    <div className="bg-black text-zinc-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <AdminHeader />
        {children}
      </div>
    </div>
  );
}
