import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import { Calendar, ChevronLeft } from "lucide-react";
import { AvaregeCard, AvaregeCardProps } from "../../Components/AvaregeCard";
import Card from "../../Components/Card";
import DonutChart from "../../Components/DonutChart";
import MRRChart from "../../Components/MRRChart";
import { IAnalyticsDTO } from "../../http/analytics/analyticsDTO";
import { formatCurrencyToBRL, formatToPercentage } from "../utils";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

export const ImportPage = () => {
  const { id } = useParams() as {
    id: string;
  };
  const { data, isLoading } = useQuery<IAnalyticsDTO>({
    queryKey: ["analytics,1"],
    queryFn: () =>
      axios
        .get<IAnalyticsDTO>("http://localhost:4000/analytics", {
          params: {
            import_id: id,
          },
        })
        .then((res) => res.data),
  });

  const subscriptions = useMemo(() => {
    const active_customers = data?.analytics?.active_customers_by_plan;
    const churn_rate_by_plan = data?.analytics?.churn_rate_by_plan;
    const plans_customers_labels = Object.keys(active_customers || {});
    const plans_customers_data = Object.values(active_customers || {});

    const churn_rate_by_plan_labels = Object.keys(churn_rate_by_plan || {});
    const churn_rate_by_plan_data = Object.values(churn_rate_by_plan || {});

    const m = churn_rate_by_plan_data.reduce(
      (acc, curr, i) => {
        if (acc.amount < curr) {
          acc.amount = curr;
          acc.planIndex = i;
        }

        return acc;
      },
      {
        amount: 0,
        planIndex: 0,
      }
    );
    console.log(m);

    return {
      active_customers: {
        labels: plans_customers_labels || [],
        data: plans_customers_data || [],
        total: data?.analytics?.active_customers || 0,
      },
      churn_rate: {
        labels: churn_rate_by_plan_labels || [],
        data: churn_rate_by_plan_data || [],
        must_rate_plan: churn_rate_by_plan_labels[m.planIndex] || "Nenhum",
      },
    };
  }, [data]);

  const analytics = [
    {
      title: "Clientes Ativos",
      value: data?.analytics.active_customers || 0,
      helprText: "Número de clientes ativos atualmente",
      color: "success",
    },
    {
      title: "Taxa de Retenção",
      value: formatToPercentage(data?.analytics.retention_rate || 0),
      helprText: "Porcentagem de clientes retidos",
      color:
        Number(data?.analytics?.retention_rate) >= 50 ? "success" : "danger",
      icon: "MoveUp",
    },
    {
      title: "Taxa de Churn de Clientes",
      value: formatToPercentage(data?.analytics.customers_churn_rate || 0),
      helprText:
        "Porcentagem de clientes que deixaram de ser ativos, Valor abaixo de 20% seria o melhor resultado",
      color:
        Number(data?.analytics.customers_churn_rate || 0) >= 20
          ? "danger"
          : "success",
      icon: "MoveDown",
    },
    {
      title: "Receita Recorrente Média (MRR)",
      value: formatCurrencyToBRL(data?.analytics.avarage_mrr || 0),
      helprText: "Média da receita recorrente mensal por cliente",
      color: data?.analytics.avarage_mrr || 0 >= 0.5 ? "success" : "danger",
      icon: "DollarSign",
    },
  ] as AvaregeCardProps[];

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
            {data?.inport.name}
          </h1>
          <div className="flex items-center gap-4 ">
            <Calendar className="text-slate-400" size={32} />
            <div>
              <h4 className="text-xl font-bold light:text-slate-400 dark:text-slate-100">
                Data da importação
              </h4>
              <p className="text-sm text-slate-400">
                {dayjs(data?.inport.created_at).format("DD/MM/YYYY") || "-"}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div className="grid grid-cols-4 gap-8">
            {analytics.map((item) => (
              <AvaregeCard
                isLoading={isLoading}
                key={item.title}
                title={item.title}
                value={item.value}
                color={item.color}
                icon={item.icon}
                helprText={item.helprText}
              />
            ))}
          </div>
          <div className="grid grid-cols-12 gap-8">
            <MRRChart />

            <Card
              title="Assinaturas"
              className="col-span-4"
              isLoading={isLoading}
            >
              <div className="">
                <DonutChart
                  title="Tipos de Assinatura"
                  subtitle="Total de assinaturas ativas:"
                  value={data?.analytics.active_customers.toString() || "0"}
                  data={subscriptions.active_customers.data}
                  labels={subscriptions.active_customers.labels}
                />
                <hr className="my-8" />
                <DonutChart
                  title="Churn rate por assinatura"
                  subtitle="Assinatura com maior churn rate"
                  value={subscriptions.churn_rate.must_rate_plan}
                  data={subscriptions.churn_rate.data}
                  labels={subscriptions.churn_rate.labels}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};