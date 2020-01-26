import { Component, OnInit } from '@angular/core';
import { ProductService} from '../../services/product.service';
import { Product} from '../../models/product';
import { Color} from '../../models/color';
import { FormControl} from '@angular/forms'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  product: Product;
  colors: Color[];
  color: Color;
  searchTerm: string;
  myControl = new FormControl();
  filteredProducts: Product[];
   
  constructor( private productService: ProductService) { }

  ngOnInit() {
    this.search();
    this.getReplacedProducts();
    
  }

  getReplacedProducts() {
    this.productService.getAllProducts().subscribe( products => {
      this.products = products;
     for(let i = 0; i < this.products.length; i++) {
       this.productService.getAllColors().subscribe( colors => {
         colors.forEach(color => {
           if(products[i].color === color.domain || products[i].color === color.range) {
           delete products[i].color;
           products[i].color = color.range;
           this.products;
           this.search();           
           }
         })
       })
     }    
    }) 

  }

 search(): void {
   const query = this.searchTerm;
   if(query) {
     this.filteredProducts = this.products.filter(function(el) {
       return el.color.toLowerCase().indexOf(query.toLowerCase()) > -1;
     })
   }

   else {
     this.filteredProducts = this.products;
    
   }
 }
}
