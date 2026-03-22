import Sidebar from "@/components/Sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="sticky top-0 h-screen shrink-0">
        <Sidebar />
      </div>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
