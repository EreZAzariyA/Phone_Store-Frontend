import axios from "axios";
import { BrandModel } from "../Models/brand-model";
import { store } from "../Redux/Store";
import { addNewBrandAction, fetchAllBrandsAction, updateBrandAction } from "../Redux/StoreState";
import config from "../Utils/Config";

class BrandsServices {
      async getAllBrands(): Promise<BrandModel[]> {
            if (store.getState().brands?.length === 0) {
                  const response = await axios.get<BrandModel[]>(config.urls.brands);
                  const brands = response.data;
                  store.dispatch(fetchAllBrandsAction(brands));
                  return brands;
            } else {
                  const brands = store.getState().brands;
                  return brands;
            }
      }

      async getOneBrand(brandId: string): Promise<BrandModel> {
            if (store.getState().brands.length === 0) {
                  const response = await axios.get(config.urls.brands + brandId);
                  const brand = response.data;
                  return brand
            } else {
                  const brand = store.getState().brands.find(brand => brand.brandId === brandId);
                  return brand;
            }
      }

      async addNewBrand(brand: BrandModel): Promise<BrandModel> {
            const response = await axios.post<BrandModel>(config.urls.brands, brand);
            const addedBrand = response.data;
            store.dispatch(addNewBrandAction(addedBrand));
            return addedBrand;
      }

      async updateBrand(brandToUpdate: BrandModel): Promise<BrandModel>{
            const response = await axios.put<BrandModel>(config.urls.brands, brandToUpdate);
            const updatedBrand = response.data;
            store.dispatch(updateBrandAction(brandToUpdate.brandId));
            return updatedBrand;
      }

      async deleteBrand(brandIdToDelete: string): Promise<void>{
            await axios.delete(config.urls.brands + brandIdToDelete);
      }
}
const brandsServices = new BrandsServices();
export default brandsServices;