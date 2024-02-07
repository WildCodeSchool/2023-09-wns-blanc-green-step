import NavBoard from "@/components/dashboard/NavBoard";

export default function Layout({ children }) {
  return (
    <>
      <NavBoard />
      <main className="flex justify-center min-h-screen pt-10 bg-gray-100">
        {children}
      </main>
    </>
  );
}
