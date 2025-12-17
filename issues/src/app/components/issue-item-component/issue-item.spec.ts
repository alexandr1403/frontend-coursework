import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueItem } from '../issue-item-component/issue-item.component';
import { IssuePriority, IssueType } from '../../interfaces/issue.interface';

describe('IssueItem', () => {
    let childComponent: IssueItem;
    let fixture: ComponentFixture<IssueItem>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
        providers: []
        }).compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(IssueItem);
        childComponent = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('should be created and initialized (IssueItem)', () => {
        expect(childComponent).toBeTruthy();
        childComponent.issue = { 
            id: 0,
            creator: { id: 170000, name: '', password: '' }, 
            title: 'some title',
            content: '',
            type: IssueType.BUG,
            priority: IssuePriority.CRITICAL,
            opened: true,
            assigner: { id: 170000, name: 'alex', password: '' },
        };

        expect(childComponent.issue.title).toEqual('some title');
        expect(childComponent.issue.opened).toEqual(true);
        expect(childComponent.issue.assigner.name).toEqual("alex");
    })
})
