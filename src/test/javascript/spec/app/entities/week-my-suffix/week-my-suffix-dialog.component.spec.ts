/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ThcssondongTestModule } from '../../../test.module';
import { WeekMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/week-my-suffix/week-my-suffix-dialog.component';
import { WeekMySuffixService } from '../../../../../../main/webapp/app/entities/week-my-suffix/week-my-suffix.service';
import { WeekMySuffix } from '../../../../../../main/webapp/app/entities/week-my-suffix/week-my-suffix.model';
import { SemesterMySuffixService } from '../../../../../../main/webapp/app/entities/semester-my-suffix';

describe('Component Tests', () => {

    describe('WeekMySuffix Management Dialog Component', () => {
        let comp: WeekMySuffixDialogComponent;
        let fixture: ComponentFixture<WeekMySuffixDialogComponent>;
        let service: WeekMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThcssondongTestModule],
                declarations: [WeekMySuffixDialogComponent],
                providers: [
                    SemesterMySuffixService,
                    WeekMySuffixService
                ]
            })
            .overrideTemplate(WeekMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WeekMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WeekMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WeekMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.week = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'weekListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WeekMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.week = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'weekListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
