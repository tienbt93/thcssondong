import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThcssondongSharedModule } from '../../shared';
import {
    SubjectMySuffixService,
    SubjectMySuffixPopupService,
    SubjectMySuffixComponent,
    SubjectMySuffixDetailComponent,
    SubjectMySuffixDialogComponent,
    SubjectMySuffixPopupComponent,
    SubjectMySuffixDeletePopupComponent,
    SubjectMySuffixDeleteDialogComponent,
    subjectRoute,
    subjectPopupRoute,
    SubjectMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...subjectRoute,
    ...subjectPopupRoute,
];

@NgModule({
    imports: [
        ThcssondongSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SubjectMySuffixComponent,
        SubjectMySuffixDetailComponent,
        SubjectMySuffixDialogComponent,
        SubjectMySuffixDeleteDialogComponent,
        SubjectMySuffixPopupComponent,
        SubjectMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        SubjectMySuffixComponent,
        SubjectMySuffixDialogComponent,
        SubjectMySuffixPopupComponent,
        SubjectMySuffixDeleteDialogComponent,
        SubjectMySuffixDeletePopupComponent,
    ],
    providers: [
        SubjectMySuffixService,
        SubjectMySuffixPopupService,
        SubjectMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ThcssondongSubjectMySuffixModule {}
