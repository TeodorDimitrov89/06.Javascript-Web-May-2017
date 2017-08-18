import { Component, OnInit } from '@angular/core';
import { IAppState } from '../store/app.state';
import { NgRedux } from 'ng2-redux';

import { AnimalDetailsModel } from './animal-details.model';
import { AddCommentModel } from './add-comment.model';


import { ActivatedRoute } from '@angular/router';

import { AnimalsActions } from '../store/animals/animals.actions';

@Component({
  selector: 'animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.css']
})
export class AnimalDetailsComponent implements OnInit {
  // animal: AnimalDetailsModel = new AnimalDetailsModel();
  animal: object = {}
  animalId: number;
  reactions: Array<string> = ['like', 'love', 'haha', 'wow', 'sad', 'angry'];
  reaction: string = '';
  userReactions: Array<object> = [];

  commentMessage: AddCommentModel = new AddCommentModel();
  allComments: Array<AddCommentModel> = [];

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private activatedRoute: ActivatedRoute,
    private animalsActions: AnimalsActions
  ) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const animalId = +params['id'];
      this.animalsActions.details(animalId);
      this.ngRedux.select(state => {
        return state.animals.animalDetails
      }).subscribe(animal => {
        this.animal = animal;
        this.animalId = animalId;
        if (Object.keys(this.animal)['length'] > 0) {
          const reactions = this.animal['reactions'];
          const reactionKeys = Object.keys(this.animal['reactions']);
          const userReactions = reactionKeys.map(reaction => {
            return { type: reaction, count: reactions[reaction] };
          })
          this.userReactions = userReactions;
        }
      })
      this.animalsActions.allComments(this.animalId);
      this.ngRedux.select(state => state.animals.comments)
        .subscribe(comments => {
          this.allComments = comments
        })
    })
  }
  userReaction() {
    const reactionObject = { type: this.reaction };
    const animalId = this.animalId;
    this.animalsActions.reaction(animalId, reactionObject, this.reaction);
  }
  addComment() {
    this.animalsActions.addComment(this.animalId, this.commentMessage);
  }
}