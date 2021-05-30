import dataSet from "../data/dataSent.json";

// -------------- Action Typs for Reducer --------- //
export const RESULT_GOOD = "RESULT GOOD";
export const RESULT_BAD = "RESULT BAD";
export const RESULT_SEND = "RESULT SEND";
export const RESULT_UNKNOWN = "RESULT UNKNOWN";
export const RESULT_FETCH_DATA = "RESUT FETCH DATA";

export const createActionSendResult = (obj) => {
  return { type: RESULT_SEND, payload: obj };
};

export const createActionFetchData = (dataSet) => {
  return { type: RESULT_FETCH_DATA, payload: dataSet };
};

export const loadData = () => {
  return function (dispatch) {
    const newDataSet = dataSet.bloodTestConfig;
    dispatch(createActionFetchData(newDataSet));
  };
};
