import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { AddAnimalModel } from './add-animals.model'

@Injectable()
export class AnimalsService {
  constructor(
    private httpService: HttpService
  ) { }

  addAnimal(animal:AddAnimalModel) {
    return this.httpService.post('animals/create', animal, true);
  }
  
  allAnimals(page: number = 1, search: string = null) {
    let url = `animals/all?page=${page}`;
    if (search) {
      url += `&search=${search}`;
    }
    return this.httpService.get(url);
  }

  details(id: number) {
    return this.httpService.get(`animals/details/${id}`, true);
  }

  reaction(id: number, selectedReaction: object) {
    return this.httpService.post(`animals/details/${id}/reaction`, selectedReaction, true);
  }

  submitComment(id:number, message: object) {
    return this.httpService.post(`animals/details/${id}/comments/create`, message, true)
  }

  allComments(id :number) {
    return this.httpService.get(`animals/details/${id}/comments`, true);
  }

  myAnimals() {
    return this.httpService.get(`animals/mine/`, true);
  }

  delete(id: number) {
    return this.httpService.post(`animals/delete/${id}`, {}, true);
  }
}