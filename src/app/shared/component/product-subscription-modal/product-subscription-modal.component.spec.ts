import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSubscriptionModalComponent } from './product-subscription-modal.component';

describe('ProductSubscriptionModalComponent', () => {
  let component: ProductSubscriptionModalComponent;
  let fixture: ComponentFixture<ProductSubscriptionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSubscriptionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSubscriptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
