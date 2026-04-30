export function calculateMortgage({ amount, term, rate, mortgageType }: { amount: string; term: string; rate: string; mortgageType: string }) {
  const principal = Number(amount.replace(/,/g, ""));
  const years = Number(term);
  const annualRate = Number(rate);

  if (!principal || !years || annualRate < 0 || !mortgageType) {
    return null;
  }

  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;

  let monthlyRepayment = 0;
  let totalRepayment = 0;

  if (mortgageType === "Repayment") {
    if (monthlyRate === 0) {
      monthlyRepayment = principal / totalPayments;
    } else {
      monthlyRepayment = (principal * monthlyRate * (1 + monthlyRate) ** totalPayments) / ((1 + monthlyRate) ** totalPayments - 1);
    }

    totalRepayment = monthlyRepayment * totalPayments;
  }

  if (mortgageType === "Interest Only") {
    monthlyRepayment = principal * monthlyRate;
    totalRepayment = monthlyRepayment * totalPayments;
  }

  return {
    monthlyRepayment,
    totalRepayment,
  };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
