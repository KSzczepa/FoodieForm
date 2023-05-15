import { FormValues } from '../types/FormValues'

export function Validate(input: string | number, validationFcn: Function) {
    if (validationFcn(input))
        return true;
}

export function FilterFormData(data: FormValues) {
    return Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== undefined));
}