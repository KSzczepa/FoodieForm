
export type FormValues =  {
    name: string;
    preparation_time: number;
    type: string;
    no_of_slices?: number;
    diameter?: number;
    spiciness_scale?: number;
    slices_of_bread?: number;
}

export type DishTypePairs = {
    name: string;
    keys: string | string[]
}

export const dishTypePairs: DishTypePairs[] = [
    { 
        name: "pizza",
        keys: ["no_of_slices", "diameter"],
    },
    { 
        name: "soup",
        keys: ["spiciness_scale"],
    },
    { 
        name: "sandwich",
        keys: ["slices_of_bread"],
    }
]

export const allKeysForConditionalField = ["no_of_slices", "diameter", "spiciness_scale", "slices_of_bread"];