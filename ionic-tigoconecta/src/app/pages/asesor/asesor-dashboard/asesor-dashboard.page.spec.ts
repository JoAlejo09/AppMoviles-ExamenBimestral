import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsesorDashboardPage } from './asesor-dashboard.page';

describe('AsesorDashboardPage', () => {
  let component: AsesorDashboardPage;
  let fixture: ComponentFixture<AsesorDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsesorDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
