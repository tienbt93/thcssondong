import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ClassSchoolMySuffix } from './class-school-my-suffix.model';
import { ClassSchoolMySuffixService } from './class-school-my-suffix.service';

@Component({
    selector: 'jhi-class-school-my-suffix-detail',
    templateUrl: './class-school-my-suffix-detail.component.html'
})
export class ClassSchoolMySuffixDetailComponent implements OnInit, OnDestroy {

    classSchool: ClassSchoolMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private classSchoolService: ClassSchoolMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInClassSchools();
    }

    load(id) {
        this.classSchoolService.find(id).subscribe((classSchool) => {
            this.classSchool = classSchool;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInClassSchools() {
        this.eventSubscriber = this.eventManager.subscribe(
            'classSchoolListModification',
            (response) => this.load(this.classSchool.id)
        );
    }
}
