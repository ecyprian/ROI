import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { InputJsonModel } from 'src/app/components/app-state/models/input-json.model';

export interface InputJsonState extends EntityState<InputJsonModel> {
}

export const InputJsonAdapter: EntityAdapter<InputJsonModel> = createEntityAdapter<InputJsonModel>({
    selectId: (inputJsonModel: InputJsonModel) => inputJsonModel.id ? inputJsonModel.id : 'inputJsonModel'
});

export const InputJsonInitialState: InputJsonState = InputJsonAdapter.getInitialState({
});
