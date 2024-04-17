import { gql, useQuery } from "@apollo/client";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import GraphBilanCarbone from "@/components/GraphBilanCarbone";

const GET_USER_EXPENSES = gql`
  query GetUserCarbonExpenses($userId: Float!) {
    getUserCarbonExpenses(userId: $userId) {
      activityType {
        id
        name
        icon
        carbon_emission
      }
      emission
      id
    }
  }
`;

export default function MonBilanCarbone() {
  const { user } = useContext(AuthContext);
  const [carbonEmissions, setCarbonEmissions] = useState([]);
  const [totalEmissions, setTotalEmissions] = useState(0);

  useEffect(() => {
    if (carbonEmissions.length > 0) {
      const totalEmission = carbonEmissions.reduce((total, emission) => total + activityType.carbonEmission, 0);
      setTotalEmissions(totalEmission);
    }
  }, [carbonEmissions]);

  const { loading, error } = useQuery(GET_USER_EXPENSES, {
    variables: {
      userId: Number(user.id),
    },
    onCompleted: (data: any) => {
      setCarbonEmissions(data.getUserCarbonExpenses);
    },
  });

  return (
    <>
      <h1 className="mx-auto mt-4 font-bold italic text-xl sm:text-4xl text-center mb-12 relative sm:w-fit after:absolute after:w-full after:inset-x-0 after:bottom-[-8px] after:scale-x-105 sm:after:bottom-[-5px] after:h-5 after:bg-secondary-10 z-[1] after:z-[-1]">
        Mon Bilan Carbone
      </h1>
      <div className="flex">
        <div className="w-1/2">
          <GraphBilanCarbone />
          <div id="main" className="w-full h-96"></div>
        </div>
        <div className="w-1/2">
          <h2 className="">Je consomme {totalEmissions} CO2eq avec mes activités</h2>
          <ul>
            {carbonEmissions.map((emission) => (
              <li key={carbonEmissions.activityType.id}>
                <img src={carbonEmissions.activityType.icon} alt={carbonEmissions.activityType.name} />
                {carbonEmissions.activityType.name}: {expense.emission} CO2eq
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
