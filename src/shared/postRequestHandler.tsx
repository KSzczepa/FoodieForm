import { FormValues } from "../models/types/FormValuesType";

export async function postFormData(data: FormValues, url: string) {

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return response;

}