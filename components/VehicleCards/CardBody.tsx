import React from "react";
import { Text, View } from "react-native";

const displayDate = (thisDate: Date) => {
  if (!thisDate) return "";
  const newDate = new Date(thisDate);
  const hour = newDate.getHours().toString().padStart(2, '0');
  const minute = newDate.getMinutes().toString().padStart(2, '0');
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
  const day = newDate.getDate().toString().padStart(2, '0');
  const year = newDate.getFullYear();
  return `${month}/${day}/${year} ${hour}:${minute}`;
}

export const CardBody = ({location, tag, make, model, year, createdAt}: {location?: string, tag?: string, make?: string, model?: string, year?: number, createdAt?: Date}) => {
  return (
    <React.Fragment>
      <Text style={{fontSize: 20}}>{`${year} ${make} ${model}`}</Text>
      <View style={{justifyContent: "space-between", flexDirection: "row"}}>
        <Text>{`Tag: ${tag} | Spot: ${location}`}</Text>
        <Text>{`${displayDate(createdAt!)}`}</Text>
      </View>
    </React.Fragment>
  );
}
