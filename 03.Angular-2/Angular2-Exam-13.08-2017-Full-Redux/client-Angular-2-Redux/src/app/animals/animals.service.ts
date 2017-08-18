import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { Observable } from 'rxjs';

import { AddAnimalModel } from './add-animal.model';
import { ListAnimalsModel } from './list-animals.model';
import { AddCommentModel } from './add-comment.model';

@Injectable()
export class AnimalsService {
  constructor(
    private httpService: HttpService
  ) { }
  add(animal: AddAnimalModel): Observable<AddAnimalModel> {
    return this.httpService.post('animals/create', animal, true);
  }
  all(page: number = 1, searchText = null): Observable<Array<ListAnimalsModel>> {
    let url: string = `animals/all?page=${page}`;
    if (searchText) {
      url += `&search=${searchText}`;
    }
    return this.httpService.get(url);
  }
  details(id: number) {
    return this.httpService.get(`animals/details/${id}`, true);
  }
  reactions(id: number, reactionObject: object) {
    return this.httpService.post(`animals/details/${id}/reaction`, reactionObject, true);
  }
  addComment(id: number, comment: AddCommentModel) {
    return this.httpService.post(`animals/details/${id}/comments/create`, comment, true)
  }
  allComments(id: number) {
    return this.httpService.get(`animals/details/${id}/comments`, true);
  }
  myAnimals() {
    return this.httpService.get(`animals/mine`, true);
  }
  deleteAnimal(id: number) {
    return this.httpService.post(`animals/delete/${id}`, {}, true);
  }
}