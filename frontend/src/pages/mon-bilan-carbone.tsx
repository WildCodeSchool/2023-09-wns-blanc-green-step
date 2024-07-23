import { gql, useQuery } from "@apollo/client";
import { useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import GraphBilanCarbone from "@/components/GraphBilanCarbone";
import isSecured from "@/components/secure/isSecured";

export type Props = {
  totalEmissions: number;
  activityTypeEmissions: Record<number, number>;
  activityTypeData: Record<number, { name: string; icon: string }>;
};

const GET_USER_EXPENSES = gql`
  query GetUserCarbonExpenses($userId: Float!) {
    getUserCarbonExpenses(userId: $userId) {
      id
      title
      date
      emission
      activityType {
        id
        name
        icon
        carbon_emission
      }
    }
  }
`;

function MonBilanCarbone() {
  const { user } = useContext(AuthContext);
  const [totalEmissions, setTotalEmissions] = useState(0);
  const [activityTypeEmissions, setActivityTypeEmissions] = useState<
    Record<number, number>
  >({});

  const [activityTypeData, setActivityTypeData] = useState<
    Record<number, { name: string; icon: string }>
  >({});

  const { loading, error, data } = useQuery(GET_USER_EXPENSES, {
    variables: {
      userId: Number(user.id),
    },
    onCompleted: (data: any) => {
      const emissionsMap: Record<number, number> = {};
      let total = 0;
      const activityData: Record<number, { name: string; icon: string }> = {};
      data.getUserCarbonExpenses.forEach((expense: any) => {
        const activityTypeId = expense.activityType.id;
        const emission =
          expense.emission * expense.activityType.carbon_emission;
        total += emission;
        if (emissionsMap[activityTypeId]) {
          emissionsMap[activityTypeId] += emission;
        } else {
          emissionsMap[activityTypeId] = emission;
          activityData[activityTypeId] = {
            name: expense.activityType.name,
            icon: expense.activityType.icon,
          };
        }
      });
      setActivityTypeEmissions(emissionsMap);
      setTotalEmissions(total);
      setActivityTypeData(activityData);
    },
  });

  return (
    <>
      <h1 className="mx-auto mt-4 font-bold italic text-xl sm:text-4xl text-center mb-12 relative sm:w-fit after:absolute after:w-full after:inset-x-0 after:bottom-[-8px] after:scale-x-105 sm:after:bottom-[-5px] after:h-5 after:bg-secondary-10 z-[1] after:z-[-1]">
        Mon Bilan Carbone
      </h1>
      <div className="flex">
        <div className="w-1/2 ml-5">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && (
            <GraphBilanCarbone
              totalEmissions={totalEmissions}
              activityTypeEmissions={activityTypeEmissions}
              activityTypeData={activityTypeData}
            />
          )}
          <div id="main" className="w-full h-96"></div>
        </div>
        <div className="w-1/2 ml-5 mr-5">
          <h2 className="font-bold">
            Je consomme {totalEmissions} tonnes CO2eq avec mes activités
          </h2>
          <ul className="mt-10">
            {Object.entries(activityTypeEmissions).map(
              ([activityTypeId, emission]) => (
                <li key={activityTypeId} className="mb-2">
                  <img
                    src={activityTypeData[parseInt(activityTypeId)].icon}
                    alt=""
                    className="mr-2 w-6 h-6"
                  />
                  {activityTypeData[parseInt(activityTypeId)].name}: {emission}{" "}
                  tonnes CO2eq
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default isSecured(MonBilanCarbone);
