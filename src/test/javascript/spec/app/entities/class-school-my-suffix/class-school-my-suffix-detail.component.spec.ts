/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ThcssondongTestModule } from '../../../test.module';
import { ClassSchoolMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/class-school-my-suffix/class-school-my-suffix-detail.component';
import { ClassSchoolMySuffixService } from '../../../../../../main/webapp/app/entities/class-school-my-suffix/class-school-my-suffix.service';
import { ClassSchoolMySuffix } from '../../../../../../main/webapp/app/entities/class-school-my-suffix/class-school-my-suffix.model';

describe('Component Tests', () => {

    describe('ClassSchoolMySuffix Management Detail Component', () => {
        let comp: ClassSchoolMySuffixDetailComponent;
        let fixture: ComponentFixture<ClassSchoolMySuffixDetailComponent>;
        let service: ClassSchoolMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThcssondongTestModule],
                declarations: [ClassSchoolMySuffixDetailComponent],
                providers: [
                    ClassSchoolMySuffixService
                ]
            })
            .overrideTemplate(ClassSchoolMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClassSchoolMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClassSchoolMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ClassSchoolMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.classSchool).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
