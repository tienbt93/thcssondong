import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { WeekMySuffixComponent } from './week-my-suffix.component';
import { WeekMySuffixDetailComponent } from './week-my-suffix-detail.component';
import { WeekMySuffixPopupComponent } from './week-my-suffix-dialog.component';
import { WeekMySuffixDeletePopupComponent } from './week-my-suffix-delete-dialog.component';

@Injectable()
export class WeekMySuffixResolvePagingParams implements Resolve<any> {

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

export const weekRoute: Routes = [
    {
        path: 'week-my-suffix',
        component: WeekMySuffixComponent,
        resolve: {
            'pagingParams': WeekMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.week.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'week-my-suffix/:id',
        component: WeekMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.week.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const weekPopupRoute: Routes = [
    {
        path: 'week-my-suffix-new',
        component: WeekMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.week.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'week-my-suffix/:id/edit',
        component: WeekMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.week.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'week-my-suffix/:id/delete',
        component: WeekMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.week.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
