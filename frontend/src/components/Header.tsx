export default function Header({ user }) {
  return (
    <header
      className={`
    w-full h-20 mb-5 flex justify-center items-center relative
    ${user.id !== 0 ? "sm:hidden" : ""}
    `}
    >
      <img src="/images/logo.png" alt="Logo" className="w-16 h-16" />
      <div className="bg-gray-70 absolute w-[80%] m-auto inset-x-0 bottom-[-5px] h-[1px]"></div>
    </header>
  );
}
