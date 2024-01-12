import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IAnalyticsDTO } from "../../http/analytics/analyticsDTO";

export const Home = () => {
  const { data, isLoading } = useQuery<IAnalyticsDTO>({
    queryKey: ["analytics,1"],
    queryFn: () =>
      axios
        .get<IAnalyticsDTO>("http://localhost:4000/analytics", {
          params: {
            import_id: "085281dc-80a1-405d-8ec1-a9ee651373e3",
          },
        })
        .then((res) => res.data),
  });

  return (
    <div className="bg-slate-200  ">
      <div className="bg-slate-900 h-[300px]"></div>
      <div className="container pt-8 -mt-44 pb-8"></div>
    </div>
  );
};
