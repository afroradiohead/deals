import { TestBed, inject } from '@angular/core/testing';

import { ProductSubscriptionModalService } from './product-subscription-modal.service';

describe('ProductSubscriptionModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductSubscriptionModalService]
    });
  });

  it('should be created', inject([ProductSubscriptionModalService], (service: ProductSubscriptionModalService) => {
    expect(service).toBeTruthy();
  }));
});
