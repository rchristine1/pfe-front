import AxiosTest from "../components/Header";
import { render } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
describe('Header', () => {
    it("Header displays correct fullname", () => {
        let { getByTestId } = render(<AxiosTest userFirstName="Kirsten"
            userLastName="Neuschaffer" />, { wrapper: BrowserRouter });
        let fullnameValue = getByTestId("fullname").textContent;
        expect(fullnameValue).toStrictEqual("Kirsten Neuschaffer")
    })

    it("Header displays correct role", () => {
        let { getByTestId } = render(<AxiosTest userRoles="Team Leader"
            />, { wrapper: BrowserRouter });
        let rolenameValue = getByTestId("rolename").textContent;
        expect(rolenameValue).toContain("Team Leader")
 
    })

    it("Header displays application name", () => {
        let { getByTestId } = render(<AxiosTest 
            />, { wrapper: BrowserRouter });
        //let applicationnameValue = "MY TEAM UP SKILL"
        let applicationnameValue = getByTestId("applicationName").textContent;
        expect(applicationnameValue).toContain("MY TEAM UP SKILL")
       
    })
})
