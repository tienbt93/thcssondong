/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ThcssondongTestModule } from '../../../test.module';
import { LessonMySuffixComponent } from '../../../../../../main/webapp/app/entities/lesson-my-suffix/lesson-my-suffix.component';
import { LessonMySuffixService } from '../../../../../../main/webapp/app/entities/lesson-my-suffix/lesson-my-suffix.service';
import { LessonMySuffix } from '../../../../../../main/webapp/app/entities/lesson-my-suffix/lesson-my-suffix.model';

describe('Component Tests', () => {

    describe('LessonMySuffix Management Component', () => {
        let comp: LessonMySuffixComponent;
        let fixture: ComponentFixture<LessonMySuffixComponent>;
        let service: LessonMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThcssondongTestModule],
                declarations: [LessonMySuffixComponent],
                providers: [
                    LessonMySuffixService
                ]
            })
            .overrideTemplate(LessonMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LessonMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LessonMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new LessonMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.lessons[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
