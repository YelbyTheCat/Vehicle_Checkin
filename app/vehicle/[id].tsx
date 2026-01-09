import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Vehicle() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>Vehicle Details Page</Text>
      <Text>Vehicle ID: {id}</Text>
    </View>
  );
}
