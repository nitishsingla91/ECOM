import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, from } from 'rxjs';
import { Facet, Facets, Product, ProductCatalog, SearchFacets } from 'src/app/common/interfaces.defs';
import { ApiService } from 'src/app/services/api.service';


export const routeParams = {BRANDS: 'brands', COLORS:'colors',PRODUCT_TYPE:'productType', PRODUCT_SIZE:'productSize',PRODUCT_DISCOUNT:'productDiscount'};


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})

export class SearchResultComponent implements OnInit {

  public productCatalog: ProductCatalog={};
  public facets: Facets={};
  public itemsPerPage=10;
  public products:any=[];
  public text:string='';

  public brands:string[]=[];
  public colors:string[]=[];
  public productType:string[]=[];
  public productSize:string[]=[];
  public productDiscount:string[]=[];

  public searchQuery = new URLSearchParams();
  public paginationFrom = 0;
  public productResults:any = 0;
  public numberOfPages=0;


constructor(
  public restApi: ApiService,
  private route: ActivatedRoute,
  public router: Router,
  public location:Location){
  this.route.queryParams.subscribe(params => {
      this.paginationFrom = 0;
      this.text = params['text']
      this.searchQuery = new URLSearchParams();
      this.searchQuery.append("text",this.text);
      var tasks$ = [];
      tasks$.push(this.route.queryParamMap.subscribe(params => this.brands = params.getAll(routeParams.BRANDS)));
      tasks$.push(this.route.queryParamMap.subscribe(params => this.colors = params.getAll(routeParams.COLORS)));
      tasks$.push(this.route.queryParamMap.subscribe(params => this.productType = params.getAll(routeParams.PRODUCT_TYPE)));
      tasks$.push(this.route.queryParamMap.subscribe(params => this.productSize = params.getAll(routeParams.PRODUCT_SIZE)));
      tasks$.push(this.route.queryParamMap.subscribe(params => this.productDiscount = params.getAll(routeParams.PRODUCT_DISCOUNT)));
      forkJoin([from(tasks$)]).subscribe(response =>{
        this.searchProducts();
        this.getFacets();
      })
  });
}

  ngOnInit(): void {
            
  }

  searchProducts(){
    let searchFacets={brands:this.brands,colors:this.colors,productDiscounts:this.productDiscount,productTypes:this.productType,productSizes:this.productSize};
    this.restApi.searchProducts(this.text,this.itemsPerPage,this.paginationFrom,searchFacets).subscribe((data) => {
      this.productCatalog = {};
      this.productCatalog = data; 
      this.productResults = this.productCatalog.products?.length;
      let size:any = this.productCatalog.total;
      this.numberOfPages = (size/this.itemsPerPage);
      this.numberOfPages = Math.ceil(Number(this.numberOfPages));
    });
  }

    getFacets(){
      let searchFacets={brands:this.brands,colors:this.colors,productDiscounts:this.productDiscount,productTypes:this.productType,productSizes:this.productSize};
      this.restApi.getFacets(this.text,this.itemsPerPage,searchFacets).subscribe((data) => {
        this.facets = data;
        this.facets.agg_productSizes?.sort((a, b) => (new Number(a.name) < new Number(b.name)) ? -1 : 1);
        this.facets.agg_productDiscount?.sort((a, b) => (new Number(a.name?.replace('%','')) > new Number(b.name?.replace('%',''))) ? -1 : 1);
      });

  }

  searchByBrands(event:any,value:any){
    this.paginationFrom = 0;
    this.numberOfPages=0;
    if(event.target?.checked){
      this.brands.push(value);
      this.searchQuery.append(routeParams.BRANDS,value);
    }else{
      const index = this.brands.indexOf(value, 0);
      if (index > -1) {
        this.brands.splice(index, 1);
      }
      this.searchQuery.delete(routeParams.BRANDS);
      this.populateQueryParams(routeParams.BRANDS,this.brands);
    }
    this.location.go("/search",this.searchQuery.toString())
    this.searchProducts();
    this.getFacets();
  }

  searchByColors(event:any,value:any){
    this.paginationFrom = 0;
    this.numberOfPages=0;
    if(event.target?.checked){
      this.colors.push(value);
      this.searchQuery.append(routeParams.COLORS,value);
    }else{
      const index = this.colors.indexOf(value, 0);
      if (index > -1) {
        this.colors.splice(index, 1);
      }
      this.searchQuery.delete(routeParams.COLORS);
      this.populateQueryParams(routeParams.COLORS,this.colors);
    }
    this.location.go("/search",this.searchQuery.toString())
    this.searchProducts();
    this.getFacets();
  }

  searchByTypes(event:any,value:any){
    this.paginationFrom = 0;
    this.numberOfPages=0;
    if(event.target?.checked){
      this.productType.push(value);
      this.searchQuery.append(routeParams.PRODUCT_TYPE,value);
    }else{
      const index = this.productType.indexOf(value, 0);
      if (index > -1) {
        this.productType.splice(index, 1);
      }
      this.searchQuery.delete(routeParams.PRODUCT_TYPE);
      this.populateQueryParams(routeParams.PRODUCT_TYPE,this.productType);
    }
    this.location.go("/search",this.searchQuery.toString())
    this.searchProducts();
    this.getFacets();
  }

  searchByDiscount(event:any,value:any){
    this.paginationFrom = 0;
    this.numberOfPages=0;
    if(event.target?.checked){
      this.productDiscount.push(value);
      this.searchQuery.append(routeParams.PRODUCT_DISCOUNT,value);
    }else{
      const index = this.productDiscount.indexOf(value, 0);
      if (index > -1) {
        this.productDiscount.splice(index, 1);
      }
      this.searchQuery.delete(routeParams.PRODUCT_DISCOUNT);
      this.populateQueryParams(routeParams.PRODUCT_DISCOUNT,this.productDiscount);
    }
    this.location.go("/search",this.searchQuery.toString())
    this.searchProducts();
    this.getFacets();
  }

  searchBySizes(event:any,value:any){
    this.paginationFrom = 0;
    this.numberOfPages=0;
    if(event.target?.checked){
      this.productSize.push(value);
      this.searchQuery.append(routeParams.PRODUCT_SIZE,value);
    }else{
      const index = this.productSize.indexOf(value, 0);
      if (index > -1) {
        this.productSize.splice(index, 1);
      }
      this.searchQuery.delete(routeParams.PRODUCT_SIZE);
      this.populateQueryParams(routeParams.PRODUCT_SIZE,this.productSize);
    }
    
    this.location.go("/search",this.searchQuery.toString())
    this.searchProducts();
    this.getFacets();
  }

  checkByBrands(value:any):boolean{
      return this.brands.includes(value);
  }

  checkBySizes(value:any):boolean{
    return this.productSize.includes(value);
  }

  checkByColors(value:any):boolean{
    return this.colors.includes(value);
  }

  checkByTypes(value:any):boolean{
    return this.productType.includes(value);
  }

  checkByDiscount(value:any):boolean{
    return this.productDiscount.includes(value);
  }

  populateQueryParams(k:string,value:string[]){
      value.forEach(v=>{
        this.searchQuery.append(k,v);
      })
  }

  navigateProductPage(productId:any){
    this.router.navigate(
      ['/product'],
      { 
        queryParams: { productId: productId}
      }
    );
  }

   paginate(from:number){
    this.paginationFrom = this.itemsPerPage * from;
    this.searchProducts();
    $('.pagination li').removeClass('active');
    $('#page'+from).addClass('active');
    $('#bottomPage'+from).addClass('active');
    
   }

   numSequence(n: number): Array<number> {
    return Array(n);
  }
}


