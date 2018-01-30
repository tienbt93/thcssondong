import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { LessonMySuffix } from './lesson-my-suffix.model';
import { LessonMySuffixService } from './lesson-my-suffix.service';

@Component({
    selector: 'jhi-lesson-my-suffix-detail',
    templateUrl: './lesson-my-suffix-detail.component.html'
})
export class LessonMySuffixDetailComponent implements OnInit, OnDestroy {

    lesson: LessonMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private lessonService: LessonMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLessons();
    }

    load(id) {
        this.lessonService.find(id).subscribe((lesson) => {
            this.lesson = lesson;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLessons() {
        this.eventSubscriber = this.eventManager.subscribe(
            'lessonListModification',
            (response) => this.load(this.lesson.id)
        );
    }
}
