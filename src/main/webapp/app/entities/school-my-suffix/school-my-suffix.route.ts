import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SchoolMySuffixComponent } from './school-my-suffix.component';
import { SchoolMySuffixDetailComponent } from './school-my-suffix-detail.component';
import { SchoolMySuffixPopupComponent } from './school-my-suffix-dialog.component';
import { SchoolMySuffixDeletePopupComponent } from './school-my-suffix-delete-dialog.component';

@Injectable()
export class SchoolMySuffixResolvePagingParams implements Resolve<any> {

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

export const schoolRoute: Routes = [
    {
        path: 'school-my-suffix',
        component: SchoolMySuffixComponent,
        resolve: {
            'pagingParams': SchoolMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.school.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'school-my-suffix/:id',
        component: SchoolMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.school.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const schoolPopupRoute: Routes = [
    {
        path: 'school-my-suffix-new',
        component: SchoolMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.school.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'school-my-suffix/:id/edit',
        component: SchoolMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.school.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'school-my-suffix/:id/delete',
        component: SchoolMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.school.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
