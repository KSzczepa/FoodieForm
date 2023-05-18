import { ObjectPairArrayWithDishAndKey } from './types/PairsOfDishAndKeyType';

export const allkeysForConditionalField = ["no_of_slices", "diameter", "spiciness_scale", "slices_of_bread"];

export const pairsOfDishAndKey: ObjectPairArrayWithDishAndKey[] = [
    { 
        dishName: "pizza",
        keyFields: ["no_of_slices", "diameter"],
    },
    { 
        dishName: "soup",
        keyFields: ["spiciness_scale"],
    },
    { 
        dishName: "sandwich",
        keyFields: ["slices_of_bread"],
    }
]
