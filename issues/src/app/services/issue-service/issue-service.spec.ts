import { TestBed } from "@angular/core/testing";
import { IssueService } from "./issue.service";
import { UserInterface } from "../../interfaces/user.interface";

describe('IssueService', () => {
    let service: IssueService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [IssueService],
        });
        service = TestBed.inject(IssueService);
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
    })

    it('should be closed', () => {
        const gettingShpion = spyOn(service, 'getClosed');
        service.closeIssue(0);

        expect(gettingShpion).toHaveBeenCalled();
    })

    it('should be saved', () => {
        const gettingShpion = spyOn(service, 'saveIssues');
        service.closeIssue(0);

        expect(gettingShpion).toHaveBeenCalled();
    })

    const mockUser: UserInterface = {
        id: 0,
        name: "alex",
        password: "passw",
    };

    it('should be false assigning', () => {
        const realData = service.assign(0, mockUser);

        expect(realData).toEqual(false);
    })
})
