import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisContratosPage } from './mis-contratos.page';

describe('MisContratosPage', () => {
  let component: MisContratosPage;
  let fixture: ComponentFixture<MisContratosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MisContratosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
