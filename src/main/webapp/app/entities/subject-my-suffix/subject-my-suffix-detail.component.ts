import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SubjectMySuffix } from './subject-my-suffix.model';
import { SubjectMySuffixService } from './subject-my-suffix.service';

@Component({
    selector: 'jhi-subject-my-suffix-detail',
    templateUrl: './subject-my-suffix-detail.component.html'
})
export class SubjectMySuffixDetailComponent implements OnInit, OnDestroy {

    subject: SubjectMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private subjectService: SubjectMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSubjects();
    }

    load(id) {
        this.subjectService.find(id).subscribe((subject) => {
            this.subject = subject;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSubjects() {
        this.eventSubscriber = this.eventManager.subscribe(
            'subjectListModification',
            (response) => this.load(this.subject.id)
        );
    }
}
