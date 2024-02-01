const admin = {
    "btnAdd": "button",
    "drpdwnUser": ".oxd-select-wrapper",
    "listUser": "[role='listbox']",
    "fldEmpName": "[placeholder='Type for hints...']",
    "fldUsername": "[class='oxd-input oxd-input--active']",
    "fldPassword": "[type='password']",
    "btnSave": "[type='submit']",
    "msgSuccess": "p[class*='oxd-text--toast-message']",
    "filterTable": ".oxd-table-filter",
    "btnSearch": "[type='submit']",
    "userTable": "div[class='oxd-table-card']"
}

class AdminPage {

    /**
     * @author: Sathish
     * Click 'Add' button to navigate admin add page
     */
    clickAddBtn() {
        cy.get(admin.btnAdd).contains('Add').click()
    }

    /**
     * @author: Sathish
     * Enter 'First Name' and 'Last Name' in employee name field
     * @param {*} firstName 
     * @param {*} lastName 
     */
    enterEmployeeFullName(firstName, lastName) {
        cy.get(admin.fldEmpName).type(firstName + " ", { timeout: 8000 })
        cy.get(admin.listUser).contains(lastName).click()
    }

    /**
     * @author: Sathish
     * Enter 'User Name' in admin username field
     * @param {*} username 
     */
    enterAdminUserName(username) {
        cy.get(admin.fldUsername).eq(1).type(username)
    }

    /**
     * @author: Sathish
     * Select 'Role' in admin role dropdown
     * @param {*} role 
     */
    selectAdminRole(role) {
        cy.get(admin.drpdwnUser).first().click()
        cy.get(admin.listUser).contains(role).click()
    }

    /**
     * @author: Sathish
     * Select 'Status' in admin status dropdown
     * @param {*} status 
     */
    selectAdminStatus(status) {
        cy.get(admin.drpdwnUser).last().click()
        cy.get(admin.listUser).contains(status).click()
    }

    /**
     * @author: Sathish
     * Enter 'Password' in admin password field
     * @param {*} password 
     */
    enterAdminPassword(password) {
        cy.get(admin.fldPassword).first().type(password)
    }

    /**
     * @author: Sathish
     * Enter 'Confirm Password' in admin confirm password field
     * @param {*} password 
     */
    enterAdminConfirmPassword(password) {
        cy.get(admin.fldPassword).last().type(password)
    }

    /**
     * @author: Sathish
     * Click 'Save' button to save admin information
     */
    saveAdmin() {
        cy.get(admin.btnSave).click()
    }

    /**
     * @author: Sathish
     * To Verify 'Success Message' that confirms the information is saved.
     */
    verifySuccessMsg() {
        cy.get(admin.msgSuccess).should('be.visible')
    }

    /**
     * @author: Sathish
     * Click 'Search' button to search admin 
     */
    clicksearch() {
        cy.get(admin.btnSearch).click()
    }

    /**
     * @author: Sathish
     * Verify 'Admin' is present or not
     */
    verifyAdminIsPresent() {
        cy.get(admin.userTable).should('have.length', 1)
    }

    /**
     * @author: Sathish
     * To 'Add' Admin Information - firstname, lastname, username, role and status
     * To 'Save' Admin Information
     * To 'Verify' Admin Information is saved successfully 
     * @param {*} firstName 
     * @param {*} lastName 
     * @param {*} username 
     * @param {*} password 
     * @param {*} role 
     * @param {*} status 
     */
    addNewAdmin(firstName, lastName, username, password, role, status) {
        this.clickAddBtn()
        this.enterEmployeeFullName(firstName, lastName)
        this.enterAdminUserName(username)
        this.enterAdminPassword(password)
        this.enterAdminConfirmPassword(password)
        this.selectAdminRole(role)
        this.selectAdminStatus(status)
        this.saveAdmin()
        this.verifySuccessMsg()
    }

    /**
     * @author: Sathish
     * To 'Verify' admin filter table is present or not
     */
    verifyFilterTableIsDisplayed() {
        cy.get(admin.filterTable).should('be.visible')
    }

    /**
     * @author: Sathish
     * To 'Search' Admin based on admin username
     * @param {*} username 
     */
    searchAdmin(username) {
        this.verifyFilterTableIsDisplayed()
        this.enterAdminUserName(username)
        this.clicksearch()
    }




}
export default AdminPage