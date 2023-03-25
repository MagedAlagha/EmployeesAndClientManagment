import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectsService } from './projects.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventService } from 'src/app/demo/service/event.service';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
    providers: [EventService],
})
export class ProjectsComponent implements OnInit {
    DisplayProjectsDialog$!: Observable<any>;
    tasksDialog$!: Observable<any>;
    attachedFilesDialog$!: Observable<any>;
    commentsDialog$!: Observable<any>;
    dataTable: any[] = [];
    showData: boolean = false;
    select = new FormControl();
    calendarOptions: any;
    viewType: string = 'Table';
    filterView: MenuItem[] = [
        {
            label: 'عرض كجدول',

            command: () => {
                this.viewType = 'Table';
            },
        },
        {
            label: 'عرض كاليندر',
            command: () => {
                this.viewType = 'Calender';
            },
        },
    ];
    activeStatus: any = this.filterView[0];
    get isClient() {
        return !!(localStorage.getItem('User') == 'Client');
    }
    constructor(
        private _ProjectsService: ProjectsService,
        private eventService: EventService
    ) {}
    ngOnInit() {
        this.dataTable = this._ProjectsService.getAll();
        this.DisplayProjectsDialog$ = this._ProjectsService.Selector$(
            'DisplayProjectsDialog'
        );
        this.tasksDialog$ = this._ProjectsService.Selector$('tasksDialog');
        this.attachedFilesDialog$ = this._ProjectsService.Selector$(
            'attachedFilesDialog'
        );
        this.commentsDialog$ =
            this._ProjectsService.Selector$('commentsDialog');

        this.calendarOptions = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            initialDate: '2023-02-25',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
            },
            buttonText: {
                today: 'اليوم',
                month: 'شهري',
                week: 'اسبوعي',
                day: 'يومي',
                list: 'قائمة',
            },
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            locale: 'ar',
        };
        this.eventService.getEvents().then((events) => {
            this.calendarOptions = {
                ...this.calendarOptions,
                ...{ events: events },
            };
        });
    }

    addFormDataDialog(item?: any) {
        this._ProjectsService.displayDialogs(
            'DisplayProjectsDialog',
            true,
            item
        );
    }
    showFormDataDialog(item?: any) {
        this._ProjectsService.displayDialogs('DisplayProjectsDialog', true, {
            ...item,
            showData: (this.showData = true),
        });
    }
}
