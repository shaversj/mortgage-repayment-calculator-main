import type { ReactNode } from "react";

type InputRowProps = {
  label: string;
  htmlFor: string;
  error?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  children: ReactNode;
};

export function InputRow({ label, htmlFor, error, startAdornment, endAdornment, children }: InputRowProps) {
  const hasError = Boolean(error);
  const adornmentClassName = [
    "field-prefix text-preset-3 group-focus-within:field-prefix-focus",
    hasError ? "bg-red text-white group-focus-within:bg-red group-focus-within:text-white" : "",
  ].join(" ");

  return (
    <div className={"space-y-3"}>
      <label htmlFor={htmlFor} className={"text-preset-4 block text-slate-700"}>
        {label}
      </label>
      <div className={["group field-shell focus-within:field-shell-focus", hasError ? "border-red" : ""].join(" ")}>
        {startAdornment ? <div className={adornmentClassName}>{startAdornment}</div> : null}
        {children}
        {endAdornment ? <div className={adornmentClassName}>{endAdornment}</div> : null}
      </div>
      {error ? <p className={"text-preset-4 text-red"}>{error}</p> : null}
    </div>
  );
}
