import { BrandModel } from "../Models/brand-model";
import { PhoneModel } from "../Models/phone-model";

export class StoreState{
      public brands: BrandModel[];
      public phones: PhoneModel[];
}

export enum StoreActionType{}