import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThcssondongSharedModule } from '../../shared';
import {
    WeekMySuffixService,
    WeekMySuffixPopupService,
    WeekMySuffixComponent,
    WeekMySuffixDetailComponent,
    WeekMySuffixDialogComponent,
    WeekMySuffixPopupComponent,
    WeekMySuffixDeletePopupComponent,
    WeekMySuffixDeleteDialogComponent,
    weekRoute,
    weekPopupRoute,
    WeekMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...weekRoute,
    ...weekPopupRoute,
];

@NgModule({
    imports: [
        ThcssondongSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        WeekMySuffixComponent,
        WeekMySuffixDetailComponent,
        WeekMySuffixDialogComponent,
        WeekMySuffixDeleteDialogComponent,
        WeekMySuffixPopupComponent,
        WeekMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        WeekMySuffixComponent,
        WeekMySuffixDialogComponent,
        WeekMySuffixPopupComponent,
        WeekMySuffixDeleteDialogComponent,
        WeekMySuffixDeletePopupComponent,
    ],
    providers: [
        WeekMySuffixService,
        WeekMySuffixPopupService,
        WeekMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ThcssondongWeekMySuffixModule {}
