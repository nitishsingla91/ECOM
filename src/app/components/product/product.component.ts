import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/interfaces.defs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  public product: Product={};
  public productId: Product={};
  public stock: any='';
  constructor(
    public restApi: ApiService,
    private route: ActivatedRoute,
    public router: Router){
      this.route.queryParams.subscribe(params => {
        this.productId = params['productId'];
        this.getProduct();
    });
    }

    ngOnInit(): void {
            
    }

    getProduct(){
      this.restApi.getProduct(this.productId).subscribe((data) => {
        this.product = {}; 
        this.product = data;  
        if(this.product && this.product.skus) {
           this.stock  = this.product.skus?.at(0)?.stock;
        }
      });
    }
    
    setStock(stock:any){
      this.stock = stock;
    }
}
