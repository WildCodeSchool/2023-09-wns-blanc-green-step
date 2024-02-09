export type ButtonProps = {
  color: string;
  textsize: string;
  content: string;
  onClick: (e: any) => any;
};

export const Button = ({ color, textsize, content, onClick }: ButtonProps) => {
  return (
    <div>
      <button
        className={`${color} ${textsize} px-4 py-1 rounded-2xl `}
        onClick={(e) => onClick(e)}
      >
        {content}
      </button>
    </div>
  );
};
