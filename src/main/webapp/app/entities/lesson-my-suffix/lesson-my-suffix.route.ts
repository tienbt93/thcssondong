import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { LessonMySuffixComponent } from './lesson-my-suffix.component';
import { LessonMyTeacherSuffixComponent } from './lesson-my-teacher-suffix.component';
import { LessonMySuffixDetailComponent } from './lesson-my-suffix-detail.component';
import { LessonMySuffixPopupComponent } from './lesson-my-suffix-dialog.component';
import { LessonMySuffixDeletePopupComponent } from './lesson-my-suffix-delete-dialog.component';

@Injectable()
export class LessonMySuffixResolvePagingParams implements Resolve<any> {

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

export const lessonRoute: Routes = [
    {
        path: 'lesson-my-suffix',
        component: LessonMySuffixComponent,
        resolve: {
            'pagingParams': LessonMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.lesson.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'lesson-my-teacher-suffix',
        component: LessonMyTeacherSuffixComponent,
        resolve: {
            'pagingParams': LessonMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.lesson.home.title-teacher'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'lesson-my-suffix/:id',
        component: LessonMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.lesson.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const lessonPopupRoute: Routes = [
    {
        path: 'lesson-my-suffix-new',
        component: LessonMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.lesson.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lesson-my-suffix/:id/edit',
        component: LessonMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.lesson.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lesson-my-suffix/:id/delete',
        component: LessonMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.lesson.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
