import { createAction, props } from '@ngrx/store';

export const addReset = createAction('[Button Component] Add Reset');
export const resetResets = createAction('[Button Component] Reset Resets');

export const addZeros = createAction(
  '[Button Component] add Zeros',
  props<{ amount: number }>()
);
export const resetZeros = createAction('[Button Component] reset Zeros');
