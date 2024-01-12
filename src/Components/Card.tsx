import { cn } from "../pages/utils";

type CardProps = {
  title?: string;
  children?: React.ReactNode;
  headerRight?: React.ReactNode;
  footer?: string;
  className?: string;
  isLoading?: boolean;
};

const Card = ({
  title,
  children,
  footer,
  className,
  isLoading,
  headerRight,
}: CardProps) => {
  return (
    <div
      className={cn(
        "bg-slate-100 border border-slate-200 p-4 rounded-md shadow-2xl shadow-slate-300/80  h-full",
        className,
        isLoading && "animate-pulse"
      )}
    >
      <div className={cn(isLoading ? "invisible" : "")}>
        <div className="flex justify-between">
          {title && <h1 className="text-1xl  text-slate-400  mb-8">{title}</h1>}
          {headerRight && <div className="">{headerRight}</div>}
        </div>

        <div className="my-4 flex-1">{children}</div>
        {footer && (
          <div>
            <hr className="my-2" />
            <p className="text-sm text-slate-400">{footer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
