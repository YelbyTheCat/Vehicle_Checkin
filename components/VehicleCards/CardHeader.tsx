import React from "react";
import { Text, View } from "react-native";

const underlineVin = (vin: string) => {
  const firstPart = vin.slice(0, -8);
  const lastPart = vin.slice(-8);
  return (
    <Text style={{fontSize: 14}}>
      {`Vin: ${firstPart}`}
      <Text style={{ textDecorationLine: 'underline' }}>{lastPart}</Text>
    </Text>
  );
};

export const CardHeader = ({vin, mileage}: {vin: string, mileage: number | undefined}) => {

  return (
    <React.Fragment>
      <View style={{justifyContent: "space-between", flexDirection: "row"}}>
        {underlineVin(vin)}
        <Text>{`Miles: ${mileage}`}</Text>
      </View>
    </React.Fragment>
  );
}
