import { VehicleForm } from '@/components/forms/VehicleForm';
import { createVehicle } from '@/functions';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function Modal() {

  const router = useRouter();

  const onSubmit = async (data: any) => {
    // alert(JSON.stringify(data));
    await createVehicle(data);
    router.navigate('../');
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Vehicle Form</Text>
      <VehicleForm {...{onSubmit}}/>
    </View>
  );
}
