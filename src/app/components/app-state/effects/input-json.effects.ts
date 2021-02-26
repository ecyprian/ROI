import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { updateInputJsonAction, setInputJsonAction } from '../actions/input-json.action';

@Injectable()
export class InputJsonEffects {
    constructor(private action$: Actions) { }

    inputJsonUpdate$ = createEffect(() =>
        this.action$.pipe(
            ofType(updateInputJsonAction),
            tap(action => { })
        ),
        { dispatch: false }
    );
    inputJsonSave$ = createEffect(() =>
        this.action$.pipe(
            ofType(setInputJsonAction),
            tap(action => { })
        ),
        { dispatch: false }
    );
}