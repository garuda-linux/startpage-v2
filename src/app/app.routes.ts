import {
    animate,
    type AnimationGroupMetadata,
    type AnimationQueryMetadata,
    type AnimationTriggerMetadata,
    group,
    query,
    style,
    transition,
    trigger,
} from "@angular/animations";
import { Route } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SettingsComponent } from "./settings/settings.component";

export const appRoutes: Route[] = [
    {
        path: "",
        component: HomeComponent,
        data: { animationState: "0" },
    },
    {
        path: "settings",
        component: SettingsComponent,
        data: { animationState: "1" },
    },
    {
        path: "**",
        redirectTo: "",
    },
];

/**
 * A generic fade animation, for use in the router link animations.
 */
const fade: (AnimationQueryMetadata | AnimationGroupMetadata)[] = [
    query(":enter, :leave", style({ position: "fixed", width: "100%" }), { optional: true }),
    query(":enter", [style({ opacity: 0 })], { optional: true }),
    group([
        query(":leave", [animate("0.4s ease-out", style({ opacity: 0 }))], { optional: true }),
        query(":enter", [style({ opacity: 0 }), animate("0.4s ease-out", style({ opacity: 1 }))], { optional: true }),
    ]),
];

/**
 * Animation metadata for router link transitions.
 * Fades between pages.
 * @param direction the direction the animation should go into.
 */
const fadeInFromDirection = (direction: string): (AnimationQueryMetadata | AnimationGroupMetadata)[] => [
    query(":enter, :leave", style({ position: "fixed", width: "100%" }), { optional: true }),
    group([
        query(
            ":enter",
            [
                style({
                    transform: `translateX(${direction === "backward" ? "-" : ""}15%)`,
                    opacity: 0,
                }),
                animate("0.1s ease-out", style({ transform: "translateX(0%)", opacity: 1 })),
            ],
            { optional: true },
        ),
        query(":leave", [style({ transform: "translateX(0%)" }), animate("0.3s ease-out", style({ opacity: 0 }))], {
            optional: true,
        }),
    ]),
];

/**
 * Produces the strings needed for any forward transitions.
 * @returns A string like "0 => 1, 1 => 2, 0 => 2"
 */
function forwardValues(): string {
    let result = "";
    for (let i = 0; i <= 2; i++) {
        for (let j = i + 1; j <= 2; j++) {
            result += `${i} => ${j}, `;
        }
    }
    return result.slice(0, -2);
}

/**
 * Produces the strings needed for any backward transitions.
 * @returns A string like "2 => 1, 1 => 0, 2 => 0"
 */
function backwardValues(): string {
    let result = "";
    for (let i = 2; i >= 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
            result += `${i} => ${j}, `;
        }
    }
    return result.slice(0, -2);
}

/**
 * This constant holds any page transition rules, triggered from the router outlet.
 */
export const routeAnimations: AnimationTriggerMetadata = trigger("routerTransition", [
    transition(forwardValues(), fadeInFromDirection("forward")),
    transition(backwardValues(), fadeInFromDirection("backward")),
    transition("* => null, null => *", fade),
]);
