import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { WeekMySuffix } from './week-my-suffix.model';
import { WeekMySuffixPopupService } from './week-my-suffix-popup.service';
import { WeekMySuffixService } from './week-my-suffix.service';
import { SemesterMySuffix, SemesterMySuffixService } from '../semester-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-week-my-suffix-dialog',
    templateUrl: './week-my-suffix-dialog.component.html'
})
export class WeekMySuffixDialogComponent implements OnInit {

    week: WeekMySuffix;
    isSaving: boolean;

    semesters: SemesterMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private weekService: WeekMySuffixService,
        private semesterService: SemesterMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.semesterService.query()
            .subscribe((res: ResponseWrapper) => { this.semesters = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.week.id !== undefined) {
            this.subscribeToSaveResponse(
                this.weekService.update(this.week));
        } else {
            this.subscribeToSaveResponse(
                this.weekService.create(this.week));
        }
    }

    private subscribeToSaveResponse(result: Observable<WeekMySuffix>) {
        result.subscribe((res: WeekMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: WeekMySuffix) {
        this.eventManager.broadcast({ name: 'weekListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSemesterById(index: number, item: SemesterMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-week-my-suffix-popup',
    template: ''
})
export class WeekMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private weekPopupService: WeekMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.weekPopupService
                    .open(WeekMySuffixDialogComponent as Component, params['id']);
            } else {
                this.weekPopupService
                    .open(WeekMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
