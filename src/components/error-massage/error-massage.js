import img from "./error.gif"
import './error-massage.scss'

const ErrorMassage = () => {
    return (
        <img className="img" src= {img} alt="error gif" />
    )
}

export default ErrorMassage;