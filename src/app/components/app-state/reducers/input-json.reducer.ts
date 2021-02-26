import { setInputJsonAction,updateInputJsonAction } from '../actions/input-json.action';
import { createReducer, on, Action, State } from '@ngrx/store';
import { InputJsonState, InputJsonInitialState, InputJsonAdapter } from '../entities/input-json.entity';

export interface JsonState {
    inputJsonState: InputJsonState
}
export const InitialJsonState: JsonState =
{
    inputJsonState: InputJsonInitialState
}

export const inputJsonReducer = createReducer(InitialJsonState,
    on(setInputJsonAction,
        (state, action) => ({
            ...state,
            inputJsonState: InputJsonAdapter.addOne(action.inputJsonModel, state.inputJsonState)
        })
    ),
    on(updateInputJsonAction,
        (state, action) => ({
            ...state,
            inputJsonState: InputJsonAdapter.updateOne(action.inputJsonUpdateModel, state.inputJsonState)
        })
    )
);
