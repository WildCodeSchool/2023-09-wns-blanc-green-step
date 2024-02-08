export default function TopBody() {
    return(
      <div className="text-center">
        <div className="inline-block relative max-w-md mx-auto">
          <h1 className="font-bold italic text-xl sm:text-3xl text-center mb-6 relative sm:w-fit after:absolute after:w-full after:inset-x-0 after:bottom-[-8px] after:scale-x-105 sm:after:bottom-[-5px] after:h-5 after:bg-secondary-10 z-[1] after:z-[-1]">
            Bienvenue sur GreenStep !
          </h1>
        </div>

        <p className="font-poppins text-center text-base mt-5">
          L’app qui te permet de calculer tes impacts et participer à des éco-challenges
        </p>

        <div className="flex justify-center mt-5">
          <img src="/images/photo-accueil.png" alt="Illustration d'accueil" className="w-72" />
        </div>
      </div>
    )
}