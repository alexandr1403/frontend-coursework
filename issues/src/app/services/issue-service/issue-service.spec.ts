import { TestBed } from "@angular/core/testing";
import { IssueService } from "./issue.service";
import { Inject } from "@angular/core";

describe('IssueService', () => {
    let service: IssueService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [IssueService],
        });
        service = Inject(IssueService);
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
    })
})
