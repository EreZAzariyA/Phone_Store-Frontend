import axios from "axios";
import CredentialsModel from "../Models/credentials-model";
import UserModel from "../Models/user-model";
import { loginAction, logoutAction, registerAction } from "../Redux/AuthState";
import { authStore } from "../Redux/Store";
import config from "../Utils/Config";


class AuthServices {


      public async register(user: UserModel): Promise<void> {
            const response = await axios.post<string>(config.urls.auth.register, user);
            const token = response.data;
            authStore.dispatch(registerAction(token));
            authStore.dispatch(loginAction(token));

            
      };

      public async login(credentials: CredentialsModel): Promise<void> {
            const response = await axios.post<string>(config.urls.auth.login, credentials);
            const token = response.data;
            authStore.dispatch(loginAction(token));
      };

      public async logout(): Promise<void> {
            authStore.dispatch(logoutAction());
      }


      // public async onLogin(token: string) {
      //       const decodedData = jwtDecode(token);
      //       const user: UserModel = (decodedData as any).user;
      //       const shoppingCart = await cartServices.getUserCartByUserId(user.userId);
      //       if (!shoppingCart) {
      //             const alert = new AlertModel();
      //             alert.alertId = alertsStore.getState().alerts.length + 1;
      //             alert.msg = "You still don`t have a shopping cart. Create one to start shopping.";
      //             alertsStore.dispatch(addAlertAction(alert));
      //       }
      //       await cartServices.getUserCartByUserId(user?.userId);
      //       await cartServices.getAllItemsFromUserCartByUserId(user.userId);
      // }
}


export const authServices = new AuthServices();
