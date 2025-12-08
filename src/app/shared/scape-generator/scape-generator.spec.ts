import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScapeGenerator } from './scape-generator';

describe('ScapeGenerator', () => {
  let component: ScapeGenerator;
  let fixture: ComponentFixture<ScapeGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScapeGenerator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScapeGenerator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
