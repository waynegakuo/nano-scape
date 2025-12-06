import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stadium } from './stadium';

describe('Stadium', () => {
  let component: Stadium;
  let fixture: ComponentFixture<Stadium>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stadium]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Stadium);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
