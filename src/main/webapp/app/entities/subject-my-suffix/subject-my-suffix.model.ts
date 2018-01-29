import { BaseEntity } from './../../shared';

export const enum Active {
    'DEACTIVE',
    'ACTIVE'
}

export class SubjectMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public subjectName?: string,
        public totalHours?: number,
        public isActive?: Active,
        public lessons?: BaseEntity[],
    ) {
    }
}
