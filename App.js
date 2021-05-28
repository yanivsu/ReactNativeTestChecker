import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "react-native-elements";
import MainPage from "../AwesomeProject/components/mainPage";
import { Provider } from "react-redux";
import configureStore from "./store/configStore";

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Header
          centerComponent={{
            text: "HeartMe",
            style: { color: "#fff", fontFamily: "Nunito_400Regular" },
          }}
        ></Header>
        <MainPage />
      </SafeAreaProvider>
    </Provider>
  );
}