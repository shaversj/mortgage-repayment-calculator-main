import type { ReactFormExtendedApi } from "@tanstack/react-form";
import { FaSterlingSign } from "react-icons/fa6";
import calculatorImage from "/calculator-image.svg";
import { InputRow } from "./InputRow";

export type MortgageFormValues = {
  amount: string;
  term: string;
  rate: string;
  mortgageType: string;
};

type AnyReactForm<TValues> = ReactFormExtendedApi<TValues, any, any, any, any, any, any, any, any, any, any, any>;

type MortgageFormProps = {
  form: AnyReactForm<MortgageFormValues>;
  onClear: () => void;
};

export function MortgageForm({ form, onClear }: MortgageFormProps) {
  return (
    <>
      <header className={"items-center lg:flex"}>
        <h1 className={"text-preset-2 text-slate-900"}>Mortgage Calculator</h1>
        <button type="button" className="text-preset-4 ml-auto pt-2 text-slate-700 underline md:pt-0" onClick={onClear}>
          Clear All
        </button>
      </header>
      <section className={"pt-6 md:pt-10"}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <form.Field
            name="amount"
            validators={{
              onSubmit: ({ value }) => (!value ? "This field is required" : undefined),
            }}
            children={(field) => (
              <InputRow
                label="Mortgage Amount"
                htmlFor={field.name}
                error={field.state.meta.errors[0]}
                startAdornment={<FaSterlingSign aria-hidden="true" className={"size-6"} />}
              >
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    const formatted = raw ? Number(raw).toLocaleString("en-GB") : "";
                    field.handleChange(formatted);
                  }}
                  className={"field-input text-preset-3"}
                />
              </InputRow>
            )}
          />
          <section className={"mt-6 space-y-6 md:flex md:gap-4 md:space-y-0"}>
            <form.Field
              name="term"
              validators={{
                onSubmit: ({ value }) => (!value ? "This field is required" : undefined),
              }}
              children={(field) => (
                <InputRow label="Mortgage Term" htmlFor={field.name} error={field.state.meta.errors[0]} endAdornment={"years"}>
                  <input
                    id={field.name}
                    name={field.name}
                    inputMode="numeric"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      const numeric = e.target.value.replace(/\D/g, "");
                      field.handleChange(numeric);
                    }}
                    className={"field-input text-preset-3"}
                  />
                </InputRow>
              )}
            />
            <form.Field
              name="rate"
              validators={{
                onSubmit: ({ value }) => (!value ? "This field is required" : undefined),
              }}
              children={(field) => (
                <InputRow label="Interest Rate" htmlFor={field.name} error={field.state.meta.errors[0]} endAdornment={"%"}>
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
                </InputRow>
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
    </>
  );
}
