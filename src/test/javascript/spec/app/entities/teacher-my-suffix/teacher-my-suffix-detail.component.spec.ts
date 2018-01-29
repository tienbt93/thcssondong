/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ThcssondongTestModule } from '../../../test.module';
import { TeacherMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/teacher-my-suffix/teacher-my-suffix-detail.component';
import { TeacherMySuffixService } from '../../../../../../main/webapp/app/entities/teacher-my-suffix/teacher-my-suffix.service';
import { TeacherMySuffix } from '../../../../../../main/webapp/app/entities/teacher-my-suffix/teacher-my-suffix.model';

describe('Component Tests', () => {

    describe('TeacherMySuffix Management Detail Component', () => {
        let comp: TeacherMySuffixDetailComponent;
        let fixture: ComponentFixture<TeacherMySuffixDetailComponent>;
        let service: TeacherMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThcssondongTestModule],
                declarations: [TeacherMySuffixDetailComponent],
                providers: [
                    TeacherMySuffixService
                ]
            })
            .overrideTemplate(TeacherMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TeacherMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeacherMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TeacherMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.teacher).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
