import { TestBed } from "@angular/core/testing"
import { RouterModule } from "@angular/router"
import { AppComponent } from "./app.component"
import { NxWelcomeComponent } from "./nx-welcome.component"

describe("AppComponent", () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent, NxWelcomeComponent, RouterModule.forRoot([])],
        }).compileComponents()
    })

    it("should render title", () => {
        const fixture = TestBed.createComponent(AppComponent)
        fixture.detectChanges()
        const compiled = fixture.nativeElement as HTMLElement
        expect(compiled.querySelector("h1")?.textContent).toContain("Welcome startpage-v22")
    })

    it(`should have as title 'startpage-v22'`, () => {
        const fixture = TestBed.createComponent(AppComponent)
        const app = fixture.componentInstance
        expect(app.title).toEqual("startpage-v22")
    })
})
