import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LlistaReceptesComponent } from './llista-receptes.component';

describe('LlistaReceptesComponent', () => {
  let component: LlistaReceptesComponent;
  let fixture: ComponentFixture<LlistaReceptesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlistaReceptesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LlistaReceptesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
