export class CarouselSlideModel {
  public id: number;
  public imageURL: string;
  public title: string;
  public subtitle: string;
  public eyebrow: string;
  public linkURL: string;
  public linkText: string;
  public displayOrder: number;
  public isActive: boolean;

  constructor(slide: Partial<CarouselSlideModel>) {
    this.id = slide.id || 0;
    this.imageURL = slide.imageURL || "";
    this.title = slide.title || "";
    this.subtitle = slide.subtitle || "";
    this.eyebrow = slide.eyebrow || "";
    this.linkURL = slide.linkURL || "";
    this.linkText = slide.linkText || "";
    this.displayOrder = slide.displayOrder || 0;
    this.isActive = slide.isActive ?? true;
  }
}
