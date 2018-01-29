/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ThcssondongTestModule } from '../../../test.module';
import { LessonMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/lesson-my-suffix/lesson-my-suffix-dialog.component';
import { LessonMySuffixService } from '../../../../../../main/webapp/app/entities/lesson-my-suffix/lesson-my-suffix.service';
import { LessonMySuffix } from '../../../../../../main/webapp/app/entities/lesson-my-suffix/lesson-my-suffix.model';
import { TeacherMySuffixService } from '../../../../../../main/webapp/app/entities/teacher-my-suffix';
import { WeekMySuffixService } from '../../../../../../main/webapp/app/entities/week-my-suffix';
import { SubjectMySuffixService } from '../../../../../../main/webapp/app/entities/subject-my-suffix';
import { RoomMySuffixService } from '../../../../../../main/webapp/app/entities/room-my-suffix';
import { ClassSchoolMySuffixService } from '../../../../../../main/webapp/app/entities/class-school-my-suffix';

describe('Component Tests', () => {

    describe('LessonMySuffix Management Dialog Component', () => {
        let comp: LessonMySuffixDialogComponent;
        let fixture: ComponentFixture<LessonMySuffixDialogComponent>;
        let service: LessonMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThcssondongTestModule],
                declarations: [LessonMySuffixDialogComponent],
                providers: [
                    TeacherMySuffixService,
                    WeekMySuffixService,
                    SubjectMySuffixService,
                    RoomMySuffixService,
                    ClassSchoolMySuffixService,
                    LessonMySuffixService
                ]
            })
            .overrideTemplate(LessonMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LessonMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LessonMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LessonMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.lesson = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'lessonListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LessonMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.lesson = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'lessonListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
