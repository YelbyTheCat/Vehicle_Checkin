import Button from '@/components/Button';
import { VehicleForm } from '@/components/forms/VehicleForm';
import { createVehicle, getVehicleInfo } from '@/functions';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function Modal() {

  type VinVehicleInfo = {
    make: string | null;
    model: string | null;
    year: string | null;
  }
  const [vehicleData, setVehicleData] = useState<VinVehicleInfo | null>(null)
  const router = useRouter();

  const {vin} = useLocalSearchParams<{vin?: string}>();

  useEffect(() => {
    if (vin) {
      onScanVin(vin);
    }
  }, [vin]);

  const onSubmit = async (data: any) => {
    // alert(JSON.stringify(data));
    await createVehicle(data);
    router.navigate('../');
  }

  const onScanVin = (vin: string) => {
    alert(`Scanned VIN: ${vin}`);
  }

  const fetchVinInfo = async (vin: string) => {
    const vehicleInfo = await getVehicleInfo({ vin });
    const make = vehicleInfo?.Make || null;
    const newMake = make?.toLowerCase().charAt(0).toUpperCase() + make?.slice(1);
    setVehicleData({make: newMake, model: vehicleInfo?.Model, year: vehicleInfo?.ModelYear});
  }

  return (
    <View style={{ padding: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <Button label="Scan VIN" onPress={() => router.push('/vin-scanner' as any)} />
        <Button label="Get Info" onPress={() => fetchVinInfo(vin ? vin : '')} />
      </View>
      <VehicleForm {...{vin, vehicleData, onSubmit}}/>
    </View>
  );
}
