import { useQuery } from "@tanstack/react-query";
import { File, Upload } from "lucide-react";
import { useState } from "react";
import Card from "../../Components/Card";
import ImportCard from "../../Components/ImportCard";
import ModalImport from "../../Components/ModalImport";
import api from "../../http/api";
import { IImportDTO } from "../../http/imports/importsDTO";

export const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["imports"],
    queryFn: () => api.get<IImportDTO>("imports").then((res) => res.data),
  });

  return (
    <div className="bg-slate-200  min-h-screen">
      <ModalImport
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        refetchImports={refetch}
      />
      <div className="bg-slate-900 h-[300px]">
        <div className="container py-8 flex justify-between flex-col h-full">
          <h1 className="text-2xl font-bold text-slate-300">
            Importações de CRM
          </h1>

          <div className=" flex items-center rounded-lg  justify-between">
            <p className="text-slate-200">Importar CRM</p>
            <div className="flex gap-4">
              <a
                target="_blank"
                className="cursor-pointer text-slate-200 border border-slate-800 p-4 rounded-md flex items-center gap-3"
              >
                Baixar Template <File strokeWidth={1} />
              </a>
              <button
                className="bg-indigo-500 cursor-pointer text-slate-200 border border-slate-800 p-4 rounded-md flex items-center gap-3"
                onClick={() => setIsVisible(true)}
              >
                Enviar planilha <Upload strokeWidth={1} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container pt-8 pb-8 " onClick={() => setIsVisible(false)}>
        <div className="grid grid-cols-1 gap-4">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} isLoading className="h-[80px]"></Card>
            ))}
          {data?.data?.map((item) => (
            <ImportCard
              id={item.id}
              name={item.name}
              created_at={item.created_at}
              key={item.id}
              import_status={item.import_status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
