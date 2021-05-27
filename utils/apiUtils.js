import axios from "axios";
const obj = [
  {
    AllowedHeaders: ["*"],
    AllowedMethods: ["PUT", "POST", "DELETE"],
    AllowedOrigins: ["http://www.example1.com"],
    ExposeHeaders: [],
  },
  {
    AllowedHeaders: ["*"],
    AllowedMethods: ["PUT", "POST", "DELETE"],
    AllowedOrigins: ["http://www.example2.com"],
    ExposeHeaders: [],
  },
  {
    AllowedHeaders: [],
    AllowedMethods: ["GET"],
    AllowedOrigins: ["*"],
    ExposeHeaders: [],
  },
];
export async function getApi(api) {
  // Load async data.
  try {
    return await axios.get(
      "https://s3.amazonaws.com/s3.helloheart.home.assignment/bloodTestConfig.json",
      { obj }
    );
  } catch (error) {
    // console.error(error);
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
}
