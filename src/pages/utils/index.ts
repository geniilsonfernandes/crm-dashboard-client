import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function formatCurrencyToBRL(value: number) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return formatter.format(value);
}

function formatToPercentage(value: number) {
  return `${value.toFixed(2)}%`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { formatCurrencyToBRL, formatToPercentage };
