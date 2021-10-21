import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFormRecapComponent } from './client-form-recap.component';

describe('ClientFormRecapComponent', () => {
  let component: ClientFormRecapComponent;
  let fixture: ComponentFixture<ClientFormRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientFormRecapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFormRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
