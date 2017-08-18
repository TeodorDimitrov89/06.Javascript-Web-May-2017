import { initianState } from './animals.state';
import { IAnimalState } from './animals.state';

import {
  ADD_ANIMAL,
  ALL_ANIMALS,
  DETAILS_ANIMAL,
  REACTION,
  ADD_COMMENT,
  ALL_COMMENTS,
  MY_ANIMALS,
  DELETE_ANIMAL
} from './animals.actions';

function addAnimal(state, action): IAnimalState {
  const response = action.response;
  return Object.assign({}, state, {
    animalAdded: response.success,
    animalAddedId: response.success ? response.animal.id : null
  });
}
function allAnimals(state, action): IAnimalState {
  const allAnimals = action.response;
  return Object.assign({}, state, {
    animals: allAnimals
  })
}
function animalDetails(state, action): IAnimalState {
  const animal = action.response;
  return Object.assign({}, state, {
    animalDetails: animal
  })
}

function reaction(state, action): IAnimalState {
  const currentReactions = state.animalDetails.reactions;
  const currentSelectedReaction = action.selectedReaction;
  const result = action.response;
  const objectKeys = Object.keys(state.animalDetails.reactions);

  if (result.success) {
    let react = { ...currentReactions }
    ++react[currentSelectedReaction];
    let p = Object.assign({}, state.animalDetails, {
      reactions: react
    })
    return Object.assign({}, state, {
      animalDetails: p
    })
  }
  return state;
}

function addComment(state, action): IAnimalState {
  const response = action.response;
  const comment = response.comment;
  const allComments = state.comments;
  if (response.success) {
    return Object.assign({}, state, {
      comments: [...allComments, comment]
    })
  }
  return state;
}
function AllComments(state, action): IAnimalState {
  const comments = action.response;
  return Object.assign({}, state, {
    comments
  })
}

function myAnimals(state, action): IAnimalState {
  const myAnimals = action.response;
  return Object.assign({}, state, {
    myAnimals
  })
}
function deleteAnimal(state, action): IAnimalState {
  const animalId = action.id;
  const myAnimals = state.myAnimals.slice(0);
  const myNewAnimals = myAnimals.filter(animal => animal.id !== animalId);
  return Object.assign({}, state, {
    myAnimals: myNewAnimals
  })
}
export function animalsReducer(state = initianState, action) {
  switch (action.type) {
    case ADD_ANIMAL: {
      return addAnimal(state, action);
    }
    case ALL_ANIMALS: {
      return allAnimals(state, action);
    }
    case DETAILS_ANIMAL: {
      return animalDetails(state, action);
    }
    case REACTION: {
      return reaction(state, action);
    }
    case ADD_COMMENT: {
      return addComment(state, action);
    }
    case ALL_COMMENTS: {
      return AllComments(state, action);
    }
    case MY_ANIMALS: {
      return myAnimals(state, action);
    }
    case DELETE_ANIMAL: {
      return deleteAnimal(state, action);
    }
    default: return state;
  }
}