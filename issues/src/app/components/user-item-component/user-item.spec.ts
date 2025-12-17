import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from './user-item.component';

describe('UserItem', () => {
    let childComponent: User;
    let fixture: ComponentFixture<User>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
        providers: []
        }).compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(User);
        childComponent = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('should be created (UserItem)', () => {
        expect(childComponent).toBeTruthy();
    })
})
