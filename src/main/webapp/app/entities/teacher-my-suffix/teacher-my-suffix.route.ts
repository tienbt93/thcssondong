import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TeacherMySuffixComponent } from './teacher-my-suffix.component';
import { TeacherMySuffixDetailComponent } from './teacher-my-suffix-detail.component';
import { TeacherMySuffixPopupComponent } from './teacher-my-suffix-dialog.component';
import { TeacherMySuffixDeletePopupComponent } from './teacher-my-suffix-delete-dialog.component';

@Injectable()
export class TeacherMySuffixResolvePagingParams implements Resolve<any> {

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

export const teacherRoute: Routes = [
    {
        path: 'teacher-my-suffix',
        component: TeacherMySuffixComponent,
        resolve: {
            'pagingParams': TeacherMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.teacher.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'teacher-my-suffix/:id',
        component: TeacherMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.teacher.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const teacherPopupRoute: Routes = [
    {
        path: 'teacher-my-suffix-new',
        component: TeacherMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.teacher.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'teacher-my-suffix/:id/edit',
        component: TeacherMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.teacher.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'teacher-my-suffix/:id/delete',
        component: TeacherMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.teacher.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
