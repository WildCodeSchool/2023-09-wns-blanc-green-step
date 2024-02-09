export type ButtonProps = {
  color: string;
  textsize: string;
  content: string;
  onClick: () => void;
};

export const Button = ({ color, textsize, content, onClick } : ButtonProps) => {
  return (
    <div>
      <button className={`${color} ${textsize} px-4 py-1 rounded-2xl `} onClick={onClick}>
        {content}
      </button>
    </div>
  );
};
