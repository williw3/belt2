import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  newReview: any;
  restaurantId;
  error: any;

  constructor(private _http: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.newReview= {name: "", stars: "", text: ""};
    this._route.params.subscribe((params: Params) => this.restaurantId = (params['id']));
  }

  addReviewFromService(){
    let observable = this._http.addReview(this.restaurantId, this.newReview);
    observable.subscribe(data => {
      console.log("This is the data that came back", data['error'].message);
      if(data['error']){
        this.error = data['error'];
      }
      else{
        this.newReview = {name: "", stars: "", text: ""}
        this._router.navigate(['/home']);
      }
    })
  }
}
