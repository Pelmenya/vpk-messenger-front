import { EMPTY_PIC_PLACEHOLDER } from "../constants/empty-pic-placeholder"
import { setBaseImageUrl } from "./set-base-image-url"

export const getAvatarBg = (url?: string) => {
    if (!url) return EMPTY_PIC_PLACEHOLDER
    return `url("${setBaseImageUrl(url)}")`
}
