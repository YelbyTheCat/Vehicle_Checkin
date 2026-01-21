import Button from "@/components/Button";
import { VehicleForm } from "@/components/forms/VehicleForm";
import { createVehicle, getVehicleInfo } from "@/functions";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Modal() {
  type VinVehicleInfo = {
    make: string | null;
    model: string | null;
    year: string | null;
  };
  const { vin } = useLocalSearchParams<{ vin?: string }>();
  const [vehicleData, setVehicleData] = useState<VinVehicleInfo | null>(null);
  const [currentVin, setCurrentVin] = useState(vin ?? "");
  const [loadingGetInfo, setLoadingGetInfo] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (vin) {
      setCurrentVin(vin);
    }
  }, [vin]);

  const onSubmit = async (data: any) => {
    // alert(JSON.stringify(data));
    await createVehicle(data);
    router.setParams({ vin: undefined });
    router.navigate("../");
  };

  const fetchVinInfo = async (vin: string) => {
    setLoadingGetInfo(true);
    try {
      const vehicleInfo = await getVehicleInfo({ vin });
      const make = vehicleInfo?.Make || null;
      const newMake =
        make?.toLowerCase().charAt(0).toUpperCase() + make?.slice(1);
      setVehicleData({
        make: newMake,
        model: vehicleInfo?.Model,
        year: vehicleInfo?.ModelYear,
      });
    } catch (e) {
      console.error("Failed to fetch vehicle info", e);
    } finally {
      setLoadingGetInfo(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Button
          label="Scan VIN"
          onPress={() => router.push("/vin-scanner" as any)}
        />
        <Button
          label={loadingGetInfo ? "Fetching..." : "Get Info"}
          onPress={() => fetchVinInfo(currentVin ? currentVin : "")}
        />
      </View>
      <VehicleForm
        onVinChange={setCurrentVin}
        {...{ vin: currentVin, vehicleData, onSubmit }}
      />
    </View>
  );
}
