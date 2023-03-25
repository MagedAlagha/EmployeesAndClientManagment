import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TicketService } from '../../ticket.service';

@Component({
    selector: 'app-replay-ticket-modal',
    templateUrl: './replay-ticket-modal.component.html',
    styleUrls: ['./replay-ticket-modal.component.scss'],
})
export class ReplayTicketModalComponent {
    data: any;
    replayForm: FormGroup;
    showData: boolean = true;
    title: any = 'إضافة  تزكرة';
    hideBtns: boolean = true;
    constructor(private _ticketService: TicketService, fb: FormBuilder) {
        this.replayForm = fb.group({
            Subject: [''],
            Message: [''],
            Replay: [''],
        });
    }
    sections: any[] = [
        { Name: 'خلل تقني', Code: 1 },
        { Name: 'استفسار ', Code: 2 },
        { Name: 'ملاحظات واستفسار ', Code: 3 },
    ];
    closeDialog() {
        this._ticketService.displayDialogs('replayTicket', false);
    }

    ngOnInit() {
        const data = this._ticketService.dataStore.replayTicket?.data;
        if (data) {
            console.log(data, 'data');
            this.replayForm.patchValue(data);
            this.replayForm.get('Subject')?.disable();
            this.replayForm.get('Message')?.disable();
            this.title = ` إضافة رد على تزكرة ( ${data.Subject} )`;

            /* Strat show Data Modal */
            if (data.showData) {
                console.log(data.showData, 'data.showData');
                this.showData = false;
                this.title = ` عرض بيانات تزكرة ( ${data.Subject} )`;
                this.hideBtns = false;
            } else {
                this.hideBtns = true;
            }
            /* End show Data Modal */
        }
    }
}
