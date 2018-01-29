import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SemesterMySuffix } from './semester-my-suffix.model';
import { SemesterMySuffixPopupService } from './semester-my-suffix-popup.service';
import { SemesterMySuffixService } from './semester-my-suffix.service';

@Component({
    selector: 'jhi-semester-my-suffix-delete-dialog',
    templateUrl: './semester-my-suffix-delete-dialog.component.html'
})
export class SemesterMySuffixDeleteDialogComponent {

    semester: SemesterMySuffix;

    constructor(
        private semesterService: SemesterMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.semesterService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'semesterListModification',
                content: 'Deleted an semester'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-semester-my-suffix-delete-popup',
    template: ''
})
export class SemesterMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private semesterPopupService: SemesterMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.semesterPopupService
                .open(SemesterMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
