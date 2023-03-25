import { ButtonComponentComponent } from 'src/app/shared/Module-shared/button-component/button-component.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluationComponent } from './evaluation.component';
import { RouterModule } from '@angular/router';
import {RatingModule} from 'primeng/rating';
import { TextAreaFieldComponent } from 'src/app/shared/Module-shared/text-area-field/text-area-field.component';



@NgModule({
  declarations: [
    EvaluationComponent
  ],
  imports: [
    CommonModule ,
    RatingModule,
    RouterModule.forChild([
        {
            path: '',
            component: EvaluationComponent,
        },
    ]),
    ButtonComponentComponent,
    TextAreaFieldComponent
  ]
})
export class EvaluationModule { }
