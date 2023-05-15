import { FormValues } from '../types/FormValues'

export function FilterFormData(data: FormValues) {
    return Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== undefined)) as FormValues;
}

