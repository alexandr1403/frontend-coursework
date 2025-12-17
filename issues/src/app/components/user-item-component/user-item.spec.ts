import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from './user-item.component';

describe('MovieItem', () => {
    let childComponent: User;
    let fixture: ComponentFixture<User>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
        //   declarations: [ MovieItem ]
        providers: []
        }).compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(User);
        childComponent = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('', () => {

    })
})
