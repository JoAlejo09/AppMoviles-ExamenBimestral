import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContratosPendientesPage } from './contratos-pendientes.page';

describe('ContratosPendientesPage', () => {
  let component: ContratosPendientesPage;
  let fixture: ComponentFixture<ContratosPendientesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratosPendientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
