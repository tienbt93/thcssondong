import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TeacherMySuffix } from './teacher-my-suffix.model';
import { TeacherMySuffixPopupService } from './teacher-my-suffix-popup.service';
import { TeacherMySuffixService } from './teacher-my-suffix.service';
import { SchoolMySuffix, SchoolMySuffixService } from '../school-my-suffix';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-teacher-my-suffix-dialog',
    templateUrl: './teacher-my-suffix-dialog.component.html'
})
export class TeacherMySuffixDialogComponent implements OnInit {

    teacher: TeacherMySuffix;
    isSaving: boolean;

    schools: SchoolMySuffix[];

    users: User[];
    hireDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private teacherService: TeacherMySuffixService,
        private schoolService: SchoolMySuffixService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.schoolService.query()
            .subscribe((res: ResponseWrapper) => { this.schools = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.teacher.id !== undefined) {
            this.subscribeToSaveResponse(
                this.teacherService.update(this.teacher));
        } else {
            this.subscribeToSaveResponse(
                this.teacherService.create(this.teacher));
        }
    }

    private subscribeToSaveResponse(result: Observable<TeacherMySuffix>) {
        result.subscribe((res: TeacherMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TeacherMySuffix) {
        this.eventManager.broadcast({ name: 'teacherListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSchoolById(index: number, item: SchoolMySuffix) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-teacher-my-suffix-popup',
    template: ''
})
export class TeacherMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private teacherPopupService: TeacherMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.teacherPopupService
                    .open(TeacherMySuffixDialogComponent as Component, params['id']);
            } else {
                this.teacherPopupService
                    .open(TeacherMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
