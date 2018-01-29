import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ClassSchoolMySuffix } from './class-school-my-suffix.model';
import { ClassSchoolMySuffixService } from './class-school-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-class-school-my-suffix',
    templateUrl: './class-school-my-suffix.component.html'
})
export class ClassSchoolMySuffixComponent implements OnInit, OnDestroy {
classSchools: ClassSchoolMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private classSchoolService: ClassSchoolMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.classSchoolService.query().subscribe(
            (res: ResponseWrapper) => {
                this.classSchools = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInClassSchools();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ClassSchoolMySuffix) {
        return item.id;
    }
    registerChangeInClassSchools() {
        this.eventSubscriber = this.eventManager.subscribe('classSchoolListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
