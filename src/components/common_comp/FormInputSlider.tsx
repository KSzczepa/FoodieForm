import React, { useEffect } from "react";
import { Slider } from "@mui/material";
import { Control, Controller, UseFormSetValue } from "react-hook-form";

interface sliderProps {
    name: string;
    control: Control<any, any>;
    setValue: UseFormSetValue<any>;
    label: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
}

export const FormInputSlider:
    React.FC<sliderProps> =
    ({ name, control, setValue, label, min, max, step=1, defaultValue=1 }) => {
        const [sliderValue, setSliderValue] = React.useState(1);

        useEffect(() => {
            if (sliderValue) setValue(name, sliderValue);
        }, [sliderValue]);

        const handleChange = (event: any, newValue: number | number[]) => {
            setSliderValue(newValue as number);
        };

        return <Controller
            name={name}
            control={control}
            render={() => (
                <Slider
                    value={sliderValue}
                    onChange={handleChange}
                    aria-label={label}
                    min={min}
                    max={max}
                    step={step}
                    defaultValue={defaultValue}
                    marks
                    valueLabelDisplay="auto"
                />
            )}
        />
    };