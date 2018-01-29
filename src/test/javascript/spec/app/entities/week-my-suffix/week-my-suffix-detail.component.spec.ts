/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ThcssondongTestModule } from '../../../test.module';
import { WeekMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/week-my-suffix/week-my-suffix-detail.component';
import { WeekMySuffixService } from '../../../../../../main/webapp/app/entities/week-my-suffix/week-my-suffix.service';
import { WeekMySuffix } from '../../../../../../main/webapp/app/entities/week-my-suffix/week-my-suffix.model';

describe('Component Tests', () => {

    describe('WeekMySuffix Management Detail Component', () => {
        let comp: WeekMySuffixDetailComponent;
        let fixture: ComponentFixture<WeekMySuffixDetailComponent>;
        let service: WeekMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThcssondongTestModule],
                declarations: [WeekMySuffixDetailComponent],
                providers: [
                    WeekMySuffixService
                ]
            })
            .overrideTemplate(WeekMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WeekMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WeekMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new WeekMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.week).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
