import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { FaSterlingSign } from "react-icons/fa6";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const form = useForm({
    defaultValues: {
      amount: "",
      term: "",
      rate: "",
      mortgageType: "",
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });

  return (
    <div className={"grid min-h-screen place-items-center bg-slate-100"}>
      <section className={"w-126 bg-white p-10"}>
        <header className={"flex items-center"}>
          <h1 className={"text-preset-2 text-slate-900"}>Mortgage Calculator</h1>
          <p className={"text-preset-4 ml-auto text-slate-700 underline"}>Clear All</p>
        </header>
        <main className={"pt-10"}>
          <form.Field
            name="amount"
            children={(field) => (
              <div className={"space-y-3"}>
                <label htmlFor={field.name} className={"text-preset-4 block text-slate-700"}>
                  Mortgage Amount
                </label>
                <div className={"group field-shell focus-within:field-shell-focus"}>
                  <div className={"field-prefix text-preset-3 group-focus-within:field-prefix-focus"}>
                    <FaSterlingSign aria-hidden="true" className={"size-6"} />
                  </div>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="300,000"
                    className={"field-input text-preset-3"}
                  />
                </div>
              </div>
            )}
          />
        </main>
      </section>

      <section></section>
    </div>
  );
}
