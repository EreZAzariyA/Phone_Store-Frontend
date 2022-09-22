import { BrandModel } from "../Models/brand-model";
import { PhoneModel } from "../Models/phone-model";

export class StoreState {
      public brands: BrandModel[];
      public phones: PhoneModel[];

      constructor() {
            const phones = localStorage.getItem("phones");
            if (phones) {
                  this.phones = JSON.parse(phones);
            };

            const brands = localStorage.getItem("brands");
            if (brands) {
                  this.brands = JSON.parse(brands);
            }
      }
}

export enum StoreActionType {
      FetchAllPhones = "FetchAllPhones",
      FetchAllBrands = "FetchAllBrands"
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

export function storeReducer(currentStoreState: StoreState = new StoreState(), action: StoreAction): StoreState {
      const newStoreState = { ...currentStoreState };

      switch (action.type) {
            case StoreActionType.FetchAllPhones:
                  newStoreState.phones = action.payload;
                  localStorage.setItem("phones", JSON.stringify(newStoreState.phones));
                  break;

            case StoreActionType.FetchAllBrands:
                  newStoreState.brands = action.payload;
                  localStorage.setItem("brands", JSON.stringify(newStoreState.phones));
                  break;

      }

      return newStoreState;
}