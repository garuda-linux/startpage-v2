import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinksEditorComponent } from './links-editor.component';

describe('LinksEditorComponent', () => {
  let component: LinksEditorComponent;
  let fixture: ComponentFixture<LinksEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinksEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LinksEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
