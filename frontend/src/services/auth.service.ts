import axios from "axios";
import { SERVER_URL } from "../config/config";
import { IRegisterDto } from "./interfaces/register.params";
import { ILoginDto } from "./interfaces/login.params";
import app from "../config/axiosConfig";


export class AuthService {
    static register = async (data: IRegisterDto) => {
        return await app
          .post(SERVER_URL + '/api/client/register', { ...data })
          .then(response => response.data);
      };
      
      
    static login = async (data: ILoginDto) => {
        return await app
          .post("/api/auth/login", { ...data })
          .then((response) => {    
            return response.data
          });
      };
      
    static logout = async () => {
        return await app.post(SERVER_URL + "/api/auth/logout").then((response) => {
          return response.data;
        });
      };

}
