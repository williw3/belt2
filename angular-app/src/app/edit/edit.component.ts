import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editRestaurant: any;
  error: any;

  constructor(private _http: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.populateEditField(params['id']));
    this.editRestaurant = {name: "", cuisine: "", reviews: []}
  }

  populateEditField(id){
    let observable = this._http.getOneRestaurant(id);
    observable.subscribe(data =>  {
      if(data['Error']){
        this.error = data['error'].errors.name.message;
      }
      else{
        this.editRestaurant = data['data'];
      }
    })
  }

  editRestaurantFromService(){
    let observable = this._http.updateRestaurant(this.editRestaurant);
    observable.subscribe(data => {
      if(data['error']){
        this.error = data['error'];
      }
      else{
        console.log('Updated Restaurant', data);
        this._router.navigate(['/home']);
      }
    })
  }

}
