import { Link } from 'react-router-dom'
import Title from './components/Title.js'
function Contact(props) {
    let titleH1 = "CONTACT"
    let cardTitleStyle = { color: '#4c7f7f' }
    let cardSubTitleStyle = { color: '#609f9f' }
    let activitiesStyle = { marginTop: '30px' }
    return (
        <div className="container py-5 h-100">
            <Title titleH1={titleH1} 
            />            
            <div className="col-md-12" style={activitiesStyle}>
                <div className="container">
                    <div className="row pb-3 align-items-center justify-content-center">
                        <div className="col-md-5 pb-3">
                            <div className="card shadow">
                                <div className="card-body">
                                    <h5 className="card-title" style={cardTitleStyle}>Support</h5>
                                    <h6 className="card-subtitle mb-2 text-end" data-testid="team" style={cardSubTitleStyle}>01001</h6>
                                    <p className="card-text"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pb-3 align-items-center justify-content-center">
                        <div className="col-md-2 pb-3">
                            <Link to="/login" className="text-decoration-none" >Back to Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Contact;