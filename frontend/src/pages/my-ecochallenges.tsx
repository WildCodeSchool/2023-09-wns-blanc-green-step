import React from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Expense } from "@/types/expense.type";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import { ModalForOneEcoChallenge } from "@/components/ModalForOneEcoChallenge";
import isSecured from "@/components/secure/isSecured";

const GET_ALL_CHALLENGES = gql`
  query GetChallenges {
    getChallenges {
      carbon_saving
      description
      id
      image
      name
      activityType {
        id
        name
        icon
      }
    }
  }
`;

const GET_USER_EXPENSES = gql`
  query GetUserCarbonExpenses($userId: Float!) {
    getUserCarbonExpenses(userId: $userId) {
      activityType {
        id
        name
        icon
      }
      date
      emission
      id
      title
    }
  }
`;

function MyEcochallenges() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [carbonExpenses, setCarbonExpenses] = useState([]);
  const [expensesByActivity, setExpensesByActivity] = useState<any>({});
  const [challenges, setChallenges] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const redirectChallenges = () => {
    router.push("/challenges");
  };

  const { loading, error } = useQuery(GET_USER_EXPENSES, {
    variables: {
      userId: Number(user.id),
    },
    onCompleted: (data) => {
      setCarbonExpenses(data.getUserCarbonExpenses);
    },
  });

  const [getChallenges] = useLazyQuery(GET_ALL_CHALLENGES, {
    onCompleted: (data: any) => {
      setChallenges(data.getChallenges);
    },
  });

  useEffect(() => {
    getChallenges();
  }, []);

  useEffect(() => {
    const countExpensesByActivity = () => {
      const counts: any = {};

      carbonExpenses.forEach((expense: Expense) => {
        const activityName = expense.activityType.name;
        if (counts[activityName]) {
          counts[activityName]++;
        } else {
          counts[activityName] = 1;
        }
      });

      return counts;
    };

    if (carbonExpenses.length > 0) {
      setExpensesByActivity(countExpensesByActivity());
    }
  }, [carbonExpenses]);

  const handleOpenModal = (challenge: any) => {
    setSelectedChallenge(challenge);
    setIsModalOpen(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <section className="font-poppins pt-10 text-center bg-grey-100 text-gray-20 flex flex-col items-center justify-center pb-16 sm:pl-[17px]">
      <h1 className="font-bold italic text-xl sm:text-4xl text-center mb-12 relative sm:w-fit after:absolute after:w-full after:inset-x-0 after:bottom-[-8px] after:scale-x-105 sm:after:bottom-[-5px] after:h-5 after:bg-secondary-10 z-[1] after:z-[-1]">
        Mes Ecochallenges
      </h1>
      <p className="text-grey-20 ">
        Tu retrouveras ici tous les challenges que tu peux effectuer pour
        améliorer ton bilan carbone !
      </p>
      <div className="text-grey-20 text-center grid grid-cols-2 gap-4 ">
        {challenges.map((challenge: any) =>
          expensesByActivity[challenge.activityType.name] > 1 ? (
            <div
              key={challenge.id}
              className="bg-gray-80 py-5 px-7 m-5 rounded-xl cursor-pointer flex flex-row items-center"
            >
              <input
                id="checkbox-challenge"
                type="checkbox"
                className="w-4 h-4 text-blue-10 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-20 focus:ring-2"
              />
              <p onClick={() => handleOpenModal(challenge)} className="ml-6">
                {challenge.name}
              </p>
            </div>
          ) : (
            ""
          )
        )}
      </div>
      <Button
        color="bg-blue-40"
        textsize="text-sm"
        style="p-4"
        content="Accéder à tous les challenges"
        onClick={redirectChallenges}
      />
      {selectedChallenge && (
        <ModalForOneEcoChallenge
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          challenge={selectedChallenge}
        />
      )}
    </section>
  );
}

export default isSecured(MyEcochallenges);
