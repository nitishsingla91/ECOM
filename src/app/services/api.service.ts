import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CategoryRoot, Facets, Product, ProductCatalog, SearchFacets} from '../common/interfaces.defs';
import { environment } from 'src/environments/environment';
@Injectable({providedIn: 'root'})
export class ApiService {

constructor(private http: HttpClient) { }
// Define API
apiURL = environment.searchServiceUrl;
/*========================================
  Methods for consuming RESTful API
=========================================*/
// Http Options
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

getCategories(): Observable<CategoryRoot[]> {
  return this.http
    .get<CategoryRoot[]>(this.apiURL + '/category/list')
    .pipe(retry(1), catchError(this.handleError));
}

getProduct(id: any): Observable<Product> {
  return this.http
    .get<Product>(this.apiURL + '/product/' + id)
    .pipe(retry(1), catchError(this.handleError));
}


searchProducts(text: string, size:number,searchFacets:SearchFacets): Observable<ProductCatalog> {
  const url = this.apiURL+'/product/search';

  let queryParams:HttpParams = new HttpParams();
  queryParams = queryParams.set("text",text);
  queryParams = queryParams.set("size",size);

  for(let index in searchFacets.brands){
    let i = new Number(index).valueOf();
    queryParams = queryParams.append('brands',searchFacets?.brands[i]);
  }
  for(let index in searchFacets.colors){
    let i = new Number(index).valueOf();
    queryParams=queryParams.append('colors',searchFacets.colors[i]);
  }
  for(let index in searchFacets.productDiscounts){
    let i = new Number(index).valueOf();
    queryParams=queryParams.append('productDiscount',searchFacets.productDiscounts[i]);
  }
  for(let index in searchFacets.productSizes){
    let i = new Number(index).valueOf();
    queryParams=queryParams.append('productSize',searchFacets.productSizes[i]);
  }
  for(let index in searchFacets.productTypes){
    let i = new Number(index).valueOf();
    queryParams=queryParams.append('productType',searchFacets.productTypes[i]);
  }
  return this.http
    .get<ProductCatalog>(url,{params:queryParams})
    .pipe(retry(1), catchError(this.handleError));
}

getFacets(text: string, size:number): Observable<Facets> {
  let queryParams = new HttpParams();
  queryParams = queryParams.set('text',text);
  queryParams = queryParams.set('size',size);
  return this.http
    .get<Facets>(this.apiURL + '/product/facets',{params:queryParams})
    .pipe(retry(1), catchError(this.handleError));
}
// Error handling
handleError(error: any) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(() => {
    return errorMessage;
  });
}
}
