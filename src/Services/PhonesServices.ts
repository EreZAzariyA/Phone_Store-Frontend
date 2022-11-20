import axios from "axios";
import { PhoneModel } from "../Models/phone-model";
import { store } from "../Redux/Store";
import { addNewPhoneAction, deletePhoneAction, fetchAllPhonesAction, updatePhoneAction } from "../Redux/StoreState";
import config from "../Utils/Config";

class PhonesServices {
      async getAllPhones(): Promise<PhoneModel[]> {
            if (store.getState().phones?.length === 0) {
                  const response = await axios.get<PhoneModel[]>(config.urls.phones);
                  const phones = response.data;
                  store.dispatch(fetchAllPhonesAction(phones));
                  return phones;
            } else {
                  const phones = store.getState().phones;
                  return phones;
            }
      }

      async getOnePhoneById(phoneId: string): Promise<PhoneModel> {
            if (store.getState().phones?.length === 0) {
                  const response = await axios.get<PhoneModel>(config.urls.phones + phoneId);
                  const phone = response.data;
                  return phone;
            } else {
                  const phone = store.getState().phones?.find(p => p.phoneId === phoneId);
                  return phone;
            }
      }

      async getPhonesByBrandId(brandId: string): Promise<PhoneModel[]> {
            if (store.getState().phones.length === 0) {
                  const response = await axios.get<PhoneModel[]>(config.urls.phones + "phones-by-brandId/" + brandId);
                  const phones = response.data;
                  return phones;
            } else {
                  const phonesByBrand = store.getState().phones.filter(phone => phone.brandId === brandId);
                  return phonesByBrand;
            }
      }

      async addNewPhone(phone: PhoneModel): Promise<PhoneModel> {
            const response = await axios.post<PhoneModel>(config.urls.phones, phone);
            const addedPhone = response.data;
            store.dispatch(addNewPhoneAction(addedPhone));
            return addedPhone;
      }

      async updatePhone(phoneToUpdate: PhoneModel): Promise<PhoneModel> {
            const response = await axios.put<PhoneModel>(config.urls.phones, phoneToUpdate);
            const updatedPhone = response.data;
            store.dispatch(updatePhoneAction(phoneToUpdate.phoneId));
            return updatedPhone;
      }

      async deletePhoneById(phoneIdToDelete: string): Promise<void> {
            await axios.delete(config.urls.phones + phoneIdToDelete);
            store.dispatch(deletePhoneAction(phoneIdToDelete));
      }
}

const phonesServices = new PhonesServices();
export default phonesServices;