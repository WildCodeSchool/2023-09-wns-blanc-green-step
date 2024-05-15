import React from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Expense } from "@/types/expense.type";

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

  const [carbonExpenses, setCarbonExpenses] = useState([]);
  const [expensesByActivity, setExpensesByActivity] = useState({});
  const [challenges, setChallenges] = useState([]);

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
    console.log(expensesByActivity);
  }, [expensesByActivity]);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <section className="font-poppins pt-10 text-center bg-grey-100 text-gray-20 flex flex-col items-center justify-center pb-16 sm:pl-[17px]">
      <h1 className="font-bold italic text-xl sm:text-4xl text-center mb-12 relative sm:w-fit after:absolute after:w-full after:inset-x-0 after:bottom-[-8px] after:scale-x-105 sm:after:bottom-[-5px] after:h-5 after:bg-secondary-10 z-[1] after:z-[-1]">
        Mes Ecochallenges
      </h1>

      {challenges.map((challenge: any) => (
        <p key={challenge.id}>
          {challenge.name} {challenge.activityType.name}
        </p>
      ))}
    </section>
  );
}

export default MyEcochallenges;
