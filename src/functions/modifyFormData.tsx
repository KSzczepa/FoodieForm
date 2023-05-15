import { toast } from 'react-toastify';
import { FormValues } from '../types/FormValues'

export function FilterFormData(data: FormValues) {
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

function processSelectedOption(inputData: FormValues) {
    let keys: string[];

    switch (inputData.type) {
        case "pizza":
            {
                keys = ["spiciness_scale", "slices_of_bread"];
                break;
            }
        case "soup":
            {
                keys = ["no_of_slices", "diameter", "slices_of_bread"];
                break;
            }
        case "sandwich":
            {
                keys = ["no_of_slices", "diameter", "spiciness_scale"];
                break;
            }
        default:
            keys = ["no_of_slices", "diameter", "spiciness_scale", "slices_of_bread"];
            break;

    }

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