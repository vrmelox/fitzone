import Link from "next/link";
import { ButtonProps } from "@/types/api";


export default function Button({text, color, href, onClick}: ButtonProps) {
    const baseClass = `${color} text-white px-4 py-2 rounded-4xl text-center cursor-pointer hover:brigthness-90 transition`

    if(href) {
        return (
            <Link href={href} className={baseClass}>
                {text}
            </Link>
        );
    }

    return (
        <button className={baseClass} onClick={onClick} type="button">
            {text}
        </button>
    )
}