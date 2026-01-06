import Button from "@/components/Button";
import { Vehicle } from "@/domain/vehicle";
import { getAllVehicles } from "@/functions";
import { Text } from "@react-navigation/elements";
import { Link, useFocusEffect } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function Index() {

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const fetchAllVehicles = async () => {
    try {
      const res = await getAllVehicles();
      setVehicles(res);
    } catch (e) {
      console.error("Failed to fetch vehicles", e);
    }
  }

  useFocusEffect(() => {
    fetchAllVehicles();
  });

  return (
    <View>
      <Link href="/modal" asChild>
        <Button label="Add Vehicle"/>
      </Link>
      <Button label="Format" />
      <Text>{JSON.stringify(vehicles, null, 2)}</Text>
    </View>
  );
}
