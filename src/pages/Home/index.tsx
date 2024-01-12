import { Activity, Calendar, ChevronLeft } from "lucide-react";
import { AvaregeCard } from "../../Components/AvaregeCard";
import Card from "../../Components/Card";
import { formatCurrencyToBRL, formatToPercentage } from "../utils";
import MRRChart from "../../Components/MRRChart";
import Chart from "react-apexcharts";
import DonutChart from "../../Components/DonutChart";
export const Home = () => {
  const analytics = [
    { name: "Clientes Ativos", value: 597 },

    { name: "Taxa de Retenção", value: formatToPercentage(58.07) },
    { name: "Taxa de Churn de Clientes", value: formatToPercentage(40.56) },
    {
      name: "Receita Recorrente Média (MRR)",
      value: formatCurrencyToBRL(1266.8),
    },
  ];

  return (
    <div className="bg-slate-200  ">
      <div className="bg-slate-900 h-[300px]">
        <div className="container pt-6">
          <button className=" p-2 rounded flex light:text-slate-400 dark:text-slate-100 items-center hover:text-slate-400 hover:bg-slate-800 ">
            <ChevronLeft className="text-slate-400" size={32} /> voltar para
            importações
          </button>
        </div>
      </div>
      <div className="container pt-8 -mt-44 pb-8">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-bold light:text-slate-400 dark:text-slate-100 mb-8">
            Análise de Churn
          </h1>
          <div className="flex items-center gap-4 ">
            <Calendar className="text-slate-400" size={32} />
            <div>
              <h4 className="text-xl font-bold light:text-slate-400 dark:text-slate-100">
                Data da importação
              </h4>
              <p className="text-sm text-slate-400">01/01/2020</p>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div className="grid grid-cols-4 gap-8">
            {analytics.map((item) => (
              <AvaregeCard
                key={item.name}
                title={item.name}
                value={item.value}
                helprText={"taxa de churn aceitavel é de 40.56%"}
              />
            ))}
          </div>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-8">
              <MRRChart />
            </div>

            <Card title="Assinaturas" className="col-span-4">
              <div className="">
                <DonutChart
                  title="Tipos de Assinatura"
                  subtitle="Total de assinaturas ativas:"
                  value="10.000"
                />
                <hr className="my-8" />
                <DonutChart
                  title="Churn rate por assinatura"
                  subtitle="Assinatura com maior churn rate"
                  value="Mensal"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
