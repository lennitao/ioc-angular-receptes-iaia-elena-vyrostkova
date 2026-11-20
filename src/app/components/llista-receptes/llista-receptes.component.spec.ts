import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LlistaReceptes } from './llista-receptes.component';

describe('LlistaReceptes', () => {
  let component: LlistaReceptes;
  let fixture: ComponentFixture<LlistaReceptes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlistaReceptes],
    }).compileComponents();

    fixture = TestBed.createComponent(LlistaReceptes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
