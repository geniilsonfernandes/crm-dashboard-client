import { Activity } from "lucide-react";
import Chart from "react-apexcharts";

type DonutChartProps = {
  data: number[];
  labels: string[];

  title?: string;
  subtitle?: string;
  value?: string;
};

const DonutChart = ({
  data,
  labels,
  subtitle,
  title,
  value,
}: DonutChartProps) => {
  return (
    <div className="flex justify-between">
      <div>
        <div className="flex items-center gap-2 text-slate-400 font-bold">
          <div className="bg-slate-200 p-2 rounded-full w-10 h-10 flex items-center justify-center">
            <Activity size={32} className="text-slate-400" />
          </div>
          {title}
        </div>
        <div className="text-slate-400 text-sm mt-8">{subtitle}</div>

        <div className="text-2xl font-bold text-slate-500 mt-2">{value}</div>
      </div>
      <Chart
        type="donut"
        width="200px"
        height="200px"
        series={data}
        options={{
          labels: labels,
          colors: ["#cecece", "#838383"],
          legend: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
          fill: {},
          plotOptions: {
            pie: {
              donut: {
                size: "30%",
                background: "transparent",
                labels: {
                  show: false,
                },
              },
            },
            heatmap: {
              distributed: true,
            },
          },
          chart: {
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
          },
        }}
      />
    </div>
  );
};

export default DonutChart;
