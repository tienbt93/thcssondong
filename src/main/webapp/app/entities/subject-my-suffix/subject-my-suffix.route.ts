import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SubjectMySuffixComponent } from './subject-my-suffix.component';
import { SubjectMySuffixDetailComponent } from './subject-my-suffix-detail.component';
import { SubjectMySuffixPopupComponent } from './subject-my-suffix-dialog.component';
import { SubjectMySuffixDeletePopupComponent } from './subject-my-suffix-delete-dialog.component';

@Injectable()
export class SubjectMySuffixResolvePagingParams implements Resolve<any> {

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

export const subjectRoute: Routes = [
    {
        path: 'subject-my-suffix',
        component: SubjectMySuffixComponent,
        resolve: {
            'pagingParams': SubjectMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.subject.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'subject-my-suffix/:id',
        component: SubjectMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.subject.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subjectPopupRoute: Routes = [
    {
        path: 'subject-my-suffix-new',
        component: SubjectMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.subject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'subject-my-suffix/:id/edit',
        component: SubjectMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.subject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'subject-my-suffix/:id/delete',
        component: SubjectMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.subject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
