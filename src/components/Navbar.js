import { Link } from "react-router-dom";
import { ROLE_TEAMMEMBER } from '../Login'
import { ROLE_TEAMLEADER } from '../Login'

function Navbar(props) {
    let userRole = props.userRoles
    let id = props.userId
    let history = props.history

    return (
        <div>
            <nav className="navbar navbar-expand border-bottom mt-3">
                {userRole === ROLE_TEAMMEMBER ?
                    (<div className="navbar-nav mr-auto">
                        <li className="nav-item ">
                            <Link to={"/welcometeammember"} className="nav-link pr-10">
                                Welcome
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to={`/userskills/${id}`} className="nav-link pr-10" onClick={event => {
                                history(`/userskills/${id}`)
                            }}>
                                MySkills
                            </Link>

                        </li>
                        <li className="nav-item ">
                            <Link to={`/training/${id}`} className="nav-link pr-10">
                                MyTrainings
                            </Link>
                        </li>
                    </div>) :
                    (<div className="navbar-nav mr-auto">
                        <li className="nav-item ">
                            <Link to={"/welcometeamleader"} className="nav-link pr-10">
                                Welcome
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/skillstovalidate/${id}`} className="nav-link pr-10" onClick={event => {
                                history(`/skillstovalidate/${id}`)
                            }}>
                                TeamSkills
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/training/${id}`} className="nav-link pr-10">
                                Training
                            </Link>
                        </li>
                    </div>)
                }

            </nav>
        </div>
    )
}
export default Navbar;