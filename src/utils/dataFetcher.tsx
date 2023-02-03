import axios from "axios";
import { ApiData, User } from "./model";
const base = axios.create({
  baseURL: "https://blue-journalist-bbrpv.ineuron.app:4000",
});

const dataFetcher = async (
  url: string,
  methodType: string,
  userData?: User
): Promise<[data: ApiData | null, err: string | null]> => {
  try {
    const data = await base({
      method: methodType,
      url: url,
      data: userData,
    });
    // console.log(data);

    return [data.data, null];
  } catch (error) {
    let errorMessage: string = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = String(error.message);
    }

    return [null, errorMessage];
  }
};

export default dataFetcher;
