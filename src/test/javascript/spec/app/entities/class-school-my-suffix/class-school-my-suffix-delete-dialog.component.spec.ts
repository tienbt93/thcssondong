/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ThcssondongTestModule } from '../../../test.module';
import { ClassSchoolMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/class-school-my-suffix/class-school-my-suffix-delete-dialog.component';
import { ClassSchoolMySuffixService } from '../../../../../../main/webapp/app/entities/class-school-my-suffix/class-school-my-suffix.service';

describe('Component Tests', () => {

    describe('ClassSchoolMySuffix Management Delete Component', () => {
        let comp: ClassSchoolMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ClassSchoolMySuffixDeleteDialogComponent>;
        let service: ClassSchoolMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThcssondongTestModule],
                declarations: [ClassSchoolMySuffixDeleteDialogComponent],
                providers: [
                    ClassSchoolMySuffixService
                ]
            })
            .overrideTemplate(ClassSchoolMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClassSchoolMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClassSchoolMySuffixService);
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
