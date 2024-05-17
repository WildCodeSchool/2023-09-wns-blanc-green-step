export type ButtonProps = {
  color: string;
  textsize: string;
  content: string;
  style?: string;
  onClick: (e: any) => any;
};

export const Button = ({
  color,
  textsize,
  content,
  onClick,
  style = "",
}: ButtonProps) => {
  return (
    <div className="z-[1]">
      <button
        className={`${color} ${textsize} ${style} px-4 py-1 rounded-2xl`}
        onClick={(e) => onClick(e)}
      >
        {content}
      </button>
    </div>
  );
};
