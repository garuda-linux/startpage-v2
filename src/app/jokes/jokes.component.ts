import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import jokes from "./jokes";

@Component({
    selector: "app-jokes",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./jokes.component.html",
    styleUrl: "./jokes.component.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokesComponent implements OnInit {
    joke = "";

    ngOnInit(): void {
        this.setJoke();
    }

    setJoke(): void {
        this.joke = jokes[Math.floor(Math.random() * jokes.length)];
    }
}
