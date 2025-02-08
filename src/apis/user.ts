import { apis } from ".";
import { checkUserResponse } from "./user.schrma";

const useUser = () => {
  //create user
  const createUser = async (user: {
    email: string;
    kindeId: string;
    name: string;
  }) => {
    const response = await apis.post("/user/register", {
      data: user,
    });
    return response.data;
  };

  //check user is created or not based on that create the user
  const checkUser = async (kindeId: string): Promise<checkUserResponse> => {
    const response = await apis.post("/user/check", {
      params: {
        kindeId,
      },
    });
    return response.data;
  };
  return { createUser, checkUser };
};
export default useUser;
