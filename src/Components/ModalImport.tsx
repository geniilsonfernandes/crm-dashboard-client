import React from "react";
import { cn } from "../pages/utils";
import useImport from "../hooks/useImport";
type ModalImportProps = {
  isVisible: boolean;
  onClose: () => void;
};
const ModalImport = ({ isVisible, onClose }: ModalImportProps) => {
  const { execute, isError, isLoading, isSuccess, clear } = useImport();

  const [fileToSend, setFileToSend] = React.useState<File | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFileToSend(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!fileToSend) {
      return;
    }
    await execute(fileToSend);
  };

  const handleClose = () => {
    setFileToSend(null);
    onClose();
    clear();
  };

  return (
    <div
      className={cn(
        "absolute top-0 left-0 w-full min-h-[300px] bg-slate-50 shadow-lg transition-transform duration-300",
        {
          "transform -translate-y-full": !isVisible,
        }
      )}
    >
      <div className="container py-10">
        {isSuccess ? (
          <div>
            <div className="mt-8 p-4 rounded-md text-slate-400 text-center">
              <h1 className="text-2xl font-bold">
                Planilha importada com sucesso
              </h1>
              <button
                className="mt-8 bg-indigo-500 cursor-pointer text-slate-200 w-full p-4 rounded-md"
                onClick={handleClose}
              >
                Acompanhar as importações
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-slate-500">
              Enviar dados para importação:
            </h1>
            <div className="mt-8 border border-slate-300 p-4 rounded-md">
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleChange}
              />
            </div>
            <div className="text-slate-400 pt-2">
              Formatos aceitos: .xlsx, .xls, .csv
            </div>
            {isError && (
              <div className="text-red-500">
                Erro ao enviar, tente novamente
              </div>
            )}
            <button
              className="mt-8 bg-indigo-500 cursor-pointer text-slate-200 w-full p-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading
                ? "Carregando..."
                : isSuccess
                ? "Importação concluída"
                : "Enviar"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalImport;
