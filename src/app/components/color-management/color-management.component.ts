import { Component, OnInit , inject} from '@angular/core';
import { ProductService} from '../../services/product.service'
import { Color } from 'src/app/models/color';


@Component({
  selector: 'app-color-management',
  templateUrl: './color-management.component.html',
  styleUrls: ['./color-management.component.scss']
})
export class ColorManagementComponent implements OnInit {
  colors: Color[];

  constructor(private productService: ProductService,) {
    
  }

  ngOnInit() { 
    this.getAllColors();
    
  }
  getAllColors() {
    this.productService.getAllColors().subscribe(colors => {
      this.colors = colors;
    })
  }

  deleteOneColor(color: Color):void {
    if (confirm("do you want to delete this dictionary?")) {
     this.colors =   this.colors.filter( id => id !== color)
    this.productService.deleteColorById(color).subscribe();
    console.log(color);
    }
    
  }
}
