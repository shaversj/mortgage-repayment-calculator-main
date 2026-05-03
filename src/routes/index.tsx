import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { MortgageForm, type MortgageFormValues } from "../components/MortgageForm";
import { ResultsPanel } from "../components/ResultsPanel";
import { calculateMortgage } from "../utils/mortgage";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [calculatorResults, setCalculatorResults] = useState<{ monthlyRepayment: number; totalRepayment: number } | null>(null);

  const defaultValues: MortgageFormValues = {
    amount: "",
    term: "",
    rate: "",
    mortgageType: "",
  };

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const result = calculateMortgage(value);
      setCalculatorResults(result);
    },
  });

  return (
    <div className={"min-h-screen bg-slate-100 md:grid md:place-items-center"}>
      <main className={"rounded-3xl bg-white lg:flex lg:min-h-[606px] lg:overflow-hidden"}>
        <div className={"bg-white px-6 py-8 md:p-10 lg:w-126"}>
          <MortgageForm
            form={form}
            onClear={() => {
              form.reset();
              setCalculatorResults(null);
            }}
          />
        </div>
        <ResultsPanel results={calculatorResults} />
      </main>
    </div>
  );
}
