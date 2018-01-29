import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThcssondongSharedModule } from '../../shared';
import {
    ClassSchoolMySuffixService,
    ClassSchoolMySuffixPopupService,
    ClassSchoolMySuffixComponent,
    ClassSchoolMySuffixDetailComponent,
    ClassSchoolMySuffixDialogComponent,
    ClassSchoolMySuffixPopupComponent,
    ClassSchoolMySuffixDeletePopupComponent,
    ClassSchoolMySuffixDeleteDialogComponent,
    classSchoolRoute,
    classSchoolPopupRoute,
} from './';

const ENTITY_STATES = [
    ...classSchoolRoute,
    ...classSchoolPopupRoute,
];

@NgModule({
    imports: [
        ThcssondongSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ClassSchoolMySuffixComponent,
        ClassSchoolMySuffixDetailComponent,
        ClassSchoolMySuffixDialogComponent,
        ClassSchoolMySuffixDeleteDialogComponent,
        ClassSchoolMySuffixPopupComponent,
        ClassSchoolMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ClassSchoolMySuffixComponent,
        ClassSchoolMySuffixDialogComponent,
        ClassSchoolMySuffixPopupComponent,
        ClassSchoolMySuffixDeleteDialogComponent,
        ClassSchoolMySuffixDeletePopupComponent,
    ],
    providers: [
        ClassSchoolMySuffixService,
        ClassSchoolMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ThcssondongClassSchoolMySuffixModule {}
