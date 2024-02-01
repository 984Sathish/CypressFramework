import { faker } from '@faker-js/faker';

const pim = {
    "btnAddEmp": "button",
    "fldfirstName": "[name='firstName']",
    "fldlastName": "[name='lastName']",
    "empId": "[class='oxd-input oxd-input--active']",
    "fldEmpId": "[class='oxd-input oxd-input--focus']",
    "btnSave": "[type='submit']",
    "btnSearch": "[type='submit']",
    "userTable": "div[class='oxd-table-card']",
    "empTabs": "[class='orangehrm-tabs-item']",
    "lblEmpTabs": "[class='oxd-label']",
    "btnAddAttach": "[type='button']",
    "fileBrowse": ".oxd-file-button",
    "fileName": "[class='oxd-file-input-div']",
    "listUser": "[role='listbox']",
    "textlistUser": "[role='listbox']",
    "drpdwnEmp": "[placeholder='Type for hints...']",
    "msgSuccess": "p[class*='oxd-text--toast-message']",
    "drpdownWithOption": "[class='oxd-select-wrapper']",
    "radioBtn": "[class='oxd-radio-wrapper']",
    "filterTable": ".oxd-table-filter",
    "datePicker": "[class='oxd-date-input']"
}

class PimPage {

    /**
     * @author: sathish 
     * Click 'Add' button to navigate add employee page
     */
    clickAddBtn() {
        cy.get(pim.btnAddEmp).contains('Add').click()
    }

    /**
     * @author: sathish 
     * Enter 'First Name' and 'Last Name' in employee name field
     * @param {*} firstName 
     * @param {*} lastName 
     */
    enterEmployeeName(firstName, lastName) {
        cy.get(pim.fldfirstName).type(firstName)
        cy.get(pim.fldlastName).type(lastName)
    }

    /**
     * @author: sathish 
     * Write 'Employee Id' in data.json file
     */
    writeEmpolyeeId() {
        cy.get(pim.empId).last().type(faker.number.int(100))
        cy.get(pim.fldEmpId).then((id) => {
            const empId = id.val()
            cy.log(empId)
            cy.writeFile('data.json', { id: empId })
        })
    }

    /**
     * @author: sathish 
     * Click 'Save' button to save employee information
     */
    saveEmployee() {
        cy.get(pim.btnSave).click()
    }

    /**
     * @author: sathish 
     * To Verify 'Success' message that confirms employee information is saved.
     */
    verifySuccessMsg() {
        cy.get(pim.msgSuccess).should('be.visible')
    }

    /**
     * @author: sathish 
     * To 'Add' Employee Information - firstname, lastname, and Id.
     * To 'Save' Employee Information
     * To 'Verify' Employee Information is saved successfully
     * @param {*} firstName 
     * @param {*} lastName 
     */
    addNewEmployee(firstName, lastName) {
        this.clickAddBtn()
        this.enterEmployeeName(firstName, lastName)
        this.writeEmpolyeeId()
        this.saveEmployee()
        this.verifySuccessMsg()
    }

    /**
     * @author: sathish 
     * Enter 'First Name' and 'Last Name' in employee name field
     * @param {*} firstName 
     * @param {*} lastName 
     */
    enterEmployeeFullName(firstName, lastName) {
        cy.get(pim.lblEmpTabs).contains('Employee Name').parent().next().find(pim.drpdwnEmp).type(firstName + " ", { timeout: 10000 })
        cy.get(pim.listUser).contains(lastName).click()
    }

    /**
     * @author: sathish 
     * Enter 'Employee Id' in employee id field
     */
    enterEmployeeId() {
        cy.readFile('data.json').then((data) => {   //get id from json file
            cy.get(pim.empId).last().type(data.id)
        })
    }

    /**
     * @author: sathish 
     * Click 'Search' button to search employee
     */
    clickSearchBtn() {
        cy.get(pim.btnSearch).click()
    }

    /**
     * @author: sathish 
     * Verify 'Filter Table' is present or not
     */
    verifyFilterTableIsDisplayed() {
        cy.get(pim.filterTable).should('be.visible')
    }

    /**
     * @author: sathish 
     * Verify 'Employee' is present or not
     */
    verifyEmployeeIsPresent() {
        cy.get(pim.userTable).should('have.length', 1)
    }

    /**
     * @author: sathish 
     * Click 'Employee' in employee filter table
     */
    clickEmployee() {
        cy.get(pim.userTable).should('have.length', 1).click()
    }

