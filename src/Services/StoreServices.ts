import axios from "axios";
import { BrandModel } from "../Models/brand-model";
import { PhoneModel } from "../Models/phone-model";
import { store } from "../Redux/Store";
import { fetchAllBrandsAction, fetchAllPhonesAction } from "../Redux/StoreState";
import config from "../Utils/Config";

class StoreServices {

      async getAllPhones(): Promise<PhoneModel[]> {
            const response = await axios.get<PhoneModel[]>(config.urls.store.phones);
            const phones = response.data;
            store.dispatch(fetchAllPhonesAction(phones));
            return phones;
      }

      async getAllBrands(): Promise<BrandModel[]> {
            const response = await axios.get<BrandModel[]>(config.urls.store.brands);
            const brands = response.data;
            store.dispatch(fetchAllBrandsAction(brands));
            return brands;
      }

      async getPhonesByBrandId(brandId: string): Promise<PhoneModel[]> {
            const response = await axios.get<PhoneModel[]>(config.urls.store.phonesByBrands + brandId);
            const phones = response.data;
            return phones;
      }

      async addNewBrand(brand: BrandModel): Promise<BrandModel> {
            const response = await axios.post<BrandModel>(config.urls.admin.addBrandUrl, brand);
            const addedBrand = response.data;
            return addedBrand;
      }

      async addNewPhone(phone: PhoneModel): Promise<PhoneModel> {
            const response = await axios.post<PhoneModel>(config.urls.admin.addPhoneUrl, phone);
            const addedPhone = response.data;
            return addedPhone;
      }

}
const storeServices = new StoreServices();
export default storeServices;