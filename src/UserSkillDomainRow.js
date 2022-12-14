import React from 'react';
import Button from 'react-bootstrap/Button';
import { RiArrowDownCircleFill } from 'react-icons/ri';
import { RiArrowUpCircleFill } from 'react-icons/ri';

let iconStyles = { color: "#609f9f", fontSize: "1.25em" };
let domainStyles = { color: '#395f5f', backgroundColor: '#bfd8d8' };

class UserSkillDomainRow extends React.Component {


    render() {
        const domain = this.props.domain;
        const handleEpandRow = (event, domain) => {
            const currentExpandedRows = this.props.expandedRows;
            const isRowExpanded = currentExpandedRows.includes(domain);

            let obj = {};
            isRowExpanded ? (obj[domain] = false) : (obj[domain] = true);
            this.props.setExpandState(obj);

            // If the row is expanded, we are here to hide it. Hence remove
            // it from the state variable. Otherwise add to it.
            const newExpandedRows = isRowExpanded ?
                currentExpandedRows.filter(id => id !== domain) :
                currentExpandedRows.concat(domain);

            this.props.setExpandedRows(newExpandedRows);
        }
        return (
            <tr>
                <th colSpan="6" style={domainStyles}  >
                    <Button className="Hover-icon"
                        variant="link"
                        onClick={event => handleEpandRow(event, domain)}>
                        {
                            this.props.expandState[domain] ?
                                <RiArrowUpCircleFill style={iconStyles} toggle="tooltip" 
                                title="Click here to close this domain"/> : <RiArrowDownCircleFill style={iconStyles} toggle="tooltip" 
                                title="Click here to evaluate your skills"/>
                        }
                    </Button>
                    <span>{domain}</span>
                </th>

            </tr>
        );
    }
}
export default UserSkillDomainRow;