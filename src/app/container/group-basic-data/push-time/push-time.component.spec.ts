import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PushTimeComponent } from './push-time.component';

describe('PushTimeComponent', () => {
  let component: PushTimeComponent;
  let fixture: ComponentFixture<PushTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
