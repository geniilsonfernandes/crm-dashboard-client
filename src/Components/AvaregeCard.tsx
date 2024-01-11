import { icons } from "lucide-react";
import { cn } from "../pages/utils";
import Card from "./Card";

type AvaregeCardProps = {
  title: string;
  value?: string | number;
  helprText: string;
  color: "warning" | "success" | "danger";
  icon?: keyof typeof icons;
};
export const AvaregeCard = ({
  title,
  value,
  helprText,
  color,
  icon = "User",
}: AvaregeCardProps) => {
  const LucideIcon = icons[icon];
  const getColor = (color: "warning" | "success" | "danger") => {
    switch (color) {
      case "warning":
        return "text-yellow-500";
      case "success":
        return "text-green-500";
      case "danger":
        return "text-red-500";
      default:
        return "text-slate-500";
    }
  };

  return (
    <Card title={title} footer={helprText}>
      <div className="my-4 flex justify-between items-center">
        <h1
          className={cn("text-3xl font-bold text-slate-500", getColor(color))}
        >
          {value}
        </h1>
        <LucideIcon className={cn(getColor(color))} size={33} />
      </div>
    </Card>
  );
};
