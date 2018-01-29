/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ThcssondongTestModule } from '../../../test.module';
import { WeekMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/week-my-suffix/week-my-suffix-delete-dialog.component';
import { WeekMySuffixService } from '../../../../../../main/webapp/app/entities/week-my-suffix/week-my-suffix.service';

describe('Component Tests', () => {

    describe('WeekMySuffix Management Delete Component', () => {
        let comp: WeekMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<WeekMySuffixDeleteDialogComponent>;
        let service: WeekMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThcssondongTestModule],
                declarations: [WeekMySuffixDeleteDialogComponent],
                providers: [
                    WeekMySuffixService
                ]
            })
            .overrideTemplate(WeekMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WeekMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WeekMySuffixService);
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
