import axios from "axios";
import { SERVER_URL } from "../config";
import { IRegisterDto } from "./interfaces/register.params";
import { ILoginDto } from "./interfaces/login.params";

export class AuthService {
    static register = async (data: IRegisterDto) => {
        return await axios.post(SERVER_URL + '/api/client/register', { ...data });
      };
      
    static login = async (data: ILoginDto) => {
        return await axios
          .post(SERVER_URL + "/api/auth/login", { ...data })
          .then((response) => {
              console.log(response.data)
            if (response.data.username) {
              localStorage.setItem("user", JSON.stringify(response.data));
            }
      
            return response.data;
          });
      };
      
    static logout = async () => {
        localStorage.removeItem("user");
        return await axios.post(SERVER_URL + "/api/auth/logout").then((response) => {
          return response.data;
        });
      };
      
    static getCurrentUser = () => {
        return JSON.parse(localStorage.getItem("user")!);
      };
}
