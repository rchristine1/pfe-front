function Title(props) {
    let titleH1Style = { color: '#131f1f', letterSpacing: '5px', fontSize: '1.75em' }
    let rowTitleStyle = { backgroundColor: '#eff5f5' }
    let cardTitleStyle = { color: '#4c7f7f' }
    let cardSubTitleStyle = { color: '#609f9f' }
    let firstname = props.firstname
    let lastname = props.lastname
    let details = props.details
    let titleH1 = props.titleH1
    let currentCampaignLabel = props.currentCampaignLabel
    let userStatusCampaign = props.userStatusCampaign
    let displayCampaign = props.displayCampaign
    let displayUser = props.displayUser

    return (
        <div className="container pt-4" style={rowTitleStyle}>
            <div className="row align-items-center justify-content-start pb-4" >
                <div className='col-5'>
                    <h1 style={titleH1Style}>{titleH1}</h1>
                </div>
                {displayCampaign === true ?
                    <div className="col-3">
                        <div className="card" >
                            <div className="card-body py-0">
                                <h5 className="card-title text-end" style={cardTitleStyle}>Campaign {currentCampaignLabel}</h5>
                                <h6 className="card-subtitle mb-2 text-end" style={cardSubTitleStyle}>{userStatusCampaign}</h6>
                                <p className="card-text"></p>
                            </div>
                        </div>
                    </div>
                    : <div className="col-3"></div>
                }
                {displayUser === true ?
                    <div className="col-4">
                        <div className="card" >
                            <div className="card-body py-0">
                                <h5 className="card-title text-end" style={cardTitleStyle} data-testid="fullname">{firstname} {lastname}</h5>
                                <h6 className="card-subtitle mb-2 text-end" style={cardSubTitleStyle}>{details}</h6>
                                <p className="card-text"></p>
                            </div>
                        </div>
                    </div>
                    : null}
            </div>
        </div>

    )

}
export default Title;