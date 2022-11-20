import axios from "axios";
import config from "../Utils/Config";

class StoreServices {

      async getTopThreeProducts(): Promise<string[]>{
            const response = await axios.get<string[]>(config.urls.store.topThree);
            const topThree = response.data;
            return topThree;
      }

      async getTopBrands(): Promise<string[]>{
            const response = await axios.get<string[]>(config.urls.store.topBrands);
            const topBrands = response.data;
            return topBrands;
      }
}
const storeServices = new StoreServices();
export default storeServices;