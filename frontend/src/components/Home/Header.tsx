export default function Header(){
    return (
    <header className="w-100 h-20 mb-5 flex justify-center items-center relative">
        <img src="/images/logo.png" alt="Logo" className="w-16 h-16" />
        <div className="bg-gray-70 absolute w-[80%] m-auto inset-x-0 bottom-[-5px] h-[1px] z-[-1]"></div>
    </header>
    );
}