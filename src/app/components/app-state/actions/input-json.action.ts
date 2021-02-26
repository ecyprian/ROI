import { createAction, props } from '@ngrx/store';
import { InputJsonModel } from 'src/app/components/app-state/models/input-json.model';
import { Update } from '@ngrx/entity';

export const setInputJsonAction = createAction(
    '[ReportType1Component] set input json data',
    props<{ inputJsonModel: InputJsonModel }>()
);
export const updateInputJsonAction = createAction(
    '[Setup Component] update input json data',
    props<{ inputJsonUpdateModel: Update<InputJsonModel> }>()
);
