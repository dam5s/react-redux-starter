import {Action, combineReducers, createStore, Reducer, Store} from 'redux';
import {jokeState, JokeState} from '../components/joke/JokeState';

export type AppState = {
    joke: JokeState
};

const appReducer: Reducer<AppState, Action> =
    combineReducers({
        joke: jokeState.reducer
    });

const create = (): Store<AppState> =>
    createStore(appReducer);

export const stateStore = {
    create
};
