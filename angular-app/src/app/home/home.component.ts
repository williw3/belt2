import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  restaurants = [];

  constructor(private _http: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.getRestaurantsFromService();
  }

  getRestaurantsFromService(){
    let observable = this._http.getRestaurants();
    observable.subscribe(data => {
      this.restaurants = data['restaurants'];
      console.log("Get them eateries", data);
    })
  }

  deleteFromService(id){
    let observable = this._http.deleteRestaurant(id);
    observable.subscribe(data => {
      console.log("It gone");
      this.getRestaurantsFromService();
    })
  }
}
