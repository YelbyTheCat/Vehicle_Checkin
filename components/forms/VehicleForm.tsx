import React, { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { Button, Text, TextInput } from "react-native"

type VehicleFormValues = {
  vin: string
  make: string
  model: string
  year: string
  mileage: string
  location: string
  tag: string
}

export const VehicleForm = ({onSubmit, vin, vehicleData}: {onSubmit: (data: any) => void, vin?: string, vehicleData?: any}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VehicleFormValues>({
    defaultValues: {
      vin: "",
      make: "",
      model: "",
      year: "",
      mileage: "",
      location: "",
      tag: "",
    },
  })

  useEffect(() => {
    if (vin) {
      setValue("vin", vin);
    }
    if (vehicleData) {
      if (vehicleData.make) {
        setValue("make", vehicleData.make);
      }
      if (vehicleData.model) {
        setValue("model", vehicleData.model);
      }
      if (vehicleData.year) {
        setValue("year", vehicleData.year);
      }
    }
  }, [vin, vehicleData]);


  const fields: { key: keyof VehicleFormValues; label: string; rules?: any }[] = [
    { key: "vin", label: "VIN", rules: { required: {value: true, message: "VIN is required"}, maxLength: {value: 17, message: "VIN must be 17 characters"}, minLength: {value: 17, message: "VIN must be 17 characters"} } },
    { key: "make", label: "Make" },
    { key: "model", label: "Model" },
    { key: "year", label: "Year" },
    { key: "mileage", label: "Mileage" },
    { key: "location", label: "Location" },
    { key: "tag", label: "Tag" },
  ]


  return (
    <React.Fragment>
      {fields.map(({key, label, rules}) => (
        <React.Fragment key={key}>
      <Controller
        name={`${key}`}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={label}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
          />
        )}
        
      />
      {errors[key] && <Text>{errors[key]?.message}</Text>}
      </React.Fragment>
      ))}
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </React.Fragment>
  )
}
