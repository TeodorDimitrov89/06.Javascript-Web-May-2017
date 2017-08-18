import { ListAnimalsModel } from '../../animals/list-animals.model';
import { AddCommentModel } from '../../animals/add-comment.model';

export interface IAnimalState {
  animalAdded: boolean;
  animalAddedId: number,
  animals: Array<ListAnimalsModel>,
  animalDetails: object,
  comments: Array<AddCommentModel>,
  myAnimals: Array<ListAnimalsModel>
}

export const initianState: IAnimalState = {
  animalAdded: false,
  animalAddedId: null,
  animals: [],
  animalDetails: {},
  comments: [],
  myAnimals: []
}