import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { ListAnimalsModel } from './list-animals.model';

import { Router, ActivatedRoute } from '@angular/router';

import { IAppState } from '../store/app.state';
import { AnimalsActions } from '../store/animals/animals.actions';


@Component({
  selector: 'list-animals',
  templateUrl: './list-animals.component.html'
})

export class ListAnimalsComponent implements OnInit {
  page: number;
  animals: Array<ListAnimalsModel> = [];
  searchText: string = '';

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private animalsActions: AnimalsActions,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.page = +params['page'] || 1;
        this.searchText = params['search'];
        this.animalsActions.all(this.page, this.searchText);
        this.ngRedux.select(state => state.animals.animals)
          .subscribe(animals => this.animals = animals);
      });
  }
  search() {
    if (this.searchText) {
      this.router.navigateByUrl(`animals/all?search=${this.searchText}`);
    }
  }
  prevPage() {
    if (this.page === 1) {
      return;
    }
    const url = this.getUrl(this.page - 1);
    this.router.navigateByUrl(url);
  }

  nextPage() {
    if (this.animals.length === 0) {
      return;
    }
    const url = this.getUrl(this.page + 1);
    this.router.navigateByUrl(url);
  }
  private getUrl(page: number) {
    let url = `animals/all?page=${page}`;
    if (this.searchText) {
      url += `&search=${this.searchText}`;
    }
    return url;
  }
}