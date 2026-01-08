import Button from "@/components/Button";
import { CardBody } from "@/components/VehicleCards/CardBody";
import { CardHeader } from "@/components/VehicleCards/CardHeader";
import { Vehicle } from "@/domain/vehicle";
import { getAllVehicles } from "@/functions";
import { Link, useFocusEffect } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

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
      <View style={{flexDirection: "row", justifyContent: "space-around", marginVertical: 10}}>
        <Link href="/modal" asChild>
          <Button label="Add Vehicle"/>
        </Link>
        <Button label="Format" />
      </View>
      {/* <Text>{JSON.stringify(vehicles, null, 2)}</Text> */}
      <FlatList
        data={vehicles}
        keyExtractor={item => item.vin.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({item: vehicle}) => (
          <View style={styles.card}>
            <Pressable onPress={() => alert(JSON.stringify(vehicle, null, 2))}>
              <CardHeader vin={vehicle.vin} mileage={vehicle.mileage} />
              <CardBody location={vehicle.location} make={vehicle.make} model={vehicle.model} year={vehicle.year} tag={vehicle.tag} createdAt={vehicle.createdAt} />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    padding: 10,
    margin: 10,
    backgroundColor: '#007bff',
    alignItems: 'center'
  },
  card: {
    backgroundColor: 'lightblue',
    marginBottom: 2,
    marginHorizontal: 6,
    borderColor: 'black',
    borderWidth: 3
  }
});
