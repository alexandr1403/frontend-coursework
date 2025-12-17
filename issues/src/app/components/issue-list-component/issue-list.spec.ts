import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IssueList } from "./issue-list.component";

describe('IssueList', () => {
    let parentComponent: IssueList;
    let fixture: ComponentFixture<IssueList>; // этот класс имеет метод создания экземпляра для наблююдения. 
                                              // Нам он понадобится 

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

    it('should be called updateIsues', () => {
        const updateShpion = spyOn(parentComponent, 'updateIssues');
        parentComponent.ngOnInit();

        expect(updateShpion).toHaveBeenCalled();
    })

    it('should render title', () => {
        const fixture = TestBed.createComponent(IssueList);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('I$$ue$');
    })

    it('should be equal to false', () => {
        parentComponent.showClosed();

        expect(parentComponent.isOpened).toEqual(false);
    })

    
    it('should be applied filters', () => {
        const applyShpion = spyOn(parentComponent, 'applyFilters');
        parentComponent.doFilter();

        expect(applyShpion).toHaveBeenCalled();
    })
})
