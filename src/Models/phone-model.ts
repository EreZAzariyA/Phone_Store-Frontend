export class PhoneModel {
      public phoneId: string;
      public brandId: string;
      public name: string;
      public description: string;
      public rating: number;
      public price: number;
      public picture: string;

      public memorySizes?: number[]; // External (Not include in database)
}