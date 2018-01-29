import { BaseEntity } from './../../shared';

export const enum Active {
    'DEACTIVE',
    'ACTIVE'
}

export class SchoolMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public schoolNam?: string,
        public schoolAddress?: string,
        public phoneNumber?: string,
        public email?: string,
        public isActive?: Active,
        public teachers?: BaseEntity[],
        public rooms?: BaseEntity[],
    ) {
    }
}
