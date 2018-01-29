import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TeacherMySuffix } from './teacher-my-suffix.model';
import { TeacherMySuffixService } from './teacher-my-suffix.service';

@Component({
    selector: 'jhi-teacher-my-suffix-detail',
    templateUrl: './teacher-my-suffix-detail.component.html'
})
export class TeacherMySuffixDetailComponent implements OnInit, OnDestroy {

    teacher: TeacherMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private teacherService: TeacherMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTeachers();
    }

    load(id) {
        this.teacherService.find(id).subscribe((teacher) => {
            this.teacher = teacher;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTeachers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'teacherListModification',
            (response) => this.load(this.teacher.id)
        );
    }
}
