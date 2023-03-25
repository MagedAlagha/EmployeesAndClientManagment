import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectsService } from '../../projects.service';

@Component({
  selector: 'app-comments-modal',
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.scss']
})
export class CommentsModalComponent {
    commentsForm!:FormGroup;
    title:any;
    constructor(private _ProjectsService: ProjectsService  , private fb:FormBuilder) {
    this.commentsForm = fb.group({
        Notes:[''],
        Comments:['']
    })
    }
    closeDialog() {
        this._ProjectsService.displayDialogs('commentsDialog', false);
    }

    comments: any[]= [
        { Name:"عالية " , Code:1},
        { Name:"متوسطة " , Code:2},
        { Name:"منخفضة " , Code:3},
    ]
}
