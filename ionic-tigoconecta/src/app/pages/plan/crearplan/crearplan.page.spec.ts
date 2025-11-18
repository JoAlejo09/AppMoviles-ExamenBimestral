import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearplanPage } from './crearplan.page';

describe('CrearplanPage', () => {
  let component: CrearplanPage;
  let fixture: ComponentFixture<CrearplanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearplanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
