import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationCard } from './allocation-card';

describe('AllocationCard', () => {
  let component: AllocationCard;
  let fixture: ComponentFixture<AllocationCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllocationCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllocationCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
