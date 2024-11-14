import { ReactNode } from "react";

export default function Button(
    { onClick, children, className }
        : { onClick: () => void, children: ReactNode, className: string }) {
    return (
        <button
            onClick={onClick}
            className={`p-2 rounded-lg ${className}`}
        >
            {children}
        </button>
    )
}