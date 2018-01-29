import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThcssondongSharedModule } from '../../shared';
import {
    SchoolMySuffixService,
    SchoolMySuffixPopupService,
    SchoolMySuffixComponent,
    SchoolMySuffixDetailComponent,
    SchoolMySuffixDialogComponent,
    SchoolMySuffixPopupComponent,
    SchoolMySuffixDeletePopupComponent,
    SchoolMySuffixDeleteDialogComponent,
    schoolRoute,
    schoolPopupRoute,
    SchoolMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...schoolRoute,
    ...schoolPopupRoute,
];

@NgModule({
    imports: [
        ThcssondongSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SchoolMySuffixComponent,
        SchoolMySuffixDetailComponent,
        SchoolMySuffixDialogComponent,
        SchoolMySuffixDeleteDialogComponent,
        SchoolMySuffixPopupComponent,
        SchoolMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        SchoolMySuffixComponent,
        SchoolMySuffixDialogComponent,
        SchoolMySuffixPopupComponent,
        SchoolMySuffixDeleteDialogComponent,
        SchoolMySuffixDeletePopupComponent,
    ],
    providers: [
        SchoolMySuffixService,
        SchoolMySuffixPopupService,
        SchoolMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ThcssondongSchoolMySuffixModule {}
