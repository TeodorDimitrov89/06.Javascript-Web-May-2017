import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AnimalsService } from './animals.service';
import { ErrorsHandlerService } from '../../core/errors-handler.service';
import { ToastrService } from '../../core/toastr.service';

@Component({
  selector: 'list-animals',
  templateUrl: './list-animals.component.html'
})

export class ListAnimalsComponent implements OnInit {
  page: number = 1;
  searchText: string = ''
  animals: Array<object> = [];

  constructor(
    private animalsService: AnimalsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private errorsHandlerService: ErrorsHandlerService,
    private toastrService: ToastrService
  ) { }
  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe((params) => {
        this.page = +params['page'] || 1;
        this.searchText = params['search'];
        this.getAnimals(this.page, this.searchText);
      })
  }
  search() {
    this.router.navigateByUrl(`/animals/all?search=${this.searchText}`);
  }

  prevPage() {
    if (this.page === 1) {
      return;
    }
    const url = this.getUrl(this.page - 1);
    this.router.navigateByUrl(url);
  }
  nextPage() {
    if (this.animals.length === 0 || this.animals.length < 10) {
      return;
    }
    const url = this.getUrl(this.page + 1);
    this.router.navigateByUrl(url);
  }



  getAnimals(page = 1, searchText = null) {
    this.animalsService
      .allAnimals(this.page, searchText)
      .then(response => {
        this.animals = response;
      })
      .catch(err => {
        const errorMessage = this.errorsHandlerService.handleGlobalError(err);
        this.toastrService.error(errorMessage);
      });
  }
  private getUrl(page) {
    let url = `/animals/all?page=${page}`;
    if (this.searchText) {
      url += `&search=${this.searchText}`;
    }
    return url;
  }
}