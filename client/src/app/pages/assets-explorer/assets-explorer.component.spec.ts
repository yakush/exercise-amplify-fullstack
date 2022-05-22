import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsExplorerComponent } from './assets-explorer.component';

describe('AssetsExplorerComponent', () => {
  let component: AssetsExplorerComponent;
  let fixture: ComponentFixture<AssetsExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetsExplorerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
