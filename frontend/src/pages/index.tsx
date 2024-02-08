import isAuth from "@/components/secure/isAuth";

function Home() {
  return (
    <>
      <h1 className="font-poppins font-bold italic text-3xl">
        Salut les green steppers
      </h1>
    </>
  );
}

export default isAuth(Home);
