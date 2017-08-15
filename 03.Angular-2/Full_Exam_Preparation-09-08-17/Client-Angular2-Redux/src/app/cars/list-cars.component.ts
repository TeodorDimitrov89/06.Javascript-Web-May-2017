import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/app.state';
import { Router, ActivatedRoute } from '@angular/router';



import { CarsActions } from '../store/cars/cars.actions';

@Component({
  selector: 'list-cars',
  templateUrl: './list-cars.component.html'
})

export class ListCarsComponent implements OnInit {
  page:number;
  cars: Array<object> = [];
  searchText: string = ''

  constructor(
    private ngRedux:NgRedux<IAppState>,
    private carsActions: CarsActions,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}
  ngOnInit() {
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        this.page = +params['page'] || 1;
        this.searchText = params['search'];
         this.carsActions.allCars(this.page, this.searchText);
         this.ngRedux
          .select(state => state.cars.allCars)
          .subscribe(cars => this.cars = cars);
    });
   
  }

  search() {
    this.router.navigateByUrl(`cars/all?search=${this.searchText}`);
  }

  prevPage() {
    if (this.page === 1) {
      return;
    }
    const url = this.getUrl(this.page - 1)
    this.router.navigateByUrl(url);
  }

  nextPage() {
    if (this.cars.length === 0) {
      return;
    }
    const url = this.getUrl(this.page + 1)
    
    this.router.navigateByUrl(url);
  }

  private getUrl(page) {
    let url = `cars/all?page=${page}`;
    if(this.searchText) {
      url += `&search=${this.searchText}`;
    }
    return url;
  }
}