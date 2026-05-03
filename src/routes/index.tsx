import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { FaSterlingSign } from "react-icons/fa6";
import heroImage from "/hero-image.svg";
import { calculateMortgage, formatCurrency } from "../utils/mortgage";
import { useState } from "react";
import calculatorImage from "/calculator-image.svg";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [calculatorResults, setCalculatorResults] = useState<{ monthlyRepayment: number; totalRepayment: number } | null>(null);

  const form = useForm({
    defaultValues: {
      amount: "",
      term: "",
      rate: "",
      mortgageType: "",
    },
    onSubmit: async ({ value }) => {
      const result = calculateMortgage(value);
      setCalculatorResults(result);
    },
  });

  return (
    <div className={"min-h-screen bg-slate-100 md:grid md:place-items-center"}>
      <main className={"rounded-3xl bg-white lg:flex lg:min-h-[606px] lg:overflow-hidden"}>
        <div className={"bg-white px-6 py-8 md:p-10 lg:w-126"}>
          <header className={"items-center lg:flex"}>
            <h1 className={"text-preset-2 text-slate-900"}>Mortgage Calculator</h1>
            <button
              type="button"
              className="text-preset-4 ml-auto pt-2 text-slate-700 underline md:pt-0"
              onClick={() => {
                form.reset();
                setCalculatorResults(null);
              }}
            >
              Clear All
            </button>
          </header>
          <section className={"pt-6 md:pt-10"}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <form.Field
                name="amount"
                validators={{
                  onSubmit: ({ value }) => (!value ? "This field is required" : undefined),
                }}
                children={(field) => (
                  <div className={"space-y-3"}>
                    <label htmlFor={field.name} className={"text-preset-4 block text-slate-700"}>
                      Mortgage Amount
                    </label>
                    <div
                      className={["group field-shell focus-within:field-shell-focus", field.state.meta.errors.length ? "border-red" : ""].join(" ")}
                    >
                      <div
                        className={[
                          "field-prefix text-preset-3 group-focus-within:field-prefix-focus",
                          field.state.meta.errors.length ? "bg-red group-focus-within:bg-red text-white group-focus-within:text-white" : "",
                        ].join(" ")}
                      >
                        <FaSterlingSign aria-hidden="true" className={"size-6"} />
                      </div>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/[^\d]/g, "");
                          const formatted = raw ? Number(raw).toLocaleString("en-GB") : "";
                          field.handleChange(formatted);
                        }}
                        className={"field-input text-preset-3"}
                      />
                    </div>
                    {field.state.meta.errors[0] ? <p className={"text-preset-4 text-red"}>{field.state.meta.errors[0]}</p> : null}
                  </div>
                )}
              />
              <section className={"mt-6 space-y-6 md:flex md:gap-4 md:space-y-0"}>
                <form.Field
                  name="term"
                  validators={{
                    onSubmit: ({ value }) => (!value ? "This field is required" : undefined),
                  }}
                  children={(field) => (
                    <div className={"space-y-3"}>
                      <label htmlFor={field.name} className={"text-preset-4 block text-slate-700"}>
                        Mortgage Term
                      </label>
                      <div
                        className={["group field-shell focus-within:field-shell-focus", field.state.meta.errors.length ? "border-red" : ""].join(" ")}
                      >
                        <input
                          id={field.name}
                          name={field.name}
                          inputMode="numeric"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => {
                            const numeric = e.target.value.replace(/[^\d]/g, "");
                            field.handleChange(numeric);
                          }}
                          className={"field-input text-preset-3"}
                        />
                        <div
                          className={[
                            "field-prefix text-preset-3 group-focus-within:field-prefix-focus",
                            field.state.meta.errors.length ? "bg-red group-focus-within:bg-red text-white group-focus-within:text-white" : "",
                          ].join(" ")}
                        >
                          years
                        </div>
                      </div>
                      {field.state.meta.errors[0] ? <p className={"text-preset-4 text-red"}>{field.state.meta.errors[0]}</p> : null}
                    </div>
                  )}
                />
                <form.Field
                  name="rate"
                  validators={{
                    onSubmit: ({ value }) => (!value ? "This field is required" : undefined),
                  }}
                  children={(field) => (
                    <div className={"space-y-3"}>
                      <label htmlFor={field.name} className={"text-preset-4 block text-slate-700"}>
                        Interest Rate
                      </label>
                      <div
                        className={["group field-shell focus-within:field-shell-focus", field.state.meta.errors.length ? "border-red" : ""].join(" ")}
                      >
                        <input
                          id={field.name}
                          name={field.name}
                          inputMode="decimal"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => {
                            const sanitized = e.target.value.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1");
                            field.handleChange(sanitized);
                          }}
                          className={"field-input text-preset-3"}
                        />
                        <div
                          className={[
                            "field-prefix text-preset-3 group-focus-within:field-prefix-focus",
                            field.state.meta.errors.length ? "bg-red group-focus-within:bg-red text-white group-focus-within:text-white" : "",
                          ].join(" ")}
                        >
                          %
                        </div>
                      </div>
                      {field.state.meta.errors[0] ? <p className={"text-preset-4 text-red"}>{field.state.meta.errors[0]}</p> : null}
                    </div>
                  )}
                />
              </section>

              <section>
                <form.Field
                  name="mortgageType"
                  validators={{
                    onSubmit: ({ value }) => (!value ? "This field is required" : undefined),
                  }}
                  children={(field) => (
                    <fieldset className={"mt-6 space-y-3"}>
                      <legend className={"text-preset-4 text-slate-700"}>Mortgage Type</legend>
                      {["Repayment", "Interest Only"].map((option) => {
                        const checked = field.state.value === option;

                        return (
                          <label
                            key={option}
                            className={[
                              "flex cursor-pointer items-center gap-4 rounded-md border px-4 py-4 transition-colors",
                              checked ? "border-lime bg-lime/15" : "border-slate-500 bg-white hover:border-slate-700",
                            ].join(" ")}
                          >
                            <input
                              type="radio"
                              name={field.name}
                              value={option}
                              checked={checked}
                              onChange={(e) => field.handleChange(e.target.value)}
                              className={"sr-only"}
                            />

                            <span
                              className={[
                                "flex size-5 items-center justify-center rounded-full border-2 transition-colors",
                                checked ? "border-lime" : "border-slate-700",
                              ].join(" ")}
                              aria-hidden="true"
                            >
                              <span className={["bg-lime size-2 rounded-full transition-opacity", checked ? "opacity-100" : "opacity-0"].join(" ")} />
                            </span>

                            <span className={"text-preset-3 text-slate-900"}>{option}</span>
                          </label>
                        );
                      })}
                      {field.state.meta.errors[0] ? <p className={"text-preset-4 text-red"}>{field.state.meta.errors[0]}</p> : null}
                    </fieldset>
                  )}
                />
              </section>

              <button
                className={
                  "bg-lime hover:bg-lime/50 text-preset-3 mt-10 flex w-full items-center justify-center gap-2 rounded-full py-4 text-slate-900 transition-colors md:w-auto md:justify-start md:px-10"
                }
                type="submit"
              >
                <img src={calculatorImage} alt="Calculator icon" className={"size-6"} />
                Calculate Repayments
              </button>
            </form>
          </section>
        </div>

        {calculatorResults ? (
          <section className={"bg-slate-900 px-6 py-8 md:rounded-br-3xl md:p-10 lg:w-126 lg:rounded-bl-[5rem]"}>
            <div className={""}>
              <p className={"text-preset-2 text-white"}>Your Results</p>
              <p className={"text-preset-4 pt-4 text-slate-300"}>
                Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate
                repayments” again.
              </p>
            </div>

            <div className={"bg-lime mt-6 rounded-lg pt-1 md:mt-10"}>
              <div className={"rounded-t-[0.28888rem] rounded-b-lg bg-[#0e2431] px-8 py-10"}>
                <p className={"text-preset-4 text-slate-300"}>Your monthly repayments</p>
                <p className={"text-lime text-preset-1 pt-2"}>{formatCurrency(calculatorResults.monthlyRepayment)}</p>
                <div className={"mt-8 h-[1px] bg-[#9ABED5]/25"} />
                <p className={"text-preset-4 pt-8 text-slate-300"}>Total you'll repay over the term</p>
                <p className={"text-preset-2 pt-2 text-left text-white"}>{formatCurrency(calculatorResults.totalRepayment)}</p>
              </div>
            </div>
          </section>
        ) : (
          <section className={"grid place-items-center bg-slate-900 md:rounded-b-3xl lg:w-126 lg:rounded-bl-[5rem]"}>
            <div className={"grid place-items-center space-y-4 p-10"}>
              <img src={heroImage} alt="Illustration of a person calculating their mortgage repayments" />
              <p className={"text-preset-2 text-white"}>Results shown here</p>
              <p className={"text-preset-4 text-center text-slate-300"}>
                Complete the form and click “calculate repayments” to see what your monthly repayments would be.
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
