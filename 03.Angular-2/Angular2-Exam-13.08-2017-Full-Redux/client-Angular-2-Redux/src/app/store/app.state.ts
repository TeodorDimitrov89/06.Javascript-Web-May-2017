import { ICoreState } from './core/core.state';
import { IUserState } from './users/users.state';
import { IStatsState } from './stats/stats.state';
import { IAnimalState } from './animals/animals.state';
export interface IAppState {
  core: ICoreState,
  stats: IStatsState,
  users: IUserState,
  animals: IAnimalState
}