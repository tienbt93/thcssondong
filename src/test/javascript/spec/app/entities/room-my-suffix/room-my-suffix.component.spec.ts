/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ThcssondongTestModule } from '../../../test.module';
import { RoomMySuffixComponent } from '../../../../../../main/webapp/app/entities/room-my-suffix/room-my-suffix.component';
import { RoomMySuffixService } from '../../../../../../main/webapp/app/entities/room-my-suffix/room-my-suffix.service';
import { RoomMySuffix } from '../../../../../../main/webapp/app/entities/room-my-suffix/room-my-suffix.model';

describe('Component Tests', () => {

    describe('RoomMySuffix Management Component', () => {
        let comp: RoomMySuffixComponent;
        let fixture: ComponentFixture<RoomMySuffixComponent>;
        let service: RoomMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThcssondongTestModule],
                declarations: [RoomMySuffixComponent],
                providers: [
                    RoomMySuffixService
                ]
            })
            .overrideTemplate(RoomMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoomMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoomMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new RoomMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rooms[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
