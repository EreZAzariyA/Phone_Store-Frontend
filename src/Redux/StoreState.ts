import { BrandModel } from "../Models/brand-model";
import { PhoneModel } from "../Models/phone-model";

export class StoreState {
      public brands: BrandModel[] = [];
      public phones: PhoneModel[] = [];
}

export enum StoreActionType {
      FetchAllPhones = "FetchAllPhones",
      FetchAllBrands = "FetchAllBrands",
      AddNewPhone = "AddNewPhone",
      AddNewBrand = "AddNewBrand",
      UpdatePhone = "UpdatePhone",
      UpdateBrand = "UpdateBrand",
      DeletePhone = "DeletePhone",
      DeleteBrand = "DeleteBrand"
}

export interface StoreAction {
      type: StoreActionType;
      payload?: any;
}

export function fetchAllPhonesAction(phones: PhoneModel[]): StoreAction {
      return { type: StoreActionType.FetchAllPhones, payload: phones };
}
export function fetchAllBrandsAction(brands: BrandModel[]): StoreAction {
      return { type: StoreActionType.FetchAllBrands, payload: brands };
}
export function addNewPhoneAction(phone: PhoneModel): StoreAction {
      return { type: StoreActionType.AddNewPhone, payload: phone };
}
export function addNewBrandAction(brand: BrandModel): StoreAction {
      return { type: StoreActionType.AddNewBrand, payload: brand };
}
export function updatePhoneAction(phoneIdToUpdate: string): StoreAction{
      return { type: StoreActionType.UpdatePhone, payload: phoneIdToUpdate };
}
export function updateBrandAction(brandIdToUpdate: string): StoreAction{
      return { type: StoreActionType.UpdateBrand, payload: brandIdToUpdate };
}
export function deletePhoneAction(phoneIdToDelete: string): StoreAction{
      return { type: StoreActionType.DeletePhone, payload: phoneIdToDelete };
}
export function deleteBrandAction(brandIdToDelete: string): StoreAction{
      return { type: StoreActionType.DeleteBrand, payload: brandIdToDelete };
}

export function storeReducer(currentStoreState: StoreState = new StoreState(), action: StoreAction): StoreState {
      const newStoreState = { ...currentStoreState };

      switch (action.type) {
            case StoreActionType.FetchAllPhones:
                  newStoreState.phones = action.payload;
                  break;

            case StoreActionType.FetchAllBrands:
                  newStoreState.brands = action.payload;
                  break;

            case StoreActionType.AddNewPhone:
                  newStoreState.phones.push(action.payload);
                  break;

            case StoreActionType.AddNewBrand:
                  newStoreState.brands.push(action.payload);
                  break;
            case StoreActionType.UpdatePhone:
                  newStoreState.phones.filter(phone => phone.phoneId === action.payload.phoneId);
                  newStoreState.phones.push(action.payload);
                  break;
            case StoreActionType.UpdateBrand:
                  newStoreState.brands.filter(brand => brand.brandId === action.payload.brandId);
                  newStoreState.brands.push(action.payload);
                  break;
            case StoreActionType.DeletePhone:
                  newStoreState.phones.filter(phone => phone.phoneId === action.payload.phoneId);
                  break;
            case StoreActionType.DeleteBrand:
                  newStoreState.brands.filter(brand => brand.brandId === action.payload.brandId);
                  break;
      }
      return newStoreState;
}