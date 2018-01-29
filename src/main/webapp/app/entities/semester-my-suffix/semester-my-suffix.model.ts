import { BaseEntity } from './../../shared';

export const enum Active {
    'DEACTIVE',
    'ACTIVE'
}

export class SemesterMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public semesterName?: string,
        public startDate?: any,
        public endDate?: any,
        public totalWeek?: number,
        public isActive?: Active,
        public weeks?: BaseEntity[],
    ) {
    }
}
