import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThcssondongSharedModule } from '../../shared';
import {
    SemesterMySuffixService,
    SemesterMySuffixPopupService,
    SemesterMySuffixComponent,
    SemesterMySuffixDetailComponent,
    SemesterMySuffixDialogComponent,
    SemesterMySuffixPopupComponent,
    SemesterMySuffixDeletePopupComponent,
    SemesterMySuffixDeleteDialogComponent,
    semesterRoute,
    semesterPopupRoute,
    SemesterMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...semesterRoute,
    ...semesterPopupRoute,
];

@NgModule({
    imports: [
        ThcssondongSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SemesterMySuffixComponent,
        SemesterMySuffixDetailComponent,
        SemesterMySuffixDialogComponent,
        SemesterMySuffixDeleteDialogComponent,
        SemesterMySuffixPopupComponent,
        SemesterMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        SemesterMySuffixComponent,
        SemesterMySuffixDialogComponent,
        SemesterMySuffixPopupComponent,
        SemesterMySuffixDeleteDialogComponent,
        SemesterMySuffixDeletePopupComponent,
    ],
    providers: [
        SemesterMySuffixService,
        SemesterMySuffixPopupService,
        SemesterMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ThcssondongSemesterMySuffixModule {}
