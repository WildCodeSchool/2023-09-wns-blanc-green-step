export const Button = ({ color, textsize, content }) => {
  return (
    <div>
      <button className={`${color} ${textsize} px-4 py-1 rounded-2xl `}>
        {content}
      </button>
    </div>
  );
};
