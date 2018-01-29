/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ThcssondongTestModule } from '../../../test.module';
import { SemesterMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/semester-my-suffix/semester-my-suffix-detail.component';
import { SemesterMySuffixService } from '../../../../../../main/webapp/app/entities/semester-my-suffix/semester-my-suffix.service';
import { SemesterMySuffix } from '../../../../../../main/webapp/app/entities/semester-my-suffix/semester-my-suffix.model';

describe('Component Tests', () => {

    describe('SemesterMySuffix Management Detail Component', () => {
        let comp: SemesterMySuffixDetailComponent;
        let fixture: ComponentFixture<SemesterMySuffixDetailComponent>;
        let service: SemesterMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThcssondongTestModule],
                declarations: [SemesterMySuffixDetailComponent],
                providers: [
                    SemesterMySuffixService
                ]
            })
            .overrideTemplate(SemesterMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SemesterMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SemesterMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new SemesterMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.semester).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
