import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { SemesterMySuffix } from './semester-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SemesterMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/semesters';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(semester: SemesterMySuffix): Observable<SemesterMySuffix> {
        const copy = this.convert(semester);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(semester: SemesterMySuffix): Observable<SemesterMySuffix> {
        const copy = this.convert(semester);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<SemesterMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }
    queryCurrent(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl + '/current', options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to SemesterMySuffix.
     */
    private convertItemFromServer(json: any): SemesterMySuffix {
        const entity: SemesterMySuffix = Object.assign(new SemesterMySuffix(), json);
        entity.startDate = this.dateUtils
            .convertLocalDateFromServer(json.startDate);
        entity.endDate = this.dateUtils
            .convertLocalDateFromServer(json.endDate);
        return entity;
    }

    /**
     * Convert a SemesterMySuffix to a JSON which can be sent to the server.
     */
    private convert(semester: SemesterMySuffix): SemesterMySuffix {
        const copy: SemesterMySuffix = Object.assign({}, semester);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(semester.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateToServer(semester.endDate);
        return copy;
    }
}
