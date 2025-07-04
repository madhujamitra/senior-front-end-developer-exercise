interface ButtonProps {
    text: string,
    color?: string,
    className?: string,
    onClick: () => void,
}
const Button = ({ color, text, onClick, className }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`btn ${className || ''}`}
            style={{ backgroundColor: color }}>
            {text}
        </button>
    )
}

export default Button
