import styles from './MealForm.module.css';

import { useState } from "react";
import { useForm } from "react-hook-form";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider, TimeField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormControl, TextField, MenuItem, Container, InputLabel, FormHelperText, Button } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import { FormValues } from '../../assets/types/FormValuesType'
import { filterFormData, postFormData, resetUnselectedFields } from '../../shared/modifyFormData';
import DynamicFieldsForSelectedOption from './ConditionalFields';

const MealForm = () => {

    const { register, handleSubmit, control, formState: { errors }, setValue, reset, resetField } =
        useForm<FormValues>({ mode: "onTouched" });

    const [duration, setDuration] = useState<Dayjs | null>(dayjs('2022-04-17T00:00'));
    const [dishType, setDishType] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: FormValues) => {
        const filteredData: FormValues = filterFormData(data);
        console.log(filteredData);
        setIsSubmitting(true);

        // const url = 'https://foodie-form-default-rtdb.firebaseio.com/food.json';
         const url = 'https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/';
        //const url = 'http://localhost:4000/api/post';

        await postFormData(filteredData, url);
        clearForm();
        setIsSubmitting(false);
    };

    const handletypeChange = (event: SelectChangeEvent) => {
        if (event.target.value) {
            setDishType(event.target.value as string);
            resetUnselectedFields(event.target.value, resetField);
            delete errors.type;
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
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
                                    required: "Name is required"
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
                                    helperText={isFocused ? <span className={styles.helperPrepTime}>HH:MM:SS</span> : ''}
                                    {...register("preparation_time", {
                                        required: "Preparation time is required"
                                    })}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
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
                                <MenuItem className={styles.hiddenMenuItem}></MenuItem>
                                <MenuItem value="pizza">Pizza</MenuItem>
                                <MenuItem value="soup">Soup</MenuItem>
                                <MenuItem value="sandwich">Sandwich</MenuItem>
                            </Select>
                            {errors.type && <FormHelperText style={{ color: "#d32f2f" }}>{errors.type.message}</FormHelperText>}
                        </FormControl>
                    </div>

                    <DynamicFieldsForSelectedOption
                        register={register}
                        control={control}
                        setValue={setValue}
                        errors={errors}
                        resetField={resetField}
                        dishType={dishType}
                    />

                    <Button
                        className={styles.submitBtn}
                        type="submit"
                        variant="contained"
                        disabled = {isSubmitting}
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

