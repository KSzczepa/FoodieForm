import { FormValues } from '../models/types/FormValuesType'
import { UseFormResetField } from 'react-hook-form';
import { toastHandler } from './toastHandler';
import { pairsOfDishAndKey } from '../models/requiredFieldsByDishType';

export function filterFormData(data: FormValues) {
    return Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== undefined)) as FormValues;
}


export async function showPostRequestResultForMealForm(result: Response, data: FormValues) {
    const receivedData = await result.json();

    if (result.ok) {
        toastHandler('SUCCESS', 'Message sent!');
    }

    if (!result.ok) {
        let errorMessage: string;
        errorMessage = '';
        for (const key in data) {
            if (receivedData[key]) {
                errorMessage = errorMessage + key + ": " + receivedData[key][0] + " ";
            }
        }
        toastHandler('ERROR', errorMessage);
    }
}


export function resetUnselectedFields(type: string, resetField: UseFormResetField<FormValues>) {
    pairsOfDishAndKey.filter((it) => it.dishName != type).forEach(element => {
        element.keyFields.forEach(field=>resetField(field))
    });
}

