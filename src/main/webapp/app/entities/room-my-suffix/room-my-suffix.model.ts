import { BaseEntity } from './../../shared';

export const enum Active {
    'DEACTIVE',
    'ACTIVE'
}

export class RoomMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public roomName?: string,
        public description?: string,
        public isActive?: Active,
        public schoolId?: number,
        public schoolName?: string,
        public lessons?: BaseEntity[],
    ) {
    }
}
