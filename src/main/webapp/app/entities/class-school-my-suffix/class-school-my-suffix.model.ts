import { BaseEntity } from './../../shared';

export const enum Active {
    'DEACTIVE',
    'ACTIVE'
}

export class ClassSchoolMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public className?: string,
        public description?: string,
        public isActive?: Active,
        public lessons?: BaseEntity[],
    ) {
    }
}
