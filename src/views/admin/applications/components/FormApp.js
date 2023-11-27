import React, { useState, useEffect, useRef } from "react";

import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

export default function DrawerTable() {
    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={"30px"}>
            <Controller
                name="firstName"
                control={control}
                render={({ field }) => <Input {...field} />}
            />
            <Controller
                name="select"
                control={control}
                render={({ field }) => <Select 
                    {...field} 
                    options={[
                        { value: "chocolate", label: "Chocolate" },
                        { value: "strawberry", label: "Strawberry" },
                        { value: "vanilla", label: "Vanilla" }
                    ]} 
                />}
            />
            <input type="submit" />
        </Grid>
    </form>
)}