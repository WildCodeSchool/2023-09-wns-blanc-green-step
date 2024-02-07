import { Button } from "@/components/Button";
import { ChallengeCard } from "@/components/ChallengeCard";
import Article from "@/components/Home/Articles";
import ButtonLogin from "@/components/Home/ButtonLogin";
import Header from "@/components/Home/Header";
import TopBody from "@/components/Home/TopBody";
import VegetablesCard from "@/components/Home/VegetablesCard";
import Waves from "@/components/Waves";

function Home() {
  return (
    <>
      <Header />
      <TopBody />
      <ButtonLogin />
      
      <div className="flex flex-col justify-between items-center mt-5 mb-8 w-[100%] m-auto">
        <div className="flex justify-around items-center mb-10 w-full">
          <ChallengeCard />
          <ChallengeCard />
        </div>
        <Button color="bg-blue-40" textsize="text-sm" content="Accéder à tous les challenges" />
      </div>

      <div className="flex flex-col justify-center items-center w-[80%] m-auto mb-5">
        <Article />
        <div className="w-full h-[1px] bg-gray-70 mx-auto mt-2 mb-2"></div>
        <Article />
      </div>

      <VegetablesCard />
      <Waves />
    </>
  );
}

export default Home;
