import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AnimalsService } from './animals.service';

import { ErrorsHandlerService } from '../../core/errors-handler.service';
import { ToastrService } from '../../core/toastr.service';

@Component({
  selector: 'animal-details',
  templateUrl: './animal-details.component.html'
})

export class AnimalDetailsComponent implements OnInit {
  private animalId: number = null;
  animal: object = {};
  comments: Array<object> = [];
  comment:string;  
  reactions: Array<object>;
  constructor(
    private animalsService: AnimalsService,
    private activatedRoute: ActivatedRoute,
    private errorsHandlerService: ErrorsHandlerService,
    private toastrService: ToastrService
  ) { }
  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params) => {
        const id = params['id'];
        Promise.all([
          this.animalsService.details(id),
          this.animalsService.allComments(id)
        ]).then(response => {
            this.animal = response[0];
            let userReaction = this.animal['reactions'];
            let reactions = Object.keys(userReaction).map(key => {
              return { type:key, value: userReaction[key] }
            })
            this.reactions = reactions;
            this.animalId = response[0]['id'];
            this.comments = response[1];
          })
          .catch(err => {
            const errorMessage = this.errorsHandlerService.handleGlobalError(err);
            this.toastrService.error(errorMessage);
          });;
      })
  }


  submitReaction(reaction: string) {
    const selectedReaction = {type: reaction}
    this.animalsService
      .reaction(+this.animalId, selectedReaction)
      .then(response => {
        if (response.success) {  
          this.ngOnInit();
          this.toastrService.success(response.message);
        } else {
          let errorMessage = this.errorsHandlerService.handleErrors(response);
          this.toastrService.error(errorMessage);
        }
      })
      .catch(err => {
        const errorMessage = this.errorsHandlerService.handleGlobalError(err);
        this.toastrService.error(errorMessage);
      });
  }



  submitComment() {
    const commentMessage = this.comment
    let message = { message: commentMessage }
    this.animalsService
      .submitComment(+this.animalId, message)
      .then(response => {
        if (response.success) {
          this.comment = response.review;
          this.toastrService.success(response.message);
          this.allComments()
        } else {
          let errorMessage = this.errorsHandlerService.handleErrors(response);
          this.toastrService.error(errorMessage);
        }
      })
      .catch(err => {
        const errorMessage = this.errorsHandlerService.handleGlobalError(err);
        this.toastrService.error(errorMessage);
      });
  }
  allComments() {
    this.animalsService
      .allComments(+this.animalId)
      .then(response => {
        this.comments = response
      })
  }
}