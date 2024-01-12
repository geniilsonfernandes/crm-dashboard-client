import dayjs from "dayjs";
import { Ban, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../pages/utils";

type ImportCardProps = {
  name: string;
  created_at: string;
  id: string;
  import_status: "IN_PROGRESS" | "COMPLETED" | "FAILED";
};
const ImportCard = ({
  created_at,
  id,
  name,
  import_status,
}: ImportCardProps) => {
  const navigate = useNavigate();

  const getStatus = (status: "IN_PROGRESS" | "COMPLETED" | "FAILED") => {
    switch (status) {
      case "IN_PROGRESS":
        return "Em andamento";
      case "COMPLETED":
        return "Concluída";
      case "FAILED":
        return "Falha";
      default:
    }
  };

  const getStatusColor = (status: "IN_PROGRESS" | "COMPLETED" | "FAILED") => {
    switch (status) {
      case "IN_PROGRESS":
        return "text-indigo-500";
      case "COMPLETED":
        return "text-green-500";
      case "FAILED":
        return "text-red-500";
      default:
        return "text-slate-500";
    }
  };
  return (
    <div className="flex items-center justify-between bg-slate-100 p-4 rounded-md shadow-md">
      <div>
        <h1 className="text-sm text-slate-400">Nome</h1>
        <h1 className="text-sm font-bold text-slate-600">{name}</h1>
      </div>
      <div>
        <h1 className="text-sm text-slate-400">Importação</h1>
        <h1
          className={cn(
            "text-sm font-bold text-slate-600",
            getStatusColor(import_status)
          )}
        >
          {getStatus(import_status)}
        </h1>
      </div>
      <div>
        <h1 className="text-sm text-slate-400">Data Importação</h1>
        <h1 className="text-sm font-bold text-slate-600">
          {dayjs(created_at).format("DD/MM/YYYY HH:mm")}
        </h1>
      </div>

      <button
        className="text-slate-400 hover:text-slate-600 w-5"
        onClick={() => {
          if (import_status === "COMPLETED") {
            navigate(`/import/${id}`);
          }
        }}
      >
        {import_status === "COMPLETED" ? (
          <ChevronRight />
        ) : (
          <Ban className="text-red-500" />
        )}
      </button>
    </div>
  );
};

export default ImportCard;
