import axios from "axios";
import config from "../Utils/Config";
import { PhoneModel } from "../Models/phone-model";
import { BrandModel } from "../Models/brand-model";
import store from "../Redux/Store";

class StoreServices {
  async getTopThreeProducts(): Promise<PhoneModel[]>{
    const response = await axios.get<PhoneModel[]>(config.urls.store.topThree);
    const topThree = response.data;
    return topThree;
  };

  async getTopBrands(): Promise<BrandModel[]> {
    if (!store.getState().store.brands.length) {
      const response = await axios.get<BrandModel[]>(config.urls.store.topBrands);
      const topBrands = response.data;
      return topBrands;
    }
    const brands = store.getState().store.brands;
    return brands.filter((brand) => brand.on_top);
  };
};

const storeServices = new StoreServices();
export default storeServices;