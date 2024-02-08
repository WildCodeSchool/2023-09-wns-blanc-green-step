import { useRouter } from "next/router"

export default function ButtonLogin() {
    const router = useRouter();
    const login = () => {
        router.push('/login');
    }

    const register = () => {
        router.push('/register');
    }

    return (
        <div className="flex justify-center pt-3 mt-2 mb-8">
            <button onClick={login} className="bg-blue-40 w-32 h-12 border-r-0 border-t border-b border-l rounded-l-full font-bold text-sm">Se connecter</button>
            <button onClick={register} className="w-32 h-12 rounded-r-full border font-bold text-sm">S'inscrire</button>
        </div>
    )
}