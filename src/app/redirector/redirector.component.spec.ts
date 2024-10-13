import { ComponentFixture, TestBed } from "@angular/core/testing"
import { RedirectorComponent } from "./redirector.component"

describe("RedirectorComponent", () => {
    let component: RedirectorComponent
    let fixture: ComponentFixture<RedirectorComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RedirectorComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(RedirectorComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
