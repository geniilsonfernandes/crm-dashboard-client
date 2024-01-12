import React, { useMemo, useState } from "react";
import Card from "./Card";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../pages/utils";
const MRRChart = () => {
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
    colors: ["#6366F1", "#EF4444"],
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
    yaxis: {
      labels: {
        style: {
          colors: "#b9b9c3",
          fontSize: "0.86rem",
        },
      },
    },
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
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380, 1540, 1600],
    },
    {
      name: "CHURN",
      data: [1100, 1200, 1380, 1540, 1600, 400, 30, 448, 470, 540, 580, 690],
    },
  ];

  const [yearRange, setYearRange] = useState(2022);
  const [selectYear, setSelectYear] = useState(2022);

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
      title="Receita Recorrente Mensal (MRR)"
      footer="Válores de calculo: assinaturas ativas no mes e o tempo de assinatura"
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
