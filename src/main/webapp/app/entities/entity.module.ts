import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ThcssondongSchoolMySuffixModule } from './school-my-suffix/school-my-suffix.module';
import { ThcssondongTeacherMySuffixModule } from './teacher-my-suffix/teacher-my-suffix.module';
import { ThcssondongSemesterMySuffixModule } from './semester-my-suffix/semester-my-suffix.module';
import { ThcssondongWeekMySuffixModule } from './week-my-suffix/week-my-suffix.module';
import { ThcssondongSubjectMySuffixModule } from './subject-my-suffix/subject-my-suffix.module';
import { ThcssondongLessonMySuffixModule } from './lesson-my-suffix/lesson-my-suffix.module';
import { ThcssondongRoomMySuffixModule } from './room-my-suffix/room-my-suffix.module';
import { ThcssondongClassSchoolMySuffixModule } from './class-school-my-suffix/class-school-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ThcssondongSchoolMySuffixModule,
        ThcssondongTeacherMySuffixModule,
        ThcssondongSemesterMySuffixModule,
        ThcssondongWeekMySuffixModule,
        ThcssondongSubjectMySuffixModule,
        ThcssondongLessonMySuffixModule,
        ThcssondongRoomMySuffixModule,
        ThcssondongClassSchoolMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ThcssondongEntityModule {}
