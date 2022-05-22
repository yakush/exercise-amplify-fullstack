import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanListItemComponent } from './scan-list-item.component';

describe('ScanListItemComponent', () => {
  let component: ScanListItemComponent;
  let fixture: ComponentFixture<ScanListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
