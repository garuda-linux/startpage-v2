import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import { AppService } from "./app.service";

export const appConfig: ApplicationConfig = {
    providers: [
        AppService,
        provideAnimationsAsync(),
        provideHttpClient(),
        provideRouter(appRoutes),
        provideZoneChangeDetection({ eventCoalescing: true }),
    ],
};
