import { gql, useQuery } from "@apollo/client";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import GraphBilanCarbone from "@/components/GraphBilanCarbone";


//ma requête GraphQl pour récupérer les dépenses carbone de mon utilisateur connecté
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

const GET_ACTIVITY_TYPES = gql`
query GetActivityTypes {
  getActivityTypes {
    id
    name
    icon
    carbon_emission
  }
}
`

//mon composant 
export default function MonBilanCarbone() {
  const { user } = useContext(AuthContext);
  const [carbonEmissions, setCarbonEmissions] = useState([]);
  const [totalEmissions, setTotalEmissions] = useState(0);
  const [activityType, setActivityType] = useState([]);
  //hook pour mettre à jour le total des émissions lorsque les émissions carbone changent

useQuery(GET_ACTIVITY_TYPES, {
    onCompleted: (data) => {
        setActivityType(data.getActivityTypes)
    },
  })
  //hook d'Apollo pour mettre à jour l'état des émissions carbone lors du chargement du composant
  const { loading, error } = useQuery(GET_USER_EXPENSES, {
    variables: {
      userId: Number(user.id),
    },
    onCompleted: (data: any) => {
      setCarbonEmissions(data.getUserCarbonExpenses);
      const totalEmission = data.getUserCarbonExpenses.reduce((total, emission) => total + emission.emission, 0);
      setTotalEmissions(totalEmission); 
      const newActivityType = activityType.map((activity) => ({
        ...activity,
        value: 100
      }));
      setActivityType(newActivityType)
    },
  });

  
  return (
    <>
      <h1 className="mx-auto mt-4 font-bold italic text-xl sm:text-4xl text-center mb-12 relative sm:w-fit after:absolute after:w-full after:inset-x-0 after:bottom-[-8px] after:scale-x-105 sm:after:bottom-[-5px] after:h-5 after:bg-secondary-10 z-[1] after:z-[-1]">
        Mon Bilan Carbone
      </h1>
      <div className="flex">
        <div className="w-1/2">
          <GraphBilanCarbone activityTypes={activityType}/>
          <div id="main" className="w-full h-96"></div>
        </div>
        <div className="w-1/2">
          <h2 className="">Je consomme {totalEmissions} CO2eq avec mes activités</h2>
          <ul>
            {carbonEmissions.map((emission:any) => (
              <li key={emission.id}>
                <img src={emission.activityType.icon} alt={emission.activityType.name} />
                {emission.activityType.name}: {emission.carbonEmission} CO2eq
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
