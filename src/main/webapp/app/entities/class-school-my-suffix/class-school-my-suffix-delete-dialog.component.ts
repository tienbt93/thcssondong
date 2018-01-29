import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ClassSchoolMySuffix } from './class-school-my-suffix.model';
import { ClassSchoolMySuffixPopupService } from './class-school-my-suffix-popup.service';
import { ClassSchoolMySuffixService } from './class-school-my-suffix.service';

@Component({
    selector: 'jhi-class-school-my-suffix-delete-dialog',
    templateUrl: './class-school-my-suffix-delete-dialog.component.html'
})
export class ClassSchoolMySuffixDeleteDialogComponent {

    classSchool: ClassSchoolMySuffix;

    constructor(
        private classSchoolService: ClassSchoolMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.classSchoolService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'classSchoolListModification',
                content: 'Deleted an classSchool'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-class-school-my-suffix-delete-popup',
    template: ''
})
export class ClassSchoolMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private classSchoolPopupService: ClassSchoolMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.classSchoolPopupService
                .open(ClassSchoolMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
