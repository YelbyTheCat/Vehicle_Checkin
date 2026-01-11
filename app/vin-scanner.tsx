import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Modal() {
  
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return (
      <View/>
    )
  };

  if (!permission.granted) {
    return (
      <View>
        <Text>Camera permission is required</Text>
        <Button onPress={requestPermission} title="Grant Permission"/>
      </View>
    )
  }

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    router.dismissTo({pathname: '/modal', params: { vin: data }});
  }

  return (
  <View style={styles.container}>
    <CameraView 
      style={StyleSheet.absoluteFillObject} 
      facing="back" 
      onBarcodeScanned={scanned ? undefined : handleBarCodeScanned} 
      barcodeScannerSettings={{barcodeTypes: ['code128', 'qr', 'code39']}}/>
  </View>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})
