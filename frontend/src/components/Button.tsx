export type ButtonProps = {
  color: string;
  textsize: string;
  buttonname: string;
};

export const Button = ({ color, textsize, buttonname }: ButtonProps) => {
  return (
    <div>
      <button className={`${color} ${textsize} px-4 py-1 rounded-2xl `}>
        {buttonname}
      </button>
    </div>
  );
};
