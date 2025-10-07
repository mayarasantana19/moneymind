import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetAllocation } from './budget-allocation';

describe('BudgetAllocation', () => {
  let component: BudgetAllocation;
  let fixture: ComponentFixture<BudgetAllocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetAllocation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetAllocation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
