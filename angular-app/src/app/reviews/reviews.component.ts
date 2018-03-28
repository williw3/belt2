import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  review = [];
  restaurantId;

  constructor(private _http: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.getReviewsFromService(params['id']));
    this._route.params.subscribe((params: Params) => this.restaurantId = (params['id']));
    console.log(this.restaurantId);

  }
  getReviewsFromService(id){
    let observable = this._http.getReviews(id);
    observable.subscribe(data => {
      console.log(data['data']);
      this.review = data['data'].reviews;
      this.review.sort(function(a, b){return b - a});
      // console.log("Got them reviews", data);
    })
  }
}
