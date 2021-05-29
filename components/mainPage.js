import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useSelector, useDispatch } from "react-redux";
import { createActionSendResult, loadData } from "../actions/mainPageAction";
import mainPage from "../reducers/mainPageReducer";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { Button } from "react-native-elements";
import * as _ from "lodash";

import { ThemeProvider } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    margin: 20,
  },
  textInput: {
    height: 40,
    backgroundColor: "#fff",
    alignItems: "center",

    textAlign: "center",
  },
});

const theme = {
  Button: {
    raised: true,
  },
};

const MainPage = () => {
  let [testName, setTestName] = useState("");
  let [testResult, setTestResult] = useState("");

  const dispatchMainMap = useDispatch(mainPage);
  let mainPageSelector = useSelector((state) => state.mainPageReducer);

  useEffect(() => {
    dispatchMainMap(loadData());
  }, []);

  const handleSubmit = () => {
    if (!isNaN(testResult) && testName !== "") {
      let payload = {
        testName: testName.toUpperCase(),
        testResult: testResult,
      };
      dispatchMainMap(createActionSendResult(payload));
    } else {
      setTestResult("Enter valid numbers");
    }
  };

  return (
    !mainPageSelector.isLoading && (
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
            onPress={handleSubmit}
          ></Button>
        </ThemeProvider>

        <StatusBar style="auto" />
      </View>
    )
  );
};

export default MainPage;
