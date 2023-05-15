import { toast } from 'react-toastify';
import { FormValues } from '../types/FormValues'

export function FilterFormData(data: FormValues) {
    return Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== undefined)) as FormValues;
}

export async function postFormData(dataToPost: FormValues, url: string) {
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