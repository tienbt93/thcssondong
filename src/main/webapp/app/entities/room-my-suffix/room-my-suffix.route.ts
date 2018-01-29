import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RoomMySuffixComponent } from './room-my-suffix.component';
import { RoomMySuffixDetailComponent } from './room-my-suffix-detail.component';
import { RoomMySuffixPopupComponent } from './room-my-suffix-dialog.component';
import { RoomMySuffixDeletePopupComponent } from './room-my-suffix-delete-dialog.component';

@Injectable()
export class RoomMySuffixResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const roomRoute: Routes = [
    {
        path: 'room-my-suffix',
        component: RoomMySuffixComponent,
        resolve: {
            'pagingParams': RoomMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.room.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'room-my-suffix/:id',
        component: RoomMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.room.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const roomPopupRoute: Routes = [
    {
        path: 'room-my-suffix-new',
        component: RoomMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.room.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'room-my-suffix/:id/edit',
        component: RoomMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.room.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'room-my-suffix/:id/delete',
        component: RoomMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.room.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
