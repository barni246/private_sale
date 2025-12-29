import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dataprotection } from './dataprotection';

describe('Dataprotection', () => {
  let component: Dataprotection;
  let fixture: ComponentFixture<Dataprotection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dataprotection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dataprotection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
