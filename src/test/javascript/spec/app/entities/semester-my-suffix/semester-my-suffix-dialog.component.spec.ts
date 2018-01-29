/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ThcssondongTestModule } from '../../../test.module';
import { SemesterMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/semester-my-suffix/semester-my-suffix-dialog.component';
import { SemesterMySuffixService } from '../../../../../../main/webapp/app/entities/semester-my-suffix/semester-my-suffix.service';
import { SemesterMySuffix } from '../../../../../../main/webapp/app/entities/semester-my-suffix/semester-my-suffix.model';

describe('Component Tests', () => {

    describe('SemesterMySuffix Management Dialog Component', () => {
        let comp: SemesterMySuffixDialogComponent;
        let fixture: ComponentFixture<SemesterMySuffixDialogComponent>;
        let service: SemesterMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThcssondongTestModule],
                declarations: [SemesterMySuffixDialogComponent],
                providers: [
                    SemesterMySuffixService
                ]
            })
            .overrideTemplate(SemesterMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SemesterMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SemesterMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SemesterMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.semester = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'semesterListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SemesterMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.semester = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'semesterListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
