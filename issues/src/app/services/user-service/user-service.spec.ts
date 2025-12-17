import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { UserInterface } from '../../interfaces/user.interface';

interface TestKey {
    id: number, name: string;
}

describe('UserService', () => {
    let service: UserService;

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

    const mockUser: UserInterface = {
        id: 0,
        name: "alex",
        password: "passw",
    };

    it('should be setting key', () => {
        const setShpion = spyOn(service, 'setKey');
        service.registerUser(mockUser);

        expect(setShpion).toHaveBeenCalled();
    })

    it('should be adding user', () => {
        const addShpion = spyOn(service, 'addUser');
        const saveShpion = spyOn(service, 'saveUser');

        service.registerUser(mockUser);

        expect(addShpion).toHaveBeenCalled();
        expect(saveShpion).toHaveBeenCalled();
    })
})
