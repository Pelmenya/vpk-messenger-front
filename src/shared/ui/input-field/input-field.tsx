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
        <div className="w-full">
            {label && <label htmlFor={name} className="block text-primary">{label}</label>}
            <input
                {...register(name)}
                type={type}
                id={name}
                placeholder={placeholder}
                className="input w-full input-primary"
            />
            <span className={`block max-w-md text-ex-min h-2 mt-1 ${error ? 'text-error' : 'text-transparent'}`}>
                {error || ' '}
            </span>
        </div>
    );
};
