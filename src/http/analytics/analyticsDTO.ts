export interface IAnalyticsDTO {
  analytics: Analytics;
  inport: Inport;
}

interface Analytics {
  active_customers: number;
  customers_chrun: number;
  trial_customers: number;
  retention_rate: number;
  customers_churn_rate: number;
  avarage_mrr: number;
  active_customers_by_plan: ActiveCustomersByPlan;
  churn_rate_by_plan: ChurnRateByPlan;
}
interface Inport {
  id: string;
  name: string;
  created_at: string;
  deleted_at: string | null;
}

export interface ActiveCustomersByPlan {
  Anual: number;
  Mensal: number;
}

export interface ChurnRateByPlan {
  Mensal: number;
  Anual: number;
}
