import ButtonLogin from "@/components/Home/ButtonLogin";
import CardChallenge from "@/components/Home/CardChallenge";
import Header from "@/components/Home/Header";

function Home() {
  return (
    <>
      <Header />
      {/* Titre + Background Bleu */}
      <div className="text-center">
        <div className="inline-block relative max-w-md mx-auto">
          <h1 className="font-poppins font-bold italic text-xl relative z-10 pl-1 pr-1">
            Bienvenue sur Green Step !
          </h1>
          <div className="absolute inset-x-0 bottom-[-5px] h-5 bg-secondary-10 z-[-1]"></div>
        </div>

        <p className="font-poppins text-center text-base mt-5">
          L’app qui te permet de calculer tes impacts et participer à des éco-challenges
        </p>

        <div className="flex justify-center mt-5">
          <img src="/images/photo-accueil.png" alt="Illustration d'accueil" className="w-72" />
        </div>
      </div>

      <ButtonLogin />
      
    </>
  );
}

export default Home;
