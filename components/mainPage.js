import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useSelector, useDispatch } from "react-redux";
import {
  createActionSendResult,
  getDataFromServer,
} from "../actions/mainPageAction";
import mainPage from "../reducers/mainPageReducer";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { Button } from "react-native-elements";

import * as _ from "lodash";

import {
  useFonts,
  Roboto_400Regular,
  Nunito_400Regular,
} from "@expo-google-fonts/dev";

import { ThemeProvider } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Roboto_400Regular",
  },
  text: {
    fontFamily: "Nunito_400Regular",
    fontSize: 30,
    margin: 20,
  },
  textInput: {
    height: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    fontFamily: "Nunito_400Regular",
    textAlign: "center",
  },
  autocompleteContainer: {
    // Hack required to make the autocomplete
    // work on Andrdoid
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
    padding: 5,
  },
});

const theme = {
  Button: {
    raised: true,
    titleStyle: {
      fontFamily: "Nunito_400Regular",
    },
  },
};

const MainPage = () => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Nunito_400Regular,
  });
  let [testName, setTestName] = useState("");
  let [testResult, setTestResult] = useState("");

  const dispatchMainMap = useDispatch(mainPage);
  let mainPageSelector = useSelector((state) => state.mainPageReducer);

  const handleSubmit = () => {
    if (!isNaN(testResult) && testName !== "") {
      let payload = {
        testName: testName.toUpperCase(),
        testResult: testResult,
      };
      // For now we cant use get DATA FROM SERVER
      //dispatchMainMap(getDataFromServer(testName));
      dispatchMainMap(createActionSendResult(payload));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your test name"
        onChangeText={(testName) => setTestName(testName)}
        defaultValue={testName}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter your result"
        onChangeText={(testResult) => setTestResult(testResult)}
        keyboardType={"numeric"}
        defaultValue={testResult}
      />
      <Text style={styles.text}>
        Result: {mainPageSelector.status.toString()}
      </Text>
      <ThemeProvider theme={theme}>
        <Button
          title="Submit blood test results"
          type="solid"
          style={{ fontFamily: "Nunito_400Regular" }}
          onPress={handleSubmit}
        ></Button>
      </ThemeProvider>
      {/* 
      <Button title="Loading button" type="clear" disabled="true" loading /> */}

      <StatusBar style="auto" />
    </View>
  );
};

export default MainPage;
