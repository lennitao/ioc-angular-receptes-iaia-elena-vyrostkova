import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TargetaRecepta } from './targeta-recepta.component';

describe('TargetaRecepta', () => {
  let component: TargetaRecepta;
  let fixture: ComponentFixture<TargetaRecepta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetaRecepta],
    }).compileComponents();

    fixture = TestBed.createComponent(TargetaRecepta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
