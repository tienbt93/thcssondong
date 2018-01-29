/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ThcssondongTestModule } from '../../../test.module';
import { SemesterMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/semester-my-suffix/semester-my-suffix-delete-dialog.component';
import { SemesterMySuffixService } from '../../../../../../main/webapp/app/entities/semester-my-suffix/semester-my-suffix.service';

describe('Component Tests', () => {

    describe('SemesterMySuffix Management Delete Component', () => {
        let comp: SemesterMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<SemesterMySuffixDeleteDialogComponent>;
        let service: SemesterMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThcssondongTestModule],
                declarations: [SemesterMySuffixDeleteDialogComponent],
                providers: [
                    SemesterMySuffixService
                ]
            })
            .overrideTemplate(SemesterMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SemesterMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SemesterMySuffixService);
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
