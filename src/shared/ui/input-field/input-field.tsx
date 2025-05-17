import { UseFormRegister, Path, FieldValues } from "react-hook-form";

type TInputFieldProps<T extends FieldValues> = {
    type: string;
    placeholder: string;
    register: UseFormRegister<T>;
    name: Path<T>;
    error?: string;
    label?: string;
};

export const InputField = <T extends FieldValues>({
    type,
    placeholder,
    register,
    name,
    error,
    label,
}: TInputFieldProps<T>) => {
    return (
        <div className="w-full relative">
            {label && <label className="block mb-2 text-primary">{label}</label>}
            <input
                {...register(name)}
                type={type}
                placeholder={placeholder}
                className="input w-full input-primary"
            />
            {error && <span className="absolute left-2 top-10 text-error text-min">{error}</span>}
        </div>
    );
};
