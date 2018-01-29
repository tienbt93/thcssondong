/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ThcssondongTestModule } from '../../../test.module';
import { SchoolMySuffixComponent } from '../../../../../../main/webapp/app/entities/school-my-suffix/school-my-suffix.component';
import { SchoolMySuffixService } from '../../../../../../main/webapp/app/entities/school-my-suffix/school-my-suffix.service';
import { SchoolMySuffix } from '../../../../../../main/webapp/app/entities/school-my-suffix/school-my-suffix.model';

describe('Component Tests', () => {

    describe('SchoolMySuffix Management Component', () => {
        let comp: SchoolMySuffixComponent;
        let fixture: ComponentFixture<SchoolMySuffixComponent>;
        let service: SchoolMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThcssondongTestModule],
                declarations: [SchoolMySuffixComponent],
                providers: [
                    SchoolMySuffixService
                ]
            })
            .overrideTemplate(SchoolMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SchoolMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SchoolMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new SchoolMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.schools[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
