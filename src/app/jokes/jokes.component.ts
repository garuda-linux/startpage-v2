import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { jokesApiUrl } from '../../../config';
import { JokeApiResponse } from '../types';

@Component({
    selector: "app-jokes",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./jokes.component.html",
    styleUrl: "./jokes.component.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokesComponent implements OnInit {
    joke = ""

    constructor(
        private cdr: ChangeDetectorRef,
        private http: HttpClient,
    ) {}

    ngOnInit(): void {
        this.http.get<JokeApiResponse>(jokesApiUrl).subscribe({
            next: (data): void => {
                this.joke = data.joke
                this.cdr.detectChanges()
            },
            error: (err): void => {
                console.error("Failed to fetch joke.", err)
            },
        })
    }
}
