import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactLinksComponent } from './contact-links.component';

describe('ContactLinksComponent', () => {
  let component: ContactLinksComponent;
  let fixture: ComponentFixture<ContactLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactLinksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
