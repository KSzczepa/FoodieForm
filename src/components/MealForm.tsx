import styles from './MealForm.module.css';

import React, { ElementType, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormControl, TextField, MenuItem, Container, InputLabel, FormHelperText, Button } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { FormInputSlider } from './FormInputSlider';
import { selectedDishType } from '../functions/selectDishType';
import SendIcon from '@mui/icons-material/Send';
import { FormValues } from '../types/FormValues'
import { FilterFormData } from '../functions/validation';


const MealForm = () => {

    const { register, handleSubmit, control, watch, formState: { errors }, setValue, getValues } =
        useForm<FormValues>({ mode: "onTouched" });
    const onSubmit = (data: FormValues) => {
        const filteredData = FilterFormData(data);
        console.log(filteredData);

        const postData = async (dataToPost: FormValues) => {
            const response = await fetch('https://example.com/api/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(dataToPost)
            });
            const data = await response.json();
            return data;
          }
    };


    const additionalInfo = {
        dishName: watch("dishName"),
        preparationTime: watch("preparationTime"),
        dishType: watch("dishType"),
        noSlices: watch("noSlices"),
        diameter: watch("diameter"),
        spiciness: watch("spiciness"),
        slicesOfBread: watch("slicesOfBread"),
    };


    const [duration, setDuration] = React.useState<Dayjs | null>(dayjs('2022-04-17T00:00'));
    const [dishType, setDishType] = React.useState('');
    const [additional_field, setAdditionalField] = React.useState(<div />);

    const handleDishTypeChange = (event: SelectChangeEvent) => {
        if (event.target.value) {
            setDishType(event.target.value as string);
            delete errors.dishType;
        }
    };



    useEffect(() => {
        setAdditionalField(selectedDishType(register, control, setValue, errors, dishType));
    }, [additionalInfo]);

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container maxWidth="xs">
                    <div className={styles.element}>
                        <FormControl fullWidth>
                            <TextField
                                label='Dish name'
                                error={Boolean(errors.dishName)}
                                helperText={errors.dishName?.message}
                                variant="outlined"
                                {...register("dishName", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 3,
                                        message: "Dish name is too short"
                                    },
                                })}
                            />
                        </FormControl>
                    </div>

                    <div className={styles.element}>
                        <FormControl fullWidth>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimeField
                                    label="Preparation Time"
                                    value={duration}
                                    format="HH:mm:ss"
                                    {...register("preparationTime", {
                                        required: "Preparation time is required"
                                    })}
                                    onChange={(newValue) => setDuration(newValue)} />
                            </LocalizationProvider>
                        </FormControl>
                    </div>

                    <div className={styles.element}>
                        <FormControl fullWidth>
                            <InputLabel style={errors.dishType ? { color: "#d32f2f" } : {}}>Dish type</InputLabel>
                            <Select
                                value={dishType}
                                label="Dish type"
                                error={Boolean(errors.dishType)}
                                {...register("dishType", { required: "Dish type is required" })}
                                onChange={(handleDishTypeChange)}>
                                <MenuItem value="pizza">Pizza</MenuItem>
                                <MenuItem value="soup">Soup</MenuItem>
                                <MenuItem value="sandwich">Sandwich</MenuItem>
                            </Select>
                            {errors.dishType && <FormHelperText style={{ color: "#d32f2f" }}>{errors.dishType.message}</FormHelperText>}
                        </FormControl>
                    </div>

                    {additional_field}

                    <Button
                        className={styles.submitBtn}
                        type="submit"
                        variant="contained"
                        endIcon={<SendIcon />}
                    >
                        Submit
                    </Button>

                </Container>


            </form>
        </div>
    );
}

export default MealForm;