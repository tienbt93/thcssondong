import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ClassSchoolMySuffix } from './class-school-my-suffix.model';
import { ClassSchoolMySuffixPopupService } from './class-school-my-suffix-popup.service';
import { ClassSchoolMySuffixService } from './class-school-my-suffix.service';

@Component({
    selector: 'jhi-class-school-my-suffix-dialog',
    templateUrl: './class-school-my-suffix-dialog.component.html'
})
export class ClassSchoolMySuffixDialogComponent implements OnInit {

    classSchool: ClassSchoolMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private classSchoolService: ClassSchoolMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.classSchool.id !== undefined) {
            this.subscribeToSaveResponse(
                this.classSchoolService.update(this.classSchool));
        } else {
            this.subscribeToSaveResponse(
                this.classSchoolService.create(this.classSchool));
        }
    }

    private subscribeToSaveResponse(result: Observable<ClassSchoolMySuffix>) {
        result.subscribe((res: ClassSchoolMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ClassSchoolMySuffix) {
        this.eventManager.broadcast({ name: 'classSchoolListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-class-school-my-suffix-popup',
    template: ''
})
export class ClassSchoolMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private classSchoolPopupService: ClassSchoolMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.classSchoolPopupService
                    .open(ClassSchoolMySuffixDialogComponent as Component, params['id']);
            } else {
                this.classSchoolPopupService
                    .open(ClassSchoolMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
