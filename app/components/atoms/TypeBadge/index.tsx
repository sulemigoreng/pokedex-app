import { typeColors } from "@/app/const";

export default function TypeBadge(
    { type, onClick, className }: { type: string, onClick?: () => void, className?: string }
) {
    return (
        <div
            className={`p-2 rounded-lg text-white text-sm font-pixel ${className}`}
            style={{
                backgroundColor: typeColors[type as keyof typeof typeColors] || '#000000'
            }}
            onClick={onClick}>
            {type.toUpperCase()}
        </div>
    );
}