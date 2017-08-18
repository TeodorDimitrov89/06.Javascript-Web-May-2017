import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/app.state';
import { AnimalsActions } from '../store/animals/animals.actions';


import { ListAnimalsModel } from '../animals/list-animals.model';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {
  myAnimals: Array<ListAnimalsModel> = [];

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private animalsActions: AnimalsActions,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.animalsActions.myAnimals()
      this.ngRedux.select(state => state.animals.myAnimals)
        .subscribe(response => {
          this.myAnimals = response;
        })
    })
  }

  delete(id: number) {
    this.animalsActions.deleteAnimal(id);
  }
}