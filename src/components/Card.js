import { Link } from "react-router-dom";
function Card(props) {
    let titleH1Style = { color: '#131f1f', letterSpacing: '5px', fontSize: '1.75em' }
    let rowTitleStyle = { backgroundColor: '#eff5f5' }
    let cardTitleStyle = { color: '#4c7f7f' }
    let cardSubTitleStyle = { color: '#609f9f' }
    let activitiesButtonStyle = { color: '#ffff', backgroundColor: '#609f9f' }
    let firstname = props.firstname
    let lastname = props.lastname
    let details = props.details
    let titleCard = props.titleCard
    let link = props.link
    let id = props.id
    let go = props.go
    let history = props.history
    let displayGo = props.displayGo
    let displayUser = props.displayUser

    return (
        <div className="card shadow">
            <div className="card-body">
                <h5 className="card-title">{titleCard}</h5>
                <p className="card-text"></p>
                {displayGo === false ?
                    <a href="#" className="btn btn-sm" 
                    style={activitiesButtonStyle} disabled>{go}</a>
                    :
                    <Link className="btn btn-sm Hover" to={`${link}/${id}`} onClick={event => {
                        history(`${link}/${id}`);
                    }} style={activitiesButtonStyle}>{go}</Link>
                }
            </div>
        </div>

    )

}
export default Card;