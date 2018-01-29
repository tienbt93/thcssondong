import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SemesterMySuffix } from './semester-my-suffix.model';
import { SemesterMySuffixService } from './semester-my-suffix.service';

@Component({
    selector: 'jhi-semester-my-suffix-detail',
    templateUrl: './semester-my-suffix-detail.component.html'
})
export class SemesterMySuffixDetailComponent implements OnInit, OnDestroy {

    semester: SemesterMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private semesterService: SemesterMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSemesters();
    }

    load(id) {
        this.semesterService.find(id).subscribe((semester) => {
            this.semester = semester;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSemesters() {
        this.eventSubscriber = this.eventManager.subscribe(
            'semesterListModification',
            (response) => this.load(this.semester.id)
        );
    }
}
