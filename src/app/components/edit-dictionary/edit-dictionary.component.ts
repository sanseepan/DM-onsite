import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  FormBuilder, FormGroup } from '@angular/forms';
import { ProductService} from '../../services/product.service'
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-edit-dictionary',
  templateUrl: './edit-dictionary.component.html',
  styleUrls: ['./edit-dictionary.component.scss']
})
export class EditDictionaryComponent implements OnInit {
  entryForm: FormGroup;
  color: Color;
  colors: Color[];
  validatorArray = [];

  constructor( private productService: ProductService, 
               private formBuilder: FormBuilder,
               private router: Router, 
               private route: ActivatedRoute,
               
              ) { }

  ngOnInit() {
    this.getAllColors();
    this.getColorById(this.route.snapshot.params['id']);
    this.entryForm = this.formBuilder.group({
      domain: '',
      range: '',
    });
  }

  
  getAllColors() {
    this.productService.getAllColors().subscribe(colors => {
      this.colors = colors;

      this.colors.forEach(color => {
        this.validatorArray.push(color.domain, color.range);
      })
  
    })
  }

   
  getColorById(id: any) {
    this.productService.getSingleColor(id).subscribe((data: any) => {
      this.entryForm.setValue({
        domain: data.domain,
        range: data.range,
      });
    });
  }

  
  updateColor() {
   const id =  this.route.snapshot.params['id']
    this.productService.updateColor(id, this.entryForm.value)
      .subscribe( data => {console.log(data)
      this.router.navigate(['/admin'])});
      this.entryForm.reset();
      
  }

  addValidatedColor() {
    const allColorsAsString = this.validatorArray.join('');
    const formValue = this.entryForm.value;
    if((allColorsAsString.includes(formValue.domain)) || (allColorsAsString.includes(formValue.range) )) {
      alert('Already you have added it  please check and enter the new value ')
    }

    else {
      this.updateColor();
    }
   
  }



}