    /**
     * @author: sathish 
     * To 'Search' Employee based on employee firstname, lastname and id.
     * @param {*} firstName 
     * @param {*} lastName 
     */
    searchEmployee(firstName, lastName) {
        this.verifyFilterTableIsDisplayed()
        this.enterEmployeeFullName(firstName, lastName)
        this.enterEmployeeId()
        this.clickSearchBtn()
    }

    /**
     * @author: sathish
     * Click 'Sub NavMenu' to navigate navmenu page
     * @param {*} subMenuName 
     */
    clickSubMenu(subMenuName) {
        cy.get(pim.empTabs).contains(subMenuName).click()
    }

    /**
     * @author: sathish
     * Select 'Nationality' in employee nationality dropdown
     * @param {*} nationality 
     */
    selectNationality(nationality) {
        cy.get(pim.lblEmpTabs).contains('Nationality').parent().next().find(pim.drpdownWithOption).click()
        cy.get(pim.listUser).contains(nationality).click()
    }

    /**
     * @author: sathish
     * Select 'Marital Status' in employee marital status dropdown
     * @param {*} maritalStatus 
     */
    selectMaritalStatus(maritalStatus) {
        cy.get(pim.lblEmpTabs).contains('Marital Status').parent().next().find(pim.drpdownWithOption).click()
        cy.get(pim.listUser).contains(maritalStatus).click()
    }

    /**
     * @author: sathish
     * Enter 'Date of Birth' in employee dob field
     * @param {*} dob 
     */
    enterDOB(dob) {
        cy.get(pim.datePicker).last().type(dob)
    }

    /**
     * @author: sathish
     * Select 'Gender' in employee gender dropdown
     */
    selectGender(gender) {
        cy.get(pim.radioBtn).contains(gender).click()
    }

    /**
     * @author: sathish
     * Click 'Save' button to save Employee personal details
     */
    savePersonalDetails() {
        cy.get(pim.btnSave).first().click()
    }

    /**
     * @author: sathish
     * Select 'Blood Type' in employee blood type dropdown
     * @param {*} bloodType 
     */
    selectBloodType(bloodType) {
        cy.get(pim.lblEmpTabs).contains('Blood Type').parent().next().find(pim.drpdownWithOption).click()
        cy.get(pim.listUser).contains(bloodType).click()
    }

    /**
     * @author: sathish
     * Click 'Save' button to save employee custom details
     */
    saveCustomDetails() {
        cy.get(pim.btnSave).last().click()
    }

    /**
     * @author: sathish
     * Enter 'Street' in employee street field
     * @param {*} street 
     */
    enterStreet(street) {
        cy.get(pim.lblEmpTabs).contains('Street 1')
            .parent().next().find(pim.empId).type(street)
    }

    /**
     * @author: sathish
     * Enter 'City' in employee city field
     * @param {*} city 
     */
    enterCity(city) {
        cy.get(pim.lblEmpTabs).contains('City')
            .parent().next().find(pim.empId).type(city)
    }

    /**
     * @author: sathish
     * Enter 'State' in employee state field
     * @param {*} state 
     */
    enterState(state) {
        cy.get(pim.lblEmpTabs).contains('State/Province')
            .parent().next().find(pim.empId).type(state)
    }

    /**
     * @author: sathish
     * Select 'Country' in employee country field
     * @param {*} country 
     */
    selectCountry(country) {
        cy.get(pim.drpdownWithOption).click()
        cy.get(pim.listUser).contains(country).click()
    }

    /**
     * @author: sathish
     * Enter 'Zipcode' in employee city zipcode field
     * @param {*} zipCode 
     */
    enterZipcode(zipCode) {
        cy.get(pim.lblEmpTabs).contains('Zip/Postal Code').parent().next().find(pim.empId).type(zipCode)
    }

    /**
     * @author: sathish
     * Enter 'Mobile Number' in employee mobile number field
     * @param {*} mobileNumber 
     */
    enterMobileNumber(mobileNumber) {
        cy.get(pim.lblEmpTabs).contains('Mobile').parent().next().find(pim.empId).type(mobileNumber)
    }

    /**
     * @author: sathish
     * Enter 'Email' in employee email field
     * @param {*} email 
     */
    enterEmail(email) {
        cy.get(pim.lblEmpTabs).contains('Work Email').parent().next().find(pim.empId).type(email)
    }

