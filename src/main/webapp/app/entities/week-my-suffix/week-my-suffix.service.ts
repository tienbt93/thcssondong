import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { WeekMySuffix } from './week-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class WeekMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/weeks';

    constructor(private http: Http) { }

    create(week: WeekMySuffix): Observable<WeekMySuffix> {
        const copy = this.convert(week);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(week: WeekMySuffix): Observable<WeekMySuffix> {
        const copy = this.convert(week);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<WeekMySuffix> {
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
     * Convert a returned JSON object to WeekMySuffix.
     */
    private convertItemFromServer(json: any): WeekMySuffix {
        const entity: WeekMySuffix = Object.assign(new WeekMySuffix(), json);
        return entity;
    }

    /**
     * Convert a WeekMySuffix to a JSON which can be sent to the server.
     */
    private convert(week: WeekMySuffix): WeekMySuffix {
        const copy: WeekMySuffix = Object.assign({}, week);
        return copy;
    }
}
