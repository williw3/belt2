import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getRestaurants(){
    return this._http.get('/restaurants');
  }

  newRestaurant(restaurant){
    return this._http.post('/restaurants', restaurant);
  }

  deleteRestaurant(id){
    return this._http.delete('/restaurants/' + id);
  }

  getOneRestaurant(id){
    return this._http.get('/restaurants/' + id);
  }

  updateRestaurant(restaurant){
    return this._http.put('/restaurants/' + restaurant._id, restaurant);
  }

  getReviews(id){
    return this._http.get('/review/' + id);
  }

  addReview(id, review){
    return this._http.post('/review/' + id, review);
  }

}
