import {Link} from 'react-router-dom'
export default function Header(props){
    return <div>
        <Link to="listTeamMembers">Les Collaborateurs</Link>
        <Link to="MyTeamMembers">Mes Collaborateurs</Link>
        <Link to="listTrainings">Les formations</Link>
        <p>Bonjour {props.userInfo}</p>
        
    </div>
}