import { FormControl, InputLabel, TextField } from "@mui/material";
import { Control, Controller, FieldErrors, UseFormRegister, UseFormResetField, UseFormSetValue } from "react-hook-form";
import { FormInputSlider } from "../common_comp/FormInputSlider";
import { FormValues } from '../../models/types/FormValuesType'

import styles from './ConditionalFields.module.css';

interface SelectedFieldsInterface {
    register: UseFormRegister<FormValues>;
    control: Control<FormValues, any>;
    setValue: UseFormSetValue<FormValues>;
    errors: FieldErrors<FormValues>;
    resetField: UseFormResetField<FormValues>;
    dishType: string;
}

const DynamicFieldsForSelectedOption = ({ register, control, setValue, errors, dishType }: SelectedFieldsInterface) => {

    let activeComponent: JSX.Element = <div></div>;

    const no_of_slices =
        <div style={{ padding: '15px' }}>
            <FormControl fullWidth>
                <TextField
                    label="Number of slices"
                    error={Boolean(errors.no_of_slices)}
                    helperText={errors.no_of_slices ? String(errors.no_of_slices?.message) : ''}
                    type="number"
                    variant="outlined"
                    {...register("no_of_slices", {
                        required: dishType === "pizza" ? "This field is required" : false,
                        min: {
                            value: 1,
                            message: "Minimum value is 1"
                        }
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
                    InputProps={{ inputProps: { step: 0.1 } }}
                    {...register("diameter", {
                        required: dishType === "pizza" ? "This field is required" : false,
                        min: {
                            value: 1,
                            message: "Minimum value is 5"
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
                {errors.spiciness_scale && <span>This information is required.</span>}
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

    const switchActiveComponent = (dishType: string) => {
        switch (dishType) {
            case "pizza":
                {
                    activeComponent = <div>
                        <Controller
                            name={"no_of_slices"}
                            control={control}
                            render={() => (
                                no_of_slices
                            )}
                        />
                        <Controller
                            name={"diameter"}
                            control={control}
                            render={() => (
                                diameter
                            )}
                        />
                    </div>;
                    break;
                }
            case "soup":
                {
                    activeComponent =
                        <Controller
                            name={"spiciness_scale"}
                            control={control}
                            render={() => (
                                spiciness_scale
                            )}
                        />;
                    break;
                }
            case "sandwich":
                {
                    activeComponent =
                        <Controller
                            name={"slices_of_bread"}
                            control={control}
                            render={() => (
                                slices_of_bread
                            )}
                        />;
                    break;
                }
            default:
                activeComponent = <div />;
                break;
        }

        return activeComponent;
    }


    return switchActiveComponent(dishType);
}


export default DynamicFieldsForSelectedOption;

