import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { WeekMySuffix } from './week-my-suffix.model';
import { WeekMySuffixPopupService } from './week-my-suffix-popup.service';
import { WeekMySuffixService } from './week-my-suffix.service';

@Component({
    selector: 'jhi-week-my-suffix-delete-dialog',
    templateUrl: './week-my-suffix-delete-dialog.component.html'
})
export class WeekMySuffixDeleteDialogComponent {

    week: WeekMySuffix;

    constructor(
        private weekService: WeekMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.weekService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'weekListModification',
                content: 'Deleted an week'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-week-my-suffix-delete-popup',
    template: ''
})
export class WeekMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private weekPopupService: WeekMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.weekPopupService
                .open(WeekMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
