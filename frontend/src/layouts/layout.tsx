import NavBoard from "@/components/dashboard/NavBoard";

export default function Layout({ children }) {
  const user = { id: 1 };
  return (
    <>
      {user.id !== 0 ? <NavBoard /> : ""}
      <main
        className={`flex justify-center min-h-screen pt-10 bg-gray-100 ${
          user.id !== 0
            ? "sm:fixed sm:right-0 sm:top-0 sm:w-dashcontent sm:flex-col sm:items-center sm:justify-start"
            : ""
        }`}
      >
        {children}
      </main>
    </>
  );
}
