import {
  RESULT_BAD,
  RESULT_GOOD,
  RESULT_SEND,
  RESULT_UNKNOWN,
  RESULT_FETCH_DATA,
} from "../actions/mainPageAction";
import _ from "lodash";

const INITIAL_STATE = {
  status: "",
  data: [],
  isLoading: true,
};

const mainPageReducer = (state = INITIAL_STATE, action) => {
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
        newState.data[testNameIndex].threshold >=
        _.toInteger(action.payload.testResult)
      ) {
        newState.status = newState.data[testNameIndex].name + " " + RESULT_GOOD;
        return newState;
      } else {
        newState.status = newState.data[testNameIndex].name + " " + RESULT_BAD;
        return newState;
      }
    case RESULT_FETCH_DATA:
      newState.data = action.payload;
      newState.isLoading = false;
      return newState;
    default:
      return newState;
  }
};

function mistakeFixer(testName, data) {
  testName = testName.replace(/[^a-zA-Z0-9]/g, " ");
  let testNameReusltCounter = 0;
  let testWordArray = testName.split(" ");
  if (!Array.isArray(testWordArray)) {
    testWordArray = [testWordArray];
  } else {
    let testNameToReturn = "";
    testWordArray.forEach((word) => {
      data.forEach((testName) => {
        if (testName.name.includes(word) && word !== "") {
          testNameReusltCounter++;
          return (testNameToReturn = testName.name);
        }
      });
    });
    if (testNameReusltCounter > 1) {
      return -1;
    } else if (testNameToReturn !== "") {
      let index = _.findIndex(data, function (o) {
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

export default mainPageReducer;
