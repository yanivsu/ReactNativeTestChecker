import { getApi } from "../utils/apiUtils";

// -------------- Action Typs for Reducer --------- //
export const RESULT_GET_DATA_FROM_SERVER = "RESULT_GET_DATA_FROM_SERVER";
export const RESULT_GOOD = "RESULT GOOD";
export const RESULT_BAD = "RESULT BAD";
export const RESULT_SEND = "RESULT SEND";
export const RESULT_UNKNOWN = "RESULT UNKNOWN";

export const SERVER_URL =
  "https://s3.amazonaws.com/s3.helloheart.home.assignment/";
export const DATASET = "bloodTestConfig.json";

export const createActionSendResult = (obj) => {
  return { type: RESULT_SEND, payload: obj };
};

export const createActionGoodResult = (obj) => {
  return { type: RESULT_GOOD, payload: obj };
};

export const createActionBadResult = (obj) => {
  return { type: RESULT_BAD, payload: obj };
};

export const createActionAddCounter = () => {
  return { type: "TEST" };
};

export const createActionGetDataFromServer = (obj) => {
  return { type: RESULT_GET_DATA_FROM_SERVER, payload: obj };
};

export async function getDataFromServer(testName) {
  await getApi(SERVER_URL + DATASET).then((result, err) => {
    console.log(result);
  });
}
