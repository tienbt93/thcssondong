import { BaseEntity } from './../../shared';

export const enum Active {
    'DEACTIVE',
    'ACTIVE'
}

export class WeekMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public weekName?: string,
        public isActive?: Active,
        public semesterId?: number,
        public lessons?: BaseEntity[],
    ) {
    }
}
