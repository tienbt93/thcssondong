import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThcssondongSharedModule } from '../../shared';
import {
    RoomMySuffixService,
    RoomMySuffixPopupService,
    RoomMySuffixComponent,
    RoomMySuffixDetailComponent,
    RoomMySuffixDialogComponent,
    RoomMySuffixPopupComponent,
    RoomMySuffixDeletePopupComponent,
    RoomMySuffixDeleteDialogComponent,
    roomRoute,
    roomPopupRoute,
    RoomMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...roomRoute,
    ...roomPopupRoute,
];

@NgModule({
    imports: [
        ThcssondongSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RoomMySuffixComponent,
        RoomMySuffixDetailComponent,
        RoomMySuffixDialogComponent,
        RoomMySuffixDeleteDialogComponent,
        RoomMySuffixPopupComponent,
        RoomMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        RoomMySuffixComponent,
        RoomMySuffixDialogComponent,
        RoomMySuffixPopupComponent,
        RoomMySuffixDeleteDialogComponent,
        RoomMySuffixDeletePopupComponent,
    ],
    providers: [
        RoomMySuffixService,
        RoomMySuffixPopupService,
        RoomMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ThcssondongRoomMySuffixModule {}
