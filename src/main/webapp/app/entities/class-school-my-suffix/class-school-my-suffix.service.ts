import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ClassSchoolMySuffix } from './class-school-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ClassSchoolMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/class-schools';

    constructor(private http: Http) { }

    create(classSchool: ClassSchoolMySuffix): Observable<ClassSchoolMySuffix> {
        const copy = this.convert(classSchool);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(classSchool: ClassSchoolMySuffix): Observable<ClassSchoolMySuffix> {
        const copy = this.convert(classSchool);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ClassSchoolMySuffix> {
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
     * Convert a returned JSON object to ClassSchoolMySuffix.
     */
    private convertItemFromServer(json: any): ClassSchoolMySuffix {
        const entity: ClassSchoolMySuffix = Object.assign(new ClassSchoolMySuffix(), json);
        return entity;
    }

    /**
     * Convert a ClassSchoolMySuffix to a JSON which can be sent to the server.
     */
    private convert(classSchool: ClassSchoolMySuffix): ClassSchoolMySuffix {
        const copy: ClassSchoolMySuffix = Object.assign({}, classSchool);
        return copy;
    }
}
