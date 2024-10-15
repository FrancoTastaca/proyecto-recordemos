import { Camera, CameraView } from "expo-camera";
import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useEffect, useRef } from "react";

export const EscanearCodigoQr = ({navigation, route}) => {
  const { role } = route.params;
  const roles = {
    cuidador: 'cuidador',
    paciente: 'paciente'
  };

  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={styles.container}
        facing="back"
        onBarcodeScanned={({ data }) => {
          const urlExpected = 'https://scanned.page/p/66e8add5ae314'; //Url del QR generado
          if (data && !qrLock.current) {
            qrLock.current = true;
            if(data.trim() === urlExpected ){
              setTimeout(async () => {
                navigation.navigate('Pastilleros', {role})
              }, 500);
            }else{
              console.log('La url no coincide')        
            }
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  }
});

export default EscanearCodigoQr;