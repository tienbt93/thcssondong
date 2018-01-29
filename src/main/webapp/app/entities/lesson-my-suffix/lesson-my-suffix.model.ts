import { BaseEntity } from './../../shared';

export const enum OrdinalNumber {
    'L1',
    'L2',
    'L3',
    'L4',
    'L5',
    'L6',
    'L7',
    'L8'
}

export const enum Active {
    'DEACTIVE',
    'ACTIVE'
}

export class LessonMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public ordinalNumber?: OrdinalNumber,
        public lessonTitle?: string,
        public isActive?: Active,
        public teacherId?: number,
        public weekId?: number,
        public subjectId?: number,
        public roomId?: number,
        public classSchoolId?: number,
    ) {
    }
}
