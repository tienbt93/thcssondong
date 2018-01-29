/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ThcssondongTestModule } from '../../../test.module';
import { LessonMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/lesson-my-suffix/lesson-my-suffix-delete-dialog.component';
import { LessonMySuffixService } from '../../../../../../main/webapp/app/entities/lesson-my-suffix/lesson-my-suffix.service';

describe('Component Tests', () => {

    describe('LessonMySuffix Management Delete Component', () => {
        let comp: LessonMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<LessonMySuffixDeleteDialogComponent>;
        let service: LessonMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThcssondongTestModule],
                declarations: [LessonMySuffixDeleteDialogComponent],
                providers: [
                    LessonMySuffixService
                ]
            })
            .overrideTemplate(LessonMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LessonMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LessonMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
