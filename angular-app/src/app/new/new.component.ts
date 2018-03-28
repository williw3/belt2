import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newRestaurant: any;
  error: any;

  constructor(private _http: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.newRestaurant= {name: "", cuisine: "", reviews: []}

  }
  addRestaurantFromService(){
    let observable = this._http.newRestaurant(this.newRestaurant);
    observable.subscribe(data => {
      if(data['error']){
        console.log('This right here???', data['error']);
        this.error = data['error'];
      }
      else{
        console.log("New Restaurant Added", data);
        this.newRestaurant = {name: "", cuisine: "", reviews: []}
        this._router.navigate(['/home']);
      }
    })
  }
}
