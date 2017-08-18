import { 
  createStore, 
  applyMiddleware, 
  compose, 
  GenericStoreEnhancer 
} from 'redux';
import deerFreeze from './deepFreeze';

import { reducer } from './reducer';
import { IAppState } from './app.state';

declare var window: any;
const devToolsExtension: GenericStoreEnhancer = (window.devToolsExtension)
  ? window.devToolsExtension() : (f) => f;
export const store = createStore<IAppState>(
  reducer,
  compose(
    applyMiddleware(deerFreeze), devToolsExtension
  ) as GenericStoreEnhancer);

