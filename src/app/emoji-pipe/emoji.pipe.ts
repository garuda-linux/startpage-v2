import { Pipe, PipeTransform } from "@angular/core"
import { EmojiConvertor } from "emoji-js"

@Pipe({
    name: "emojiPipe",
    standalone: true,
})
export class EmojiPipe implements PipeTransform {
    transform(value: string): string {
        const emoji = new EmojiConvertor()
        emoji.allow_native = true
        return emoji.replace_colons(value)
    }
}
