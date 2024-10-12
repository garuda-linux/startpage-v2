import { Pipe, PipeTransform } from "@angular/core"
import moment from "moment"

@Pipe({
    name: "datePipe",
    standalone: true,
})
export class DatePipe implements PipeTransform {
    transform(value: moment.MomentInput): string | undefined {
        if (value !== null) {
            return moment(value).format("MMMM Do YYYY")
        }
        return undefined
    }
}
