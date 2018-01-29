import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SemesterMySuffix } from './semester-my-suffix.model';
import { SemesterMySuffixService } from './semester-my-suffix.service';

@Injectable()
export class SemesterMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private semesterService: SemesterMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.semesterService.find(id).subscribe((semester) => {
                    if (semester.startDate) {
                        semester.startDate = {
                            year: semester.startDate.getFullYear(),
                            month: semester.startDate.getMonth() + 1,
                            day: semester.startDate.getDate()
                        };
                    }
                    if (semester.endDate) {
                        semester.endDate = {
                            year: semester.endDate.getFullYear(),
                            month: semester.endDate.getMonth() + 1,
                            day: semester.endDate.getDate()
                        };
                    }
                    this.ngbModalRef = this.semesterModalRef(component, semester);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.semesterModalRef(component, new SemesterMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    semesterModalRef(component: Component, semester: SemesterMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.semester = semester;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
