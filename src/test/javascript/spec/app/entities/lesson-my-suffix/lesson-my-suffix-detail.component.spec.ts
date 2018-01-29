/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ThcssondongTestModule } from '../../../test.module';
import { LessonMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/lesson-my-suffix/lesson-my-suffix-detail.component';
import { LessonMySuffixService } from '../../../../../../main/webapp/app/entities/lesson-my-suffix/lesson-my-suffix.service';
import { LessonMySuffix } from '../../../../../../main/webapp/app/entities/lesson-my-suffix/lesson-my-suffix.model';

describe('Component Tests', () => {

    describe('LessonMySuffix Management Detail Component', () => {
        let comp: LessonMySuffixDetailComponent;
        let fixture: ComponentFixture<LessonMySuffixDetailComponent>;
        let service: LessonMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThcssondongTestModule],
                declarations: [LessonMySuffixDetailComponent],
                providers: [
                    LessonMySuffixService
                ]
            })
            .overrideTemplate(LessonMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LessonMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LessonMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new LessonMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.lesson).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
