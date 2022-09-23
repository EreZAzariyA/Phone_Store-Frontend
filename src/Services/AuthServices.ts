import axios from "axios";
import jwtDecode from "jwt-decode";
import CredentialsModel from "../Models/credentials-model";
import UserModel from "../Models/user-model";
import { loginAction, logoutAction, registerAction } from "../Redux/AuthState";
import { fetchItemsFromShoppingCartAction, fetchShoppingCartAction, shoppingCartLogoutAction } from "../Redux/ShoppingCartState";
import { authStore, shoppingCartStore } from "../Redux/Store";
import config from "../Utils/Config";
import shoppingCartServices from "./ShoppingCartsServices";


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
            this.onLogin(token);
      };

      public async logout(): Promise<void> {
            authStore.dispatch(logoutAction());
            shoppingCartStore.dispatch(shoppingCartLogoutAction());
      }


      public async onLogin(token: string) {
            const decodedData = jwtDecode(token);
            const user: UserModel = (decodedData as any).user;
            const shoppingCart = await shoppingCartServices.getShoppingCartByUserId(user.userId);
            if (!shoppingCart) {
                  console.log("You still don`t have a shopping cart. Create one to start shopping.");
            } else {
                  const itemsInCart = await shoppingCartServices.getItemsFromCartByCartId(shoppingCart.cartId);
                  shoppingCartStore.dispatch(fetchShoppingCartAction(shoppingCart));
                  shoppingCartStore.dispatch(fetchItemsFromShoppingCartAction(itemsInCart));
            }

      }
}


export const authServices = new AuthServices();
