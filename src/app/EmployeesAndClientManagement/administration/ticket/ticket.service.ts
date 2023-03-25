import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { selectorsType } from '../clients/clients.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

    constructor() {}
    private store = new BehaviorSubject<StoreInterface>({
        replayTicket: {data: [], isOpen: false },
    });

    store$: Observable<StoreInterface> = this.store.asObservable();
    get dataStore() {
        return this.store.value;
    }
    updateStore(newSate: StoreInterface) {
        this.store.next({
            ...this.store.value,
            ...newSate,
        });
    }

    Selector$(selectorName: selectorsProjectsType) {
        return this.store$.pipe(
            map((value: any) => value[selectorName]),
            distinctUntilChanged()
        );
    }

    displayDialogs = (DialogName: string, isOpen: boolean, data?: any) => {
        let dialog = {
            [DialogName]: {
                isOpen: isOpen,
                data: data,
            },
        };
        this.updateStore(dialog);
    };

  getAll(): any[] {
    return [
        {
            id: 1,
            Subject: 'انشاء مجمع تجاري',
            Message: 'هذا النص هو مثال لنص يمكن أن يستبدل ...',
            Phone: '0598888888',
            Date: '22/2/2023',
            Status:'تم الرد',
            EmpReplay: 'محمد خالد',
            Section: 'التصميم الداخلي',
        },
        {
            id: 2,
            Subject: 'ترميم بيت قديم',
            Message: 'هذا النص يمكن أن يتم تركيبه ع تصميم دون مشكلة...',
            Phone: '01254662525',
            Date: '20/1/2023',
            Status:'لم يتم الرد',
            EmpReplay: 'عبدالله احمد',
            Section: 'التصميم الخارجي',
        },
        {
            id: 3,
            Subject: 'تصميم خارطة فيلا',
            Message: 'إذا كنت أخطاء لغوية، مولد النص  مفيد لمصممي ... ',
            Phone: '036548524',
            Date: '10/2/2023',
            Status:'تم الرد',
            EmpReplay: 'ماجد خليل',
            Section: 'قسم الانشائي',
        },
        {
            id: 4,
            Subject: 'تصميم مسبج صغير',
            Message: 'هذا النص يمكن أن يتم تركيبه على أي تصميم   ... ',
            Phone: '036548524',
            Date: '10/2/2023',
            Status:'لم يتم الرد',
            EmpReplay: 'ابراهيم محمد ',
            Section: 'قسم المعماري',
        },
        {
            id: 5,
            Subject: 'بناء صالة افراح',
            Message: 'ومن هنا وجب على المصمم أن يضع  عناء البحث...',
            Phone: '0362598544',
            Date: '10/1/2023',
            Status:'تم الرد',
            EmpReplay: 'عبدالرحمن خليل',
            Section: 'قسم المساحة',
        },




    ];
}

}

export interface StoreInterface {
    replayTicket?: { data: any; isOpen: boolean };
}
export type selectorsProjectsType = keyof StoreInterface;

