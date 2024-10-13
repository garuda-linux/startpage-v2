import { TestBed } from "@angular/core/testing"
import { CanActivateFn } from "@angular/router"

import { redirectGuard } from "./redirect.guard"

describe("redirectGuard", () => {
    const executeGuard: CanActivateFn = (...guardParameters) =>
        TestBed.runInInjectionContext(() => redirectGuard(...guardParameters))

    beforeEach(() => {
        TestBed.configureTestingModule({})
    })

    it("should be created", () => {
        expect(executeGuard).toBeTruthy()
    })
})
