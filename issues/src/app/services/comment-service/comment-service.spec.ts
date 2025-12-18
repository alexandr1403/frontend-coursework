import { TestBed } from '@angular/core/testing';
import { CommentService } from './comment.service';

interface TestValue {
    date: string, assignerName: string, comment: string,
}

describe('UserService', () => {
    let service: CommentService;

    beforeEach(() => {    
        TestBed.configureTestingModule({
        providers: [CommentService]
        })
        service = TestBed.inject(CommentService); 
    })
    
    it('should be created (CommentService)', () => {
        expect(service).toBeTruthy();
    })

    const mockData: TestValue = {
        date: "today", 
        assignerName: "alex", 
        comment: "some comment",
    };
    const expectedValue: string = "В today пользователь alex оставил комментарий: \"some comment\"";

    it('should be equal to value', () => {
        const key = service.setValue(mockData.date, mockData.assignerName, mockData.comment);

        expect(key).toEqual(expectedValue);
    })

    it('should be setting value', () => {
        const setShpion = spyOn(service, 'setValue');

        service.saveHistory(0, mockData.date, mockData.assignerName, mockData.comment);

        expect(setShpion).toHaveBeenCalled();
    })
})
