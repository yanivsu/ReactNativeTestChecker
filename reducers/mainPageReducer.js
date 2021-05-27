import {
  RESULT_BAD,
  RESULT_GOOD,
  RESULT_SEND,
  RESULT_UNKNOWN,
  RESULT_GET_DATA_FROM_SERVER,
} from "../actions/mainPageAction";
import axios from "axios";
import _ from "lodash";

const INITIAL_STATE = {
  status: "",
  data: [
    {
      bloodTestConfig: [
        {
          name: "HDL Cholesterol",
          threshold: 40,
        },
        {
          name: "LDL Cholesterol",
          threshold: 100,
        },
        {
          name: "A1C",
          threshold: 4,
        },
      ],
    },
  ],
  isLoading: false,
  counter: 1,
};

const mainPage = (state = INITIAL_STATE, action) => {
  let newState = { ...state };
  switch (action.type) {
    case RESULT_UNKNOWN:
      return newState;
    case RESULT_SEND:
      let testNameIndex = mistakeFixer(action.payload.testName, newState.data);
      if (testNameIndex === -1) {
        newState.status = RESULT_UNKNOWN;
        return newState;
      } else if (
        newState.data[0].bloodTestConfig[testNameIndex].threshold >=
        _.toInteger(action.payload.testResult)
      ) {
        newState.status =
          newState.data[0].bloodTestConfig[testNameIndex].name +
          " " +
          RESULT_GOOD;
        return newState;
      } else {
        newState.status =
          newState.data[0].bloodTestConfig[testNameIndex].name +
          " " +
          RESULT_BAD;
        return newState;
      }

    case RESULT_BAD:
      newState.status = action.type;
      return newState;
    case RESULT_GOOD:
      newState.status = action.type;
      return newState;
    case RESULT_GET_DATA_FROM_SERVER:
      newState.serverData = action.data;
      return newState;
    default:
      newState.counter += 1;
      return newState;
  }
};

function mistakeFixer(testName, data) {
  testName = testName.replace(/[^a-zA-Z0-9]/g, " ");
  let testWordArray = testName.split(" ");
  if (!Array.isArray(testWordArray)) {
    testWordArray = [testWordArray];
  } else {
    let testNameToReturn = "";
    testWordArray.forEach((word, index) => {
      data[0].bloodTestConfig.forEach((testName) => {
        if (testName.name.includes(word) && word !== "") {
          return (testNameToReturn = testName.name);
        }
      });
    });
    if (testNameToReturn !== "") {
      let index = _.findIndex(data[0].bloodTestConfig, function (o) {
        return o.name === testNameToReturn;
      });
      if (index !== -1) {
        return index;
      } else {
        return index;
      }
    } else {
      return -1;
    }
  }
}

export default mainPage;
