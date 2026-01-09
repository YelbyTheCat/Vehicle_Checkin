import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Vehicle Check-in" }} />
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',
          title: 'Add Vehicle'
        }}
      />
      <Stack.Screen name="vehicle/[id]" options={{title: "Vehicle Details"}}/>
      <Stack.Screen name="vin-scanner" options={{title: "Scan VIN"}}/>
    </Stack>
  );
}
