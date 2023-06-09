import { createReducer, on } from '@ngrx/store';
import { addReset, addZeros, resetResets, resetZeros } from './game.actions';

export interface State {
  resets: number;
  zeros: number;
}

export const initialState: State = {
  resets: 0,
  zeros: 0,
};

export const gameReducer = createReducer(
  initialState,
  on(addReset, (state) => ({ ...state, resets: state.resets + 1 })),
  on(resetResets, (state) => ({ ...state, resets: 0 })),
  on(addZeros, (state, action) => ({
    ...state,
    zeros: state.zeros + action.amount,
  })),
  on(resetZeros, (state) => ({ ...state, zeros: 0 }))
);
