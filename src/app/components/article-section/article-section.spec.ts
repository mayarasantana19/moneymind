import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSection } from './article-section';

describe('ArticleSection', () => {
  let component: ArticleSection;
  let fixture: ComponentFixture<ArticleSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
