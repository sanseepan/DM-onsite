import { Injectable } from '@angular/core';
import { environment} from '../../environments/environment';
import { Product} from '../models/product';
import { Observable } from 'rxjs';
import {  HttpHeaders, HttpClient } from '@angular/common/http';
import { Color } from '../models/color';


const httpOptions = {
  headers : new HttpHeaders({ 'content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_PREFIX_PRODUCT =  '/products/';
  private API_PREFIX_COLOR = '/colors/';
  private _product: string = environment.BACKEND_URL + this.API_PREFIX_PRODUCT;
  private _color: string = environment.BACKEND_URL + this.API_PREFIX_COLOR;

  constructor( private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http
    .get<Product[]>(this._product);
    
  }

  getSingleColor(id: number): Observable<Color> {
    return this.http
    .get<Color>(this._color + id)
    
  }

  getAllColors(): Observable<Color[]> {
    return this.http
    .get<Color[]>(this._color);

  }

  deleteColorById( color: Color | number): Observable<Color> {
    const id = typeof color === 'number' ? color: color.id;
    return this.http
    .delete<Color>(this._color + id, httpOptions)
  }

  postColor( color: Color): Observable<Color> {
    return this.http
    .post<Color>(this._color, color, httpOptions);
  }

  updateColor(id: any, color: Color): Observable<any> {
    return this.http
    .put(this._color + id , color, httpOptions)
  }
  
}
