import NavBoard from "@/components/dashboard/NavBoard";

export default function Layout({ children }) {
  return (
    <>
      <NavBoard />
      <main className="flex justify-center min-h-screen pt-10 bg-gray-100 sm:fixed sm:right-0 sm:top-0 sm:w-dashcontent sm:flex-col sm:items-center sm:justify-start">
        {children}
      </main>
    </>
  );
}
