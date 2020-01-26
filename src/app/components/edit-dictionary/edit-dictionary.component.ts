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

  constructor( private productService: ProductService, 
               private formBuilder: FormBuilder,
               private router: Router, 
               private route: ActivatedRoute,
               
              ) { }

  ngOnInit() {
    
    this.getColorById(this.route.snapshot.params['id']);
    this.entryForm = this.formBuilder.group({
      domain: '',
      range: '',
    });
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
}
