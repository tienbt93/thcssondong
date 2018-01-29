import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { WeekMySuffix } from './week-my-suffix.model';
import { WeekMySuffixService } from './week-my-suffix.service';

@Component({
    selector: 'jhi-week-my-suffix-detail',
    templateUrl: './week-my-suffix-detail.component.html'
})
export class WeekMySuffixDetailComponent implements OnInit, OnDestroy {

    week: WeekMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private weekService: WeekMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInWeeks();
    }

    load(id) {
        this.weekService.find(id).subscribe((week) => {
            this.week = week;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInWeeks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'weekListModification',
            (response) => this.load(this.week.id)
        );
    }
}
