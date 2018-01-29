/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ThcssondongTestModule } from '../../../test.module';
import { ClassSchoolMySuffixComponent } from '../../../../../../main/webapp/app/entities/class-school-my-suffix/class-school-my-suffix.component';
import { ClassSchoolMySuffixService } from '../../../../../../main/webapp/app/entities/class-school-my-suffix/class-school-my-suffix.service';
import { ClassSchoolMySuffix } from '../../../../../../main/webapp/app/entities/class-school-my-suffix/class-school-my-suffix.model';

describe('Component Tests', () => {

    describe('ClassSchoolMySuffix Management Component', () => {
        let comp: ClassSchoolMySuffixComponent;
        let fixture: ComponentFixture<ClassSchoolMySuffixComponent>;
        let service: ClassSchoolMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThcssondongTestModule],
                declarations: [ClassSchoolMySuffixComponent],
                providers: [
                    ClassSchoolMySuffixService
                ]
            })
            .overrideTemplate(ClassSchoolMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClassSchoolMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClassSchoolMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ClassSchoolMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.classSchools[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
