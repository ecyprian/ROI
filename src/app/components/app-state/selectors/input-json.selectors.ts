import { JsonState } from '../reducers/input-json.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InputJsonAdapter } from '../entities/input-json.entity';

export const selectInputJsonState = createFeatureSelector<JsonState>("json");

export const { selectEntities: selectInputJsonEntities } = InputJsonAdapter.getSelectors();

export const getInputJsonState = createSelector(
    selectInputJsonState,
    state => state.inputJsonState
);

export const getAllInputJson = createSelector(
    getInputJsonState,
    selectInputJsonEntities
);
export const getInputJson = createSelector(
    getAllInputJson,
    inputJsonModel => inputJsonModel.inputJsonModel
);