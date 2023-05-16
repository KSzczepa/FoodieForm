import styles from './MealForm.module.css';

import React from "react";
import { useForm } from "react-hook-form";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider, TimeField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormControl, TextField, MenuItem, Container, InputLabel, FormHelperText, Button } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import { FormValues } from '../types/FormValues'
import { filterFormData, postFormData, resetUnselectedFields } from '../functions/modifyFormData';
import DynamicFieldsForSelectedOption from '../functions/showDynamicFields';

const MealForm = () => {

    const { register, handleSubmit, control, watch, formState: { errors }, setValue, reset, resetField } =
        useForm<FormValues>({ mode: "onTouched" });

    const [duration, setDuration] = React.useState<Dayjs | null>(dayjs('2022-04-17T00:00'));
    const [dishType, setDishType] = React.useState('');

    const onSubmit = (data: FormValues) => {
        const filteredData: FormValues = filterFormData(data);
        console.log(filteredData);
        const url = 'https://foodie-form-default-rtdb.firebaseio.com/food.json';

        postFormData(filteredData, url);
        setTimeout(clearForm, 250);
    };

    const handletypeChange = (event: SelectChangeEvent) => {
        if (event.target.value) {
            setDishType(event.target.value as string);
            resetUnselectedFields(event.target.value, resetField);
            delete errors.type;
        }
    };

    const clearForm = () => {
        reset();
        setDuration(dayjs('2022-04-17T00:00'));
        setDishType('');
    }


    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container maxWidth="xs">
                    
                    <div className={styles.element}>
                        <FormControl fullWidth>
                            <TextField
                                label='Dish name'
                                error={Boolean(errors.name)}
                                helperText={errors.name?.message}
                                variant="outlined"
                                {...register("name", {
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
                                    {...register("preparation_time", {
                                        required: "Preparation time is required"
                                    })}
                                    onChange={(newValue) => setDuration(newValue)} />
                            </LocalizationProvider>
                        </FormControl>
                    </div>

                    <div className={styles.element}>
                        <FormControl fullWidth>
                            <InputLabel style={errors.type ? { color: "#d32f2f" } : {}}>Dish type</InputLabel>
                            <Select
                                value={dishType}
                                label="Dish type"
                                error={Boolean(errors.type)}
                                {...register("type", { required: "Dish type is required" })}
                                onChange={(handletypeChange)}>
                                <MenuItem className={styles.hiddenMenuItem} value=""></MenuItem>
                                <MenuItem value="pizza">Pizza</MenuItem>
                                <MenuItem value="soup">Soup</MenuItem>
                                <MenuItem value="sandwich">Sandwich</MenuItem>
                            </Select>
                            {errors.type && <FormHelperText style={{ color: "#d32f2f" }}>{errors.type.message}</FormHelperText>}
                        </FormControl>
                    </div>

                    <DynamicFieldsForSelectedOption 
                        register = {register}
                        control = {control}
                        setValue = {setValue}
                        errors = {errors}
                        resetField = {resetField}
                        dishType = {dishType}
                    />

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

