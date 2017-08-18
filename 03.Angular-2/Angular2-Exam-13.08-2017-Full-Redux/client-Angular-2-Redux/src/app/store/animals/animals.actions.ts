import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../app.state';

import { AnimalsService } from '../../animals/animals.service';

import { AddAnimalModel } from '../../animals/add-animal.model';
import { AddCommentModel } from '../../animals/add-comment.model';

export const ADD_ANIMAL = 'animal/ADD';
export const ALL_ANIMALS = 'animals/ALL';
export const DETAILS_ANIMAL = 'animal/DETAILS';
export const REACTION = 'animal/REACTION';
export const ADD_COMMENT = 'animal/COMMENT';
export const ALL_COMMENTS = 'animal/ALL_COMMENTS';
export const MY_ANIMALS = 'animals/MINE';
export const DELETE_ANIMAL = 'animal/DELETE';


@Injectable()
export class AnimalsActions {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private animalsService: AnimalsService
  ) { }
  add(animal: AddAnimalModel): void {
    this.animalsService.add(animal)
      .subscribe(response => {
        this.ngRedux.dispatch({
          type: ADD_ANIMAL,
          response
        })
      })
  }
  all(page: number = 1, searchText: string = ''): void {
    this.animalsService.all(page, searchText)
      .subscribe(response => {
        this.ngRedux.dispatch({
          type: ALL_ANIMALS,
          response
        })
      })
  }
  details(id: number): void {
    this.animalsService
      .details(id)
      .subscribe(response => {
        this.ngRedux.dispatch({
          type: DETAILS_ANIMAL,
          response
        })
      })
  }
  reaction(id: number, reactionObject: object, selectedReaction: string) {
    this.animalsService
      .reactions(id, reactionObject)
      .subscribe(response => {
        this.ngRedux.dispatch({
          type: REACTION,
          response,
          selectedReaction
        })
      })
  }
  addComment(id: number, comment: AddCommentModel): void {
    this.animalsService
      .addComment(id, comment)
      .subscribe(response => {
        this.ngRedux.dispatch({
          type: ADD_COMMENT,
          response
        })
      })
  }
  allComments(id: number) {
    this.animalsService
      .allComments(id)
      .subscribe(response => {
        this.ngRedux.dispatch({
          type: ALL_COMMENTS,
          response
        })
      })
  }
  myAnimals() {
    this.animalsService.myAnimals()
      .subscribe(response => {
        this.ngRedux.dispatch({
          type: MY_ANIMALS,
          response
        })
      })
  }
  deleteAnimal(id: number): void {
    this.animalsService.deleteAnimal(id)
      .subscribe(response => {
        this.ngRedux.dispatch({
          type: DELETE_ANIMAL,
          id,
          response
        })
      })
  }
}