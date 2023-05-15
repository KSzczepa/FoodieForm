import { FormControl, FormHelperText, InputLabel, SelectChangeEvent, TextField } from "@mui/material";
import { Control, Controller, FieldErrors, FormState, UseFormRegister, UseFormSetValue, useForm } from "react-hook-form";
import { FormInputSlider } from "../components/FormInputSlider";

import styles from '../components/MealForm.module.css';
import { useState } from "react";
import { FormValues } from "../types/FormValues";



export function selectedDishType(
    register: UseFormRegister<any>, control: Control<any, any>,
    setValue: UseFormSetValue<any>, errors: FieldErrors<any>, 
    dishType: string) {

    // const { reset } = useForm<FormValues>();

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
                {/* {errors.no_of_slices && <FormHelperText style={{ color: "#d32f2f" }}>
                    {String(errors.no_of_slices.message)}</FormHelperText>} */}
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
                {/* {errors.diameter && <FormHelperText style={{ color: "#d32f2f" }}>{String(errors.diameter.message)}</FormHelperText>} */}
            </FormControl >
        </div>

    const spiciness_scale =
        <div style={{ padding: '15px' }}>
            <FormControl fullWidth>
                <InputLabel className={styles.inputLabel}>Spiciness scale</InputLabel>
                <FormInputSlider name={"spiciness"}
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
                    {no_of_slices}
                    {diameter}
                </div>;
                break;
            }
        case "soup":
            {
                result = spiciness_scale;
                break;
            }
        case "sandwich":
            {
                result = slices_of_bread;
                break;
            }
        default:
            result = <div />;

    }

    return result;
}


export { }


