import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotEnoughMoneyComponent } from './not-enough-money.component';

describe('NotEnoughMoneyComponent', () => {
  let component: NotEnoughMoneyComponent;
  let fixture: ComponentFixture<NotEnoughMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotEnoughMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotEnoughMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
