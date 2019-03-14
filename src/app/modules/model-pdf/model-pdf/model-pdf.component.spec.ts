import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPDFComponent } from './model-pdf.component';

describe('ModelPDFComponent', () => {
  let component: ModelPDFComponent;
  let fixture: ComponentFixture<ModelPDFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelPDFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
