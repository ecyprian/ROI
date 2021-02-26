import { createAction, props } from '@ngrx/store';

export const addValue = createAction(
    '[Value] Add',
    props<{payload: {type: string, id: string,frequency:string, value: any}}>()
);
export const getValue = createAction(
    '[Value] Get',
    props<{payload: {type: string, id: string}}>()
);
export const addInfo = createAction(
    '[Info] Add',
    props<{payload: {id: string, value: string}}>()
);
export const addTest = createAction(
    '[Info] Add',
    props<{payload: {id: string ,value: string}}>()
);