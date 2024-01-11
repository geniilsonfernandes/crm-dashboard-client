type CardProps = {
  title: string;
  children: React.ReactNode;
  footer?: string;
};

const Card = ({ title, children, footer }: CardProps) => {
  return (
    <div className="bg-slate-100 border border-slate-200 p-4 rounded-md shadow-2xl shadow-slate-300/80">
      <p className="text-sm text-slate-400 ">{title}</p>

      <div className="my-4 ">{children}</div>
      <hr className="my-2" />
      <p className="text-sm text-slate-400">{footer}</p>
    </div>
  );
};

export default Card;
