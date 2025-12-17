import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IssueList } from "./issue-list.component";

describe('IssueList', () => {
    let parentComponent: IssueList;
    let fixture: ComponentFixture<IssueList>; // этот класс имеет метод создания экземпляра для наблююдения. Нам он понадобится 

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [IssueList]
        }).compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(IssueList);
        parentComponent = fixture.componentInstance;    // создаём экземпляр указанного компонента для наблюдения
        fixture.detectChanges();                        // и устанавливаем реагирование на обнаружение изменений в нём. 
    })

    it('should be created (IssueList)', () => {
        expect(parentComponent).toBeTruthy();
    })
})
