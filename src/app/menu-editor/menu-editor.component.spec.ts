import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuEditorComponent } from './menu-editor.component';

describe('MenuEditorComponent', () => {
  let component: MenuEditorComponent;
  let fixture: ComponentFixture<MenuEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
