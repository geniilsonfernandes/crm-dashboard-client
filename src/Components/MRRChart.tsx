import { useQuery } from "@tanstack/react-query";
import { ApexOptions } from "apexcharts";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { useMemo, useState } from "react";
import Chart from "react-apexcharts";
import api from "../http/api";
import { cn, formatCurrencyToBRL } from "../pages/utils";
import Card from "./Card";
type MRRChartProps = {
  import_id: string;
};
const MRRChart = ({ import_id }: MRRChartProps) => {
  const [yearRange, setYearRange] = useState(2022);
  const [selectYear, setSelectYear] = useState(2022);

  const getMRR = async (import_id: string, year: number) => {
    const { data } = await api.get("analytics/mrr", {
      params: {
        import_id,
        year,
      },
    });

    return data;
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [selectYear],
    queryFn: () => getMRR(import_id, selectYear),
  });

  const chartOptions: ApexOptions = {
    chart: {
      id: "monthly-sales-chart",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#0f172a", "#EF4444"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    legend: {
      show: true,
    },
    dataLabels: {
      enabled: true,
      textAnchor: "middle",
      formatter: function (val, { seriesIndex, w }) {
        // Verifica o nome da série e formata conforme necessário
        if (w.config.series[seriesIndex].name === "MRR") {
          return formatCurrencyToBRL(Number(val));
        } else {
          return val.toString(); // Formata o Churn como número inteiro
        }
      },
      style: {
        fontSize: "10px",
      },
    },
    grid: {
      padding: {
        top: -10,
        bottom: -10,
      },
      yaxis: {
        lines: { show: false, offsetX: 0, offsetY: 0 },
      },
    },
    yaxis: [
      {
        labels: {
          show: false,
          style: {
            colors: "#b9b9c3",
            fontSize: "0.86rem",
          },
          formatter: (val) => formatCurrencyToBRL(val),
        },
      },
      {
        labels: {
          show: false,
          formatter: (val) => val.toString(),
        },
        floating: true,
      },
    ],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#b9b9c3",
          fontSize: "0.86rem",
        },
      },

      axisTicks: {
        show: false,
      },
    },
  };

  const chartSeries = [
    {
      name: "MRR",
      data: data?.analytics?.mrr_month || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "Churn",
      data: data?.analytics?.chrunRatePerMonth || [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
    },
  ];

  const handleYearChange = (year: number) => {
    setSelectYear(year);
  };

  const handleNextYear = () => {
    setYearRange(yearRange + 1);
  };

  const handlePreviousYear = () => {
    setYearRange(yearRange - 1);
  };

  const createRangeYears = useMemo(() => {
    const years = [];

    for (let i = 0; i < 5; i++) {
      years.push(yearRange + i);
    }

    return years;
  }, [yearRange]);

  return (
    <Card
      className="col-span-8"
      title="Receita Recorrente Mensal (MRR)"
      footer="Válores de calculo: assinaturas ativas no mes e o tempo de assinatura"
      headerRight={
        isLoading || isFetching ? (
          <div className="flex items-center gap-2 text-gray-200">
            Carregando...
            <Loader size={24} className="animate-spin" />
          </div>
        ) : null
      }
    >
      <div className="flex justify-between mb-4">
        <div className="flex flex-1 justify-between">
          {createRangeYears.map((year) => (
            <button
              className={cn("text-slate-400 py-2 border-b flex-1", {
                "border-b-slate-800 text-slate-900 font-bold":
                  year === selectYear,
              })}
              onClick={() => handleYearChange(year)}
            >
              {year}
            </button>
          ))}
        </div>
        <div>
          <button
            className="p-2 rounded bg-slate-100 text-slate-400"
            onClick={handlePreviousYear}
          >
            <ChevronLeft />
          </button>

          <button
            className="p-2 rounded bg-slate-100 text-slate-400"
            onClick={handleNextYear}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <Chart
        options={chartOptions}
        series={chartSeries}
        type="area"
        height="350"
      />
    </Card>
  );
};

export default MRRChart;
