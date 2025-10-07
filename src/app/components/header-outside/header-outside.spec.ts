import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOutside } from './header-outside';

describe('HeaderOutside', () => {
  let component: HeaderOutside;
  let fixture: ComponentFixture<HeaderOutside>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderOutside]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderOutside);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
