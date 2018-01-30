import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LessonMySuffix } from './lesson-my-suffix.model';
import { LessonMySuffixPopupService } from './lesson-my-suffix-popup.service';
import { LessonMySuffixService } from './lesson-my-suffix.service';
import { TeacherMySuffix, TeacherMySuffixService } from '../teacher-my-suffix';
import { WeekMySuffix, WeekMySuffixService } from '../week-my-suffix';
import { SubjectMySuffix, SubjectMySuffixService } from '../subject-my-suffix';
import { RoomMySuffix, RoomMySuffixService } from '../room-my-suffix';
import { ClassSchoolMySuffix, ClassSchoolMySuffixService } from '../class-school-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-lesson-my-suffix-dialog',
    templateUrl: './lesson-my-suffix-dialog.component.html'
})
export class LessonMySuffixDialogComponent implements OnInit {

    lesson: LessonMySuffix;
    isSaving: boolean;

    teachers: TeacherMySuffix[];

    weeks: WeekMySuffix[];

    subjects: SubjectMySuffix[];

    rooms: RoomMySuffix[];

    classschools: ClassSchoolMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private lessonService: LessonMySuffixService,
        private teacherService: TeacherMySuffixService,
        private weekService: WeekMySuffixService,
        private subjectService: SubjectMySuffixService,
        private roomService: RoomMySuffixService,
        private classSchoolService: ClassSchoolMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.teacherService.query()
            .subscribe((res: ResponseWrapper) => { this.teachers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.weekService.query()
            .subscribe((res: ResponseWrapper) => { this.weeks = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.subjectService.query()
            .subscribe((res: ResponseWrapper) => { this.subjects = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.roomService.query()
            .subscribe((res: ResponseWrapper) => { this.rooms = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.classSchoolService.query()
            .subscribe((res: ResponseWrapper) => { this.classschools = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.lesson.id !== undefined) {
            this.subscribeToSaveResponse(
                this.lessonService.update(this.lesson));
        } else {
            this.subscribeToSaveResponse(
                this.lessonService.create(this.lesson));
        }
    }

    private subscribeToSaveResponse(result: Observable<LessonMySuffix>) {
        result.subscribe((res: LessonMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: LessonMySuffix) {
        this.eventManager.broadcast({ name: 'lessonListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTeacherById(index: number, item: TeacherMySuffix) {
        return item.id;
    }

    trackWeekById(index: number, item: WeekMySuffix) {
        return item.id;
    }

    trackSubjectById(index: number, item: SubjectMySuffix) {
        return item.id;
    }

    trackRoomById(index: number, item: RoomMySuffix) {
        return item.id;
    }

    trackClassSchoolById(index: number, item: ClassSchoolMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-lesson-my-suffix-popup',
    template: ''
})
export class LessonMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lessonPopupService: LessonMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.lessonPopupService
                    .open(LessonMySuffixDialogComponent as Component, params['id']);
            } else {
                this.lessonPopupService
                    .open(LessonMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
