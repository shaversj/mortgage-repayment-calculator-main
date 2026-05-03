import heroImage from "/hero-image.svg";
import { formatCurrency } from "../utils/mortgage";

type CalculatorResults = {
  monthlyRepayment: number;
  totalRepayment: number;
} | null;

type ResultsPanelProps = {
  results: CalculatorResults;
};

export function ResultsPanel({ results }: ResultsPanelProps) {
  if (!results) {
    return (
      <section className={"grid place-items-center bg-slate-900 md:rounded-b-3xl lg:w-126 lg:rounded-bl-[5rem]"}>
        <div className={"grid place-items-center space-y-4 p-10"}>
          <img src={heroImage} alt="Illustration of a person calculating their mortgage repayments" />
          <p className={"text-preset-2 text-white"}>Results shown here</p>
          <p className={"text-preset-4 text-center text-slate-300"}>
            Complete the form and click “calculate repayments” to see what your monthly repayments would be.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={"bg-slate-900 px-6 py-8 md:rounded-br-3xl md:p-10 lg:w-126 lg:rounded-bl-[5rem]"}>
      <div>
        <p className={"text-preset-2 text-white"}>Your Results</p>
        <p className={"text-preset-4 pt-4 text-slate-300"}>
          Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate
          repayments” again.
        </p>
      </div>

      <div className={"bg-lime mt-6 rounded-lg pt-1 md:mt-10"}>
        <div className={"rounded-t-[0.28888rem] rounded-b-lg bg-[#0e2431] px-8 py-10"}>
          <p className={"text-preset-4 text-slate-300"}>Your monthly repayments</p>
          <p className={"text-lime text-preset-1 pt-2"}>{formatCurrency(results.monthlyRepayment)}</p>
          <div className={"mt-8 h-[1px] bg-[#9ABED5]/25"} />
          <p className={"text-preset-4 pt-8 text-slate-300"}>Total you'll repay over the term</p>
          <p className={"text-preset-2 pt-2 text-left text-white"}>{formatCurrency(results.totalRepayment)}</p>
        </div>
      </div>
    </section>
  );
}
