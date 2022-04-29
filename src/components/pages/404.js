// import ErrorMessage from "../error-message/error-message"
import { Link } from "react-router-dom"
import '../../style/style.scss'

const Pages404 = () => {
    return(
        <div >
            <p className ="massage-404">Page doesn't exist</p>
            <Link className="link-404" to = "/">Back to main paige</Link>
        </div>
    )
}

export default Pages404;