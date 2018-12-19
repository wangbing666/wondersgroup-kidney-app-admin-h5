import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationPushComponent } from './operation-push.component';

describe('OperationPushComponent', () => {
  let component: OperationPushComponent;
  let fixture: ComponentFixture<OperationPushComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationPushComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationPushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
