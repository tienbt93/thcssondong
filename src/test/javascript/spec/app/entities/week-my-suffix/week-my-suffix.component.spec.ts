/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ThcssondongTestModule } from '../../../test.module';
import { WeekMySuffixComponent } from '../../../../../../main/webapp/app/entities/week-my-suffix/week-my-suffix.component';
import { WeekMySuffixService } from '../../../../../../main/webapp/app/entities/week-my-suffix/week-my-suffix.service';
import { WeekMySuffix } from '../../../../../../main/webapp/app/entities/week-my-suffix/week-my-suffix.model';

describe('Component Tests', () => {

    describe('WeekMySuffix Management Component', () => {
        let comp: WeekMySuffixComponent;
        let fixture: ComponentFixture<WeekMySuffixComponent>;
        let service: WeekMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThcssondongTestModule],
                declarations: [WeekMySuffixComponent],
                providers: [
                    WeekMySuffixService
                ]
            })
            .overrideTemplate(WeekMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WeekMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WeekMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new WeekMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.weeks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
