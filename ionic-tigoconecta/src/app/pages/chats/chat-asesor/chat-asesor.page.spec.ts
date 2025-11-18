import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatAsesorPage } from './chat-asesor.page';

describe('ChatAsesorPage', () => {
  let component: ChatAsesorPage;
  let fixture: ComponentFixture<ChatAsesorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatAsesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
