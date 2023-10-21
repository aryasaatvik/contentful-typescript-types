import { Asset } from "contentful-management";

export interface IComponentSeo {
  internalName: string;
  pageTitle: string;
  pageDescription: string;
  canonicalUrl: string;
  nofollow: boolean;
  noindex: boolean;
  shareImages: Asset[];
}

export interface IPageLanding {
  internalName: string;
  seoFields: IComponentSeo;
  heroBannerHeadline: string;
  heroBannerHeadlineColor: string;
  heroBannerImage: Asset;
  products: IPageProduct[];
}

export interface IPageProduct {
  internalName: string;
  slug: string;
  seoFields: IComponentSeo;
  name: string;
  description: string;
  price: number;
  featuredProductImage: Asset;
  productImages: Asset[];
  relatedProducts: IPageProduct[];
}
