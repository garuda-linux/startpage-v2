import { ComponentFixture, TestBed } from "@angular/core/testing"
import { UpdatesComponent } from "./updates.component"

describe("UpdatesComponent", () => {
    let component: UpdatesComponent
    let fixture: ComponentFixture<UpdatesComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UpdatesComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(UpdatesComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
