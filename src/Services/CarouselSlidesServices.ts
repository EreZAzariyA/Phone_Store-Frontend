import axios from "axios";
import config from "../Utils/Config";
import { CarouselSlideModel } from "../Models/carousel-slide-model";

class CarouselSlidesServices {
  async getAllSlides(): Promise<CarouselSlideModel[]> {
    const response = await axios.get<CarouselSlideModel[]>(config.urls.carouselSlides);
    return response.data || [];
  }

  async addSlide(slide: CarouselSlideModel): Promise<CarouselSlideModel> {
    const response = await axios.post<CarouselSlideModel>(config.urls.carouselSlides, slide);
    return response.data;
  }

  async updateSlide(slide: CarouselSlideModel): Promise<CarouselSlideModel> {
    const response = await axios.put<CarouselSlideModel>(config.urls.carouselSlides, slide);
    return response.data;
  }

  async deleteSlide(slideId: number): Promise<void> {
    await axios.delete(config.urls.carouselSlides + slideId);
  }
}

const carouselSlidesServices = new CarouselSlidesServices();
export default carouselSlidesServices;
