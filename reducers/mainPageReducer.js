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

  let testWordArray = testName.split(" ");
  let arrayOfIndexs = new Array(data.length).fill(0);
  let testNameResultCounter = 0;

  if (!Array.isArray(testWordArray)) {
    testWordArray = [testWordArray];
  } else {
    testWordArray.forEach((word) => {
      data.forEach((testToCheck, index) => {
        if (word !== "" && testToCheck.name.toUpperCase().includes(word)) {
          testNameResultCounter++;
          arrayOfIndexs[index]++;
        }
      });
    });
    let indexOfBestResult = arrayOfIndexs.indexOf(Math.max(...arrayOfIndexs));

    if (
      indexOfBestResult !== undefined &&
      verifyFunction(arrayOfIndexs[indexOfBestResult], arrayOfIndexs)
    )
      return indexOfBestResult;
    else return -1;
  }
}
function verifyFunction(numberToSearch, arrayOfIndexs) {
  let sumOfIndexes = 0;
  for (let i = 0; i < arrayOfIndexs.length; i++) {
    if (arrayOfIndexs[i] === numberToSearch) {
      sumOfIndexes++;
    }
  }
  if (sumOfIndexes === 1) return 1;
  else return 0;
}

export default mainPageReducer;
