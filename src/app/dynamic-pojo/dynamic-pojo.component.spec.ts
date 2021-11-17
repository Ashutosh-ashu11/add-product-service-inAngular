import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicPojoComponent } from './dynamic-pojo.component';

describe('DynamicPojoComponent', () => {
  let component: DynamicPojoComponent;
  let fixture: ComponentFixture<DynamicPojoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicPojoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicPojoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
