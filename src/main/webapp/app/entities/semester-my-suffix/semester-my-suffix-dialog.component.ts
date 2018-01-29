import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SemesterMySuffix } from './semester-my-suffix.model';
import { SemesterMySuffixPopupService } from './semester-my-suffix-popup.service';
import { SemesterMySuffixService } from './semester-my-suffix.service';

@Component({
    selector: 'jhi-semester-my-suffix-dialog',
    templateUrl: './semester-my-suffix-dialog.component.html'
})
export class SemesterMySuffixDialogComponent implements OnInit {

    semester: SemesterMySuffix;
    isSaving: boolean;
    startDateDp: any;
    endDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private semesterService: SemesterMySuffixService,
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
        if (this.semester.id !== undefined) {
            this.subscribeToSaveResponse(
                this.semesterService.update(this.semester));
        } else {
            this.subscribeToSaveResponse(
                this.semesterService.create(this.semester));
        }
    }

    private subscribeToSaveResponse(result: Observable<SemesterMySuffix>) {
        result.subscribe((res: SemesterMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SemesterMySuffix) {
        this.eventManager.broadcast({ name: 'semesterListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-semester-my-suffix-popup',
    template: ''
})
export class SemesterMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private semesterPopupService: SemesterMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.semesterPopupService
                    .open(SemesterMySuffixDialogComponent as Component, params['id']);
            } else {
                this.semesterPopupService
                    .open(SemesterMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
