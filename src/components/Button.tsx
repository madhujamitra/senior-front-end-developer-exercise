
interface ButtonProps {
    text: string,
    color?: string,
    className?: string,
    onClick: () => void,
}
const Button = ({ color, text, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="btn"
            style={{ backgroundColor: color }}>
            {text}
        </button>
    )
}

export default Button
