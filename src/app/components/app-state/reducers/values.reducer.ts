import { addValue, getValue, addInfo, addTest } from '../actions/values.action';
import { createReducer, on, Action, State } from '@ngrx/store';

export const initialState: any[] = [];

export const valueReducer = createReducer(initialState,
  on(addValue, (state, { payload }) => {
    
    const key = payload.type === 'input' ? `i${payload.id}` : `o${payload.id}`;
    if (payload.type === 'output') {
      const frequency = payload.frequency;
      state[frequency] = payload.value;
    }

    state[key] = payload.value;
    return state;
  }),
  on(getValue, (state, { payload }) => {
    const key = payload.type === 'input' ? `i${payload.id}` : `o${payload.id}`;
    return state[key] ? state[key] : '';
  }),
  on(addInfo, (state, { payload }) => {
    const key = `${payload.id}`;
    state[key] = payload.value;
    return state;
  }),
  on(addTest, (state, { payload }) => {
    const key = `${payload.id}`;
    state[key] = payload.value;
    return state;
  })
);

export function reducer(state: State<any> | undefined, action: Action) {
  return valueReducer(state, action);
}