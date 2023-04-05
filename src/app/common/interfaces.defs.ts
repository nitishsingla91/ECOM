export interface Category {
    id?: string;
    name?: string;
    parent?: string;
    path?: number;
    createdAt?:string;
    updatedAt?:string;
 }

 export interface CategoryRoot {
    parent?:Category;
    childrens?:CategoryChild[]
 }

 export interface CategoryChild {
   parent?:Category;
   childrens?:Category[]
}

export interface Facet{
   name?:string;
   quantity?:number
}


export interface Facets{
   agg_productType?:Facet[];
   agg_productSizes?:Facet[];
   agg_brand?:Facet[];
   agg_color?:Facet[];
   agg_productDiscount?:Facet[];
}

export interface ProductCatalog{
	size?:number;
	total?:number;
	products?:Product[];

}

export interface Product{
    id?:string;
	 name?:string;
	 category?:string;
	 description?:string;
	 brand?:string;
	 color?:string;
	 discount?:Discount;
	 price?:Price;
	 sellerInfo?:SellerInfo;
	 images?:Image[];
	 attributes?:Attribute[];
	 skus?:SkuInfo[];
	 productType?:string;
	 productSizes?:string[];
	 productDiscount?:string;
}

export interface Attribute{
   name?:string;
   value?:string;
}

export interface Price{
   maxRetailPrice?:PriceInfo;
   sellingPrice?:PriceInfo;
}
export interface Discount{
   flatDiscount?:number;
   flatDiscountCurrency?:string;
   percentageDiscount?:number;
}

export interface SellerInfo{
   name?:string;
   address?:string
}

export interface Image {
   src?:string;
   height?:string;
   width?:string;
}

export interface PriceInfo {
   amount?:number;
   currency?:string;
}

export interface SkuInfo {
	skuId?:string;
	stock?:string;
   size?:string
}

export interface SearchFacets{
   brands?:string[];
   colors?:string[];
   productTypes?:string[];
   productSizes?:string[];
   productDiscounts?:string[];
}


export interface KeycloakConfig{
   url?: string,
   realm?: string,
   clientId?: string,
   redirectURI?: string
}

