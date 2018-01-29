import { BaseEntity } from './../../shared';

export const enum TrainTitle {
    'UNI',
    'COL'
}

export const enum Active {
    'DEACTIVE',
    'ACTIVE'
}

export class TeacherMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public phoneNumber?: string,
        public hireDate?: any,
        public salaryRate?: number,
        public title?: string,
        public trainTitle?: TrainTitle,
        public isActive?: Active,
        public schoolId?: number,
        public userId?: number,
        public lessons?: BaseEntity[],
    ) {
    }
}
