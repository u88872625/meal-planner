import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import StackNavigator from "./src/navigation/StackNavigator";
import { ModalPortal } from "react-native-modals";

export default function App() {
  return (
    <View style={styles.container}>
      <StackNavigator />
      <ModalPortal />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
