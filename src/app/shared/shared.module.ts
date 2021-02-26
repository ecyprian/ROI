import { NgModule, ModuleWithProviders } from '@angular/core';
import { DialogModelComponent } from './dialogModel/dialogModel.component';
// import { MessageModelComponent } from './message-model/message-model.component';
import { LoaderComponent } from './Loader/loader.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material';


@NgModule({
    imports: [
        CommonModule, MatProgressSpinnerModule, MatProgressBarModule,MatDialogModule
    ],
    declarations: [DialogModelComponent,  LoaderComponent],
    exports: [CommonModule, DialogModelComponent,  LoaderComponent, MatProgressSpinnerModule, MatDialogModule]
})
export class SharedModule {


}



