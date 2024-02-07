export const Button = ({ color, textsize }) => {
  return (
    <div>
      <button className={`${color} ${textsize} px-4 py-1 rounded-2xl `}>
        Accéder au challenge
      </button>
    </div>
  );
};
