import { Button } from "@/components/Button";
import { ChallengeCard } from "@/components/ChallengeCard";
import Article from "@/components/Home/Articles";
import ButtonLogin from "@/components/Home/ButtonLogin";
import Header from "@/components/Home/Header";
import TopBody from "@/components/Home/TopBody";
import VegetablesCard from "@/components/Home/VegetablesCard";
import Waves from "@/components/Waves";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

const GET_ALL_CHALLENGES = gql`
  query GetChallenges {
    getChallenges {
      carbon_saving
      description
      id
      image
      name
    }
  }
`;

function Home() {
  const router = useRouter();
  const redirectChallenges = () => {
    router.push("/challenges");
  };
  const [challenges, setChallenges] = useState<[]>([]);

  const { loading, error } = useQuery(GET_ALL_CHALLENGES, {
    onCompleted: (data: any) => {
      setChallenges(data.getChallenges);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <section>
      <Header />
      <TopBody />
      <ButtonLogin />
      <div className="flex flex-col justify-center items-center mb-10 md: w-[80%] md: m-auto md:flex md:flex-row-reverse md:items-start">
        <div className="flex flex-col justify-between items-center mt-5 mb-8 w-[100%] m-auto">
          <div className="flex justify-center items-center mb-10 w-[80%]">
            {challenges.slice(0, 2).map((challenge, i) => (
              <div key={i}>
                <ChallengeCard image={challenge.image} name={challenge.name} description={challenge.description} carbon_saving={challenge.carbon_saving} />
              </div>
            ))}
          </div>
          <Button
            color="bg-blue-40"
            textsize="text-sm"
            content="Accéder à tous les challenges"
            onClick={redirectChallenges}
          />
        </div>

        <div className="flex flex-col justify-center items-center w-[80%] mt-5 sm:mb-24">
          <Article />
          <div className="w-full h-[1px] bg-gray-70 mx-auto mt-2 mb-2"></div>
          <Article />
        </div>
      </div>

      <VegetablesCard />
      <Waves />
    </section>
  );
}

export default Home;