    /**
     * @author: sathish
     * Click 'Save' button to save employee contact details
     */
    saveContactDetails() {
        cy.get(pim.btnSave).click()
    }

    /**
     * @author: sathish
     * To 'Add' Employee Personal Information - Nationality, Marital status, Dob and Gender
     * To 'Save' Employee Personal Information
     * To 'Verify' Employee Personal Information is saved successfully
     * @param {*} nationality 
     * @param {*} maritalStatus 
     * @param {*} dob 
     * @param {*} gender 
     */
    addEmpPersonalInfo(nationality, maritalStatus, dob, gender) {
        this.selectNationality(nationality)
        this.selectMaritalStatus(maritalStatus)
        this.enterDOB(dob)
        this.selectGender(gender)
        this.savePersonalDetails()
        this.verifySuccessMsg()
    }

    /**
     * @author: sathish
     * To 'Add' Employee Custom Information - Blood type
     * To 'Save' Employee Custom Information
     * To 'Verify' Employee Custom Information is saved successfully
     * @param {*} bloodType 
     */
    addEmpCustomDetails(bloodType) {
        this.selectBloodType(bloodType)
        this.saveCustomDetails()
        this.verifySuccessMsg()
    }

    /**
     * @author: sathish
     * To 'Add' Employee Contact Information - Stree, City, State, Country, Zipcode, Mobile Number and Email
     * To 'Save' Employee Contact Information
     * To 'Verify' Employee Contact Informatin is saved successfully
     * @param {*} street 
     * @param {*} city 
     * @param {*} state 
     * @param {*} country 
     * @param {*} zipCode 
     * @param {*} mobileNumber 
     * @param {*} email 
     */
    addEmpContactDetails(street, city, state, country, zipCode, mobileNumber, email) {
        this.enterStreet(street)
        this.enterCity(city)
        this.enterState(state)
        this.selectCountry(country)
        this.enterZipcode(zipCode)
        this.enterMobileNumber(mobileNumber)
        this.enterEmail(email)
        this.saveContactDetails()
        this.verifySuccessMsg()
    }

    /**
     * @author: sathish
     * Select 'Job Title' in employee job title field
     */
    selectJobTitle() {
        cy.get(pim.lblEmpTabs).contains('Job Title').parent().next().find(pim.drpdownWithOption).click()
        cy.get(pim.textlistUser).first().click()
    }

    /**
     * @author: sathish
     * Select 'Job Category' in employee job category field
     */
    selectJobCategory() {
        cy.get(pim.lblEmpTabs).contains('Job Category').parent().next().find(pim.drpdownWithOption).click()
        cy.get(pim.textlistUser).first().click()
    }

    /**
     * @author: sathish
     * Select 'Sub Unit' in employee job sub unit field
     */
    selectSubUnit() {
        cy.get(pim.lblEmpTabs).contains('Sub Unit').parent().next().find(pim.drpdownWithOption).click()
        cy.get(pim.textlistUser).first().click()
    }

    /**
     * @author: sathish
     * Select 'Job Location' in employee job location field
     */
    selectJobLocation() {
        cy.get(pim.lblEmpTabs).contains('Location').parent().next().find(pim.drpdownWithOption).click()
        cy.get(pim.textlistUser).first().click()
    }

    /**
     * @author: sathish
     * Select 'Employee Status' in employee status field
     */
    selectEmpStatus() {
        cy.get(pim.lblEmpTabs).contains('Employment Status').parent().next().find(pim.drpdownWithOption).click()
        cy.get(pim.textlistUser).first().click()
    }

    /**
     * @author: sathish
     * Enter 'Joined Date' in employee job joined date field
     * @param {*} joinedDate 
     */
    enterJoinedDate(joinedDate) {
        cy.get(pim.datePicker).type(joinedDate)
    }

    /**
     * @author: sathish
     * Click 'Save' button to save employee job details
     */
    saveJobDetails() {
        cy.get(pim.btnSave).click()
    }

    /**
     * @author: sathish
     * To 'Add' Employee Job Information - joined date
     * To 'Save' Employee Job Information
     * To 'Verify' Employee Job Information is saved successfully
     * @param {*} joinedDate 
     */
    addEmpJobDetails(joinedDate) {
        this.enterJoinedDate(joinedDate)
        this.selectJobTitle()
        this.selectJobCategory()
        this.selectSubUnit()
        this.selectJobLocation()
        this.selectEmpStatus()
        this.saveJobDetails()
        this.verifySuccessMsg()
    }

}
export default PimPage