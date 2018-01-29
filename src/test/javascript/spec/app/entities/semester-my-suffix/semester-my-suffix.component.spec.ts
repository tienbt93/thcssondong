/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ThcssondongTestModule } from '../../../test.module';
import { SemesterMySuffixComponent } from '../../../../../../main/webapp/app/entities/semester-my-suffix/semester-my-suffix.component';
import { SemesterMySuffixService } from '../../../../../../main/webapp/app/entities/semester-my-suffix/semester-my-suffix.service';
import { SemesterMySuffix } from '../../../../../../main/webapp/app/entities/semester-my-suffix/semester-my-suffix.model';

describe('Component Tests', () => {

    describe('SemesterMySuffix Management Component', () => {
        let comp: SemesterMySuffixComponent;
        let fixture: ComponentFixture<SemesterMySuffixComponent>;
        let service: SemesterMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThcssondongTestModule],
                declarations: [SemesterMySuffixComponent],
                providers: [
                    SemesterMySuffixService
                ]
            })
            .overrideTemplate(SemesterMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SemesterMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SemesterMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new SemesterMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.semesters[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
