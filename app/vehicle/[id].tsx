import Button from "@/components/Button";
import { VehicleForm } from "@/components/forms/VehicleForm";
import { Vehicle as VehicleInfo } from "@/domain/vehicle";
import { getVehicle, updateVehicle } from "@/functions";
import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ToastAndroid, View } from "react-native";

export default function Vehicle() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [vehicle, setVehicle] = useState<VehicleInfo | null>(null); 

  const fetchVehicleDetails = async (vin: string) => {
    try {
      const res = await getVehicle({vin});
      setVehicle(res);
    } catch (e) {
      console.error("Failed to fetch vehicle details", e);
    }
  };

  useEffect(() => {
    if (id) {
      fetchVehicleDetails(id);
    }
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      const res = await updateVehicle(data);
      setVehicle(res);
      ToastAndroid.show("Vehicle updated successfully", ToastAndroid.TOP);
    } catch (e) {
      console.error("Failed to update vehicle", e);
      ToastAndroid.show("Vehicle failed to update", ToastAndroid.TOP);
    }
    
  }

  return (
    <View style={{ padding: 20 }}>
      <Button label="Copy to Clipboard" onPress={async () => {
        if (!id || !vehicle) return;{
          const text = `Vin: ${id} ${vehicle?.tag ? `| Tag: ${vehicle?.tag}` : ''} ${vehicle?.mileage ? `| Miles: ${vehicle?.mileage}` : ''} ${vehicle?.year ? `| ${vehicle?.year} ` : ''}${vehicle?.make || ''} ${vehicle?.model || ''} ${vehicle?.location ? `| Location: ${vehicle?.location}` : ''}`;
          await Clipboard.setStringAsync(text);
          ToastAndroid.show("VIN copied to clipboard", ToastAndroid.SHORT);
        }
      }} />
      <VehicleForm vin={id} vehicleData={vehicle} onSubmit={onSubmit} />
    </View>
  );
}
