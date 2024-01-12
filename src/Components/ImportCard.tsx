import dayjs from "dayjs";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ImportCardProps = {
  name: string;
  created_at: string;
  id: string;
};
const ImportCard = ({ created_at, id, name }: ImportCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between bg-slate-100 p-4 rounded-md shadow-md">
      <div>
        <h1 className="text-sm text-slate-400">Nome</h1>
        <h1 className="text-sm font-bold text-slate-600">{name}</h1>
      </div>
      <div>
        <h1 className="text-sm text-slate-400">Importação</h1>
        <h1 className="text-sm font-bold text-slate-600">Concluída</h1>
      </div>
      <div>
        <h1 className="text-sm text-slate-400">Data Importação</h1>
        <h1 className="text-sm font-bold text-slate-600">
          {dayjs(created_at).format("DD/MM/YYYY HH:mm")}
        </h1>
      </div>

      <button
        className="text-slate-400 hover:text-slate-600 w-5"
        onClick={() => navigate(`/import/${id}`)}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default ImportCard;
