import { ComponentFixture, TestBed } from "@angular/core/testing"
import { JokesComponent } from "./jokes.component"

describe("JokesComponent", () => {
    let component: JokesComponent
    let fixture: ComponentFixture<JokesComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [JokesComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(JokesComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
