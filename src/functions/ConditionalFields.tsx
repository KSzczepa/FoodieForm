import { FormControl, InputLabel, TextField } from "@mui/material";
import { Control, Controller, FieldErrors, UseFormRegister, UseFormResetField, UseFormSetValue } from "react-hook-form";
import { FormInputSlider } from "../components/FormInputSlider";
import { FormValues } from '../types/FormValues'

import styles from '../components/MealForm.module.css';
import { useRef } from "react";

interface SelectedFieldsInterface {
    register: UseFormRegister<FormValues>;
    control: Control<FormValues, any>;
    setValue: UseFormSetValue<FormValues>;
    errors: FieldErrors<FormValues>;
    resetField: UseFormResetField<FormValues>;
    dishType: string;
}

const DynamicFieldsForSelectedOption = ({ register, control, setValue, errors, resetField, dishType }: SelectedFieldsInterface) => {

    let result: JSX.Element = <div></div>;


    const no_of_slices =
        <div style={{ padding: '15px' }}>
            <FormControl fullWidth>
                <TextField
                    label="Number of slices"
                    error={Boolean(errors.no_of_slices)}
                    helperText={errors.no_of_slices ? String(errors.no_of_slices?.message) : ''}
                    type="number"
                    variant="outlined"
                    InputProps={{ inputProps: { min: 1, max: 100 } }}
                    {...register("no_of_slices", {
                        required: dishType === "pizza" ? "This field is required" : false,
                        min: {
                            value: 1,
                            message: "Minimum value is 1"
                        },
                    })
                    }
                />
            </FormControl >
        </div>

    const diameter =
        <div style={{ padding: '15px' }}>
            <FormControl fullWidth>
                <TextField
                    error={Boolean(errors.diameter)}
                    helperText={errors.diameter ? String(errors.diameter?.message) : ''}
                    type="number"
                    label="Diameter in cm"
                    variant="outlined"
                    InputProps={{ inputProps: { min: 5, max: 100, step: 0.1 } }}
                    {...register("diameter", {
                        required: dishType === "pizza" ? "This field is required" : false,
                        min: {
                            value: 5,
                            message: "Minimum value is 5"
                        },
                        max: {
                            value: 100,
                            message: "Max value is 100"
                        }
                    })} />
            </FormControl >
        </div>


    const spiciness_scale =
        <div style={{ padding: '15px' }}>
            <FormControl fullWidth>
                <InputLabel className={styles.inputLabel}>Spiciness scale</InputLabel>
                <FormInputSlider name={"spiciness_scale"}
                    control={control}
                    setValue={setValue}
                    label={"Spiciness scale"}
                    min={1}
                    max={10}
                    step={1}
                    defaultValue={5}
                />
                {errors.spiciness_scale && <p>This information is required.</p>}
            </FormControl >
        </div>

    const slices_of_bread =
        <div style={{ padding: '15px' }}>
            <FormControl fullWidth>
                <TextField
                    error={Boolean(errors.slices_of_bread)}
                    helperText={errors.slices_of_bread ? String(errors.slices_of_bread?.message) : ''}
                    type="number"
                    label="Number of slices of bread"
                    variant="outlined"
                    {...register("slices_of_bread", {
                        required: dishType === "sandwich" ? "This field is required" : false,
                        min: {
                            value: 1,
                            message: "Minimum value is 1"
                        },
                    })} />
            </FormControl >
        </div>

    switch (dishType) {
        case "pizza":
            {
                result = <div>
                    <Controller
                        name={"no_of_slices"}
                        control={control}
                        render={({ field, fieldState, formState }) => (
                            no_of_slices
                        )}
                    />
                    <Controller
                        name={"diameter"}
                        control={control}
                        render={({ field, fieldState, formState }) => (
                            diameter
                        )}
                    />
                </div>;
                break;
            }
        case "soup":
            {
                result =
                    <Controller
                        name={"spiciness_scale"}
                        control={control}
                        render={({ field, fieldState, formState }) => (
                            spiciness_scale
                        )}
                    />;
                break;
            }
        case "sandwich":
            {
                result =
                    <Controller
                        name={"slices_of_bread"}
                        control={control}
                        render={({ field, fieldState, formState }) => (
                            slices_of_bread
                        )}
                    />;
                break;
            }
        default:
            result = <div />;
            break;

    }

    return result;
}


export default DynamicFieldsForSelectedOption;

