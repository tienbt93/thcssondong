import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThcssondongSharedModule } from '../../shared';
import {
    LessonMySuffixService,
    LessonMySuffixPopupService,
    LessonMySuffixComponent,
    LessonMyTeacherSuffixComponent,
    LessonMySuffixDetailComponent,
    LessonMySuffixDialogComponent,
    LessonMySuffixPopupComponent,
    LessonMySuffixDeletePopupComponent,
    LessonMySuffixDeleteDialogComponent,
    lessonRoute,
    lessonPopupRoute,
    LessonMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...lessonRoute,
    ...lessonPopupRoute,
];

@NgModule({
    imports: [
        ThcssondongSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LessonMySuffixComponent,
        LessonMyTeacherSuffixComponent,
        LessonMySuffixDetailComponent,
        LessonMySuffixDialogComponent,
        LessonMySuffixDeleteDialogComponent,
        LessonMySuffixPopupComponent,
        LessonMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        LessonMySuffixComponent,
        LessonMyTeacherSuffixComponent,
        LessonMySuffixDialogComponent,
        LessonMySuffixPopupComponent,
        LessonMySuffixDeleteDialogComponent,
        LessonMySuffixDeletePopupComponent,
    ],
    providers: [
        LessonMySuffixService,
        LessonMySuffixPopupService,
        LessonMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ThcssondongLessonMySuffixModule {}
