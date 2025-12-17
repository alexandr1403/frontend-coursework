import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

interface TestKey {
    id: number, name: string;
}

describe('UserService', () => {
    let service:UserService;

    beforeEach(() => {    
        TestBed.configureTestingModule({
        providers: [UserService]
        })
        service = TestBed.inject(UserService); 
    })
    
    it('should be created (UserService)', () => {
        expect(service).toBeTruthy();
    })

    const mockData: TestKey = {
        id: 17000,
        name: 'alex',
    };
    const expectedValue: string = 'alex';

    it('should be equal to key', () => {
        const key = service.setKey(mockData.id, mockData.name);

        expect(key).toEqual(expectedValue);
    })
})
