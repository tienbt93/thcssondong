import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ClassSchoolMySuffixComponent } from './class-school-my-suffix.component';
import { ClassSchoolMySuffixDetailComponent } from './class-school-my-suffix-detail.component';
import { ClassSchoolMySuffixPopupComponent } from './class-school-my-suffix-dialog.component';
import { ClassSchoolMySuffixDeletePopupComponent } from './class-school-my-suffix-delete-dialog.component';

export const classSchoolRoute: Routes = [
    {
        path: 'class-school-my-suffix',
        component: ClassSchoolMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.classSchool.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'class-school-my-suffix/:id',
        component: ClassSchoolMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.classSchool.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const classSchoolPopupRoute: Routes = [
    {
        path: 'class-school-my-suffix-new',
        component: ClassSchoolMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.classSchool.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'class-school-my-suffix/:id/edit',
        component: ClassSchoolMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.classSchool.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'class-school-my-suffix/:id/delete',
        component: ClassSchoolMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'thcssondongApp.classSchool.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
