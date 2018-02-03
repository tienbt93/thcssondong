import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { LessonMySuffix } from './lesson-my-suffix.model';
import { LessonMySuffixService } from './lesson-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { SemesterMySuffix, SemesterMySuffixService } from '../semester-my-suffix';
import { WeekMySuffix, WeekMySuffixService } from '../week-my-suffix';

@Component({
    selector: 'jhi-lesson-my-teacher-suffix',
    // selector: 'lesson-my-teacher-suffix.component',
    templateUrl: './lesson-my-teacher-suffix.component.html'
})
export class LessonMyTeacherSuffixComponent implements OnInit, OnDestroy {
    currentAccount: any;
    lessons: LessonMySuffix[];
    mapLesson: number[][];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    semesters: SemesterMySuffix[];
    weeks: WeekMySuffix[];
    dateOfWeek = ['Thứ Hai' , 'Thứ Ba' , 'Thứ Tư' , 'Thứ Năm' , 'Thứ Sáu' , 'Thứ Bảy' , 'Chủ Nhật'];
    constructor(
        private lessonService: LessonMySuffixService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private weekService: WeekMySuffixService,
        private semesterService: SemesterMySuffixService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        this.lessonService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
            );
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }
    transition() {
        this.router.navigate(['/lesson-my-teacher-suffix'], {
            queryParams:
                {
                    page: this.page,
                    size: this.itemsPerPage,
                    sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
                }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate(['/lesson-my-suffix', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }
    ngOnInit() {
        this.semesterService.queryCurrent({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sortId()
        }).subscribe((res: ResponseWrapper) => { this.semesters = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        // this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLessons();
    }
    onChangeSemester(newValue) {
        console.log(newValue);
        this.weekService.queryBySemesterId(newValue)
            .subscribe((res: ResponseWrapper) => { this.weeks = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }
    onChangeWeek(weekId) {
        console.log(weekId);
        this.lessonService.queryByWeekIdForTeacher(weekId).subscribe(
            (res: ResponseWrapper) => { this.lessons = res.json; },
            (res: ResponseWrapper) => this.onError(res.json)
            );
    }
    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: LessonMySuffix) {
        return item.id;
    }
    registerChangeInLessons() {
        this.eventSubscriber = this.eventManager.subscribe('lessonListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    sortId() {
        const result = ['startDate' + ',' + 'desc'];
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.lessons = data.listLesson;
        this.mapLesson = data.mapLesson;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
