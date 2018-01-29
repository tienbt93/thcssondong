import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SemesterMySuffixComponent } from './semester-my-suffix.component';
import { SemesterMySuffixDetailComponent } from './semester-my-suffix-detail.component';
import { SemesterMySuffixPopupComponent } from './semester-my-suffix-dialog.component';
import { SemesterMySuffixDeletePopupComponent } from './semester-my-suffix-delete-dialog.component';

@Injectable()
export class SemesterMySuffixResolvePagingParams implements Resolve<any> {

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

export const semesterRoute: Routes = [
    {
        path: 'semester-my-suffix',
        component: SemesterMySuffixComponent,
        resolve: {
            'pagingParams': SemesterMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.semester.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'semester-my-suffix/:id',
        component: SemesterMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.semester.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const semesterPopupRoute: Routes = [
    {
        path: 'semester-my-suffix-new',
        component: SemesterMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.semester.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'semester-my-suffix/:id/edit',
        component: SemesterMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.semester.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'semester-my-suffix/:id/delete',
        component: SemesterMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.semester.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
