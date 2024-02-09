export default function VegetablesCard() {
  return (
    <div className="bg-orange-100 w-[80%] ml-auto mr-auto mb-[30px] py-3 rounded-[20px] shadow-xl flex flex-col justify-around items-center relative z-[5]">
      <h4 className="font-poppins text-sm gray-20 mb-3">Les petites infos</h4>

      <div className="flex flex-col justify-center items-center w-[100%] md: flex md:flex-row md:justify-around">
        <div className="bg-gray-100 w-[80%] flex justify-center items-center mb-3 shadow-xl rounded-[15px] md:w-[45%] md:pb-2">
          <img
            src="https://img.freepik.com/vecteurs-libre/sauvez-concept-planete-gens-qui-prennent-soin-terre_23-2148522570.jpg?w=1060&t=st=1707296087~exp=1707296687~hmac=f1bd2b58582716a26548311f6d4638f387468263e13b1c25368620389049d005"
            alt="Icone de Fruits"
            className="w-8 h-8"
          />
          <div className="w-[80%] flex flex-col justify-center items-center pb-2">
            <h4 className="font-poppins text-sm">Légumes de saison du mois</h4>
            <p className="font-poppins text-xs text-justify w-[80%]">
              Supporting line text lorem ipsum dolor sit amet, consectetur
            </p>
          </div>
        </div>

        <div className="bg-gray-100 w-[80%] flex justify-center items-center mb-3 shadow-xl rounded-[15px] md:w-[45%] md:pb-2">
          <img
            src="https://img.freepik.com/vecteurs-libre/sauvez-concept-planete-gens-qui-prennent-soin-terre_23-2148522570.jpg?w=1060&t=st=1707296087~exp=1707296687~hmac=f1bd2b58582716a26548311f6d4638f387468263e13b1c25368620389049d005"
            alt="Icone de Fruits"
            className="w-8 h-8"
          />
          <div className="w-[80%] flex flex-col justify-center items-center pb-2">
            <h4 className="font-poppins text-sm">Tu savais ?</h4>
            <p className="font-poppins text-xs text-justify w-[80%]">
              Supporting line text lorem ipsum dolor sit amet, consectetur
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
