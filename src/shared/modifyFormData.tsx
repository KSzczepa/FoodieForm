import { FormValues } from '../assets/types/FormValuesType'
import { allkeysForConditionalField, pairsOfDishAndKey } from '../assets/mealFormDefaultKeyValues'
import { UseFormResetField } from 'react-hook-form';
import { toastHandler } from './toastHandler';

export function filterFormData(data: FormValues) {
    return Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== undefined)) as FormValues;
}

export async function postFormData(data: FormValues, url: string) {

    toastHandler('PENDING');

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    showPostRequestResult(response, data);
}


export async function showPostRequestResult(result: Response, data: FormValues) {
    const receivedData = await result.json();
    console.log(receivedData);    

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
      
    switch (type) {
        case "pizza":
            {                
                resetField("spiciness_scale");
                resetField("slices_of_bread");
                break;
            }
        case "soup":
            {
                resetField("no_of_slices");
                resetField("diameter");
                resetField("slices_of_bread");
                break;
            }
        case "sandwich":
            {
                resetField("no_of_slices");
                resetField("diameter");
                resetField("spiciness_scale");
                break;
            }
        default:
            break;

    }
}

