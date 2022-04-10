import img from "./error.gif"
import './error-message.scss'

const ErrorMessage = () => {
    return (
        <img className="img" src= {img} alt="error gif" />
    )
}

export default ErrorMessage;