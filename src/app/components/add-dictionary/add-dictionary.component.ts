import { Component, OnInit } from '@angular/core';
import { ProductService} from '../../services/product.service'
import { Color } from 'src/app/models/color';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-dictionary',
  templateUrl: './add-dictionary.component.html',
  styleUrls: ['./add-dictionary.component.scss']
})
export class AddDictionaryComponent implements OnInit {
  colors: Color[];
  entryForm: FormGroup;
  color: Color;

  constructor(private productService: ProductService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() { 
    this.getAllColors();
    this.entryForm = this.formBuilder.group({
      domain: '',
      range: '',
    });
  }

  getAllColors() {
    this.productService.getAllColors().subscribe(colors => {
      this.colors = colors;
  
    })
  }

  addNewColor() {
    this.productService.postColor(this.entryForm.value)
      .subscribe(color => {
        this.colors.push(color);
        this.router.navigate(['/admin'])
        console.log(color, 'dictionary has been added' );
      }); 
    this.entryForm.reset();

  }

    // To Do 
    //function to prevent duplicate data

 /* 
  addAvalidatedColor() {
    this.productService.getAllColors().subscribe(colors => {
        this.colors = colors;
        colors.forEach(color => {        
          let formValue = this.entryForm.value;
        if(color.domain === formValue || color.range == formValue) {
          alert('Already you have added it  please check and enter the new value ')

        }
        else  {
          this.productService.postColor(this.entryForm.value)
             .subscribe(color => {
              this.colors.push(color);
             this.router.navigate(['/admin'])
              console.log(color, 'dictionary has been added' );
      }); 
              this.entryForm.reset();
        }     
        })
       
       
    })
  }

*/

}
