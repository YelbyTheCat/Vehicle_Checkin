import { MaterialIcons } from "@expo/vector-icons";
import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  label?: string;
  onPress?: () => void;
  iconOnly?: boolean;
  icon?: keyof typeof MaterialIcons.glyphMap;
};

export default function Button({ label, onPress, iconOnly, icon }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPressIn={pressIn}
        onPressOut={pressOut}
        {...{ onPress }}
      >
        {icon && <MaterialIcons name={icon} size={20} color="black" />}
        {label && <Text style={styles.buttonLabel}>{label}</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 160,
    height: 60,
    // marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "lightblue",
  },
  buttonLabel: {
    color: "#000000ff",
    fontSize: 16,
    gap: 6,
  },
});
