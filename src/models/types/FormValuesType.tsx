import { Dayjs } from "dayjs";

export type FormValues =  {
    name: string;
    preparation_time: number | Dayjs | null | string;
    type: string;
    no_of_slices?: number;
    diameter?: number;
    spiciness_scale?: number;
    slices_of_bread?: number;
}



