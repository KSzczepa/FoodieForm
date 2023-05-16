import { toast } from 'react-toastify';
import { FormValues, allKeysForConditionalField, dishTypePairs } from '../types/FormValues'
import { UseFormResetField } from 'react-hook-form';

export function filterFormData(data: FormValues) {
    return Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== undefined)) as FormValues;
}

const removeDataByKeywords = (data: Record<string, any>, keywords: string[]): object => {
    const filteredData = Object.keys(data).filter((key) => {
      return !keywords.some((keyword) => key.includes(keyword));
    });
    const newData = filteredData.reduce((obj, key) => {
        return {
          ...obj,
          [key]: data[key],
        };
      }, {});
    
      return newData as FormValues;
};

function filterForKeysToRemove(selectedDishType: string) {
    let keys: string[] = [];

    for (let i = 0; i< dishTypePairs.length; i++) {
        if (dishTypePairs[i].name == selectedDishType) {
            keys = allKeysForConditionalField.filter((element => !dishTypePairs[i].keys.includes(element)));
        }
    }
    return keys;
}

function processSelectedOption(inputData: FormValues) {    
    const keys = filterForKeysToRemove(inputData.type);
    const outputData = removeDataByKeywords(inputData, keys);
    return outputData;
}

export async function postFormData(data: FormValues, url: string) {
    const dataToPost = processSelectedOption(data);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToPost)
    });

    showPostRequestResult(response);
}

export async function showPostRequestResult(result: Response) {
    const receivedData = await result.json();

    if (result.ok) {
        toast.success('Message sent!', {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    if (!result.ok) {
        toast.error('An error occured:\n' + receivedData.error, {
            position: toast.POSITION.TOP_RIGHT
        });
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

