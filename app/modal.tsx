import Button from '@/components/Button';
import { VehicleForm } from '@/components/forms/VehicleForm';
import { createVehicle } from '@/functions';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function Modal() {

  const router = useRouter();

  const onSubmit = async (data: any) => {
    // alert(JSON.stringify(data));
    await createVehicle(data);
    router.navigate('../');
  }

  return (
    <View style={{ padding: 20 }}>
      <Button label="Scan VIN" onPress={() => router.push('/vin-scanner' as any)} />
      <VehicleForm {...{onSubmit}}/>
    </View>
  );
}
