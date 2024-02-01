const leave = {
    "topOrderMenu": "[class='oxd-topbar-body-nav-tab-item']",
    "topOrderdrpdwnMenu": "[class='oxd-topbar-body-nav-tab-link --more']",
    "fldAutoComplete": "[class='oxd-autocomplete-wrapper']",
    "lblOption": "[class='oxd-label oxd-input-field-required']",
    "drpdownWithOption": "[class='oxd-select-wrapper']",
    "datePicker": "[class='oxd-date-input']",
    "drpdwnEmp": "[placeholder='Type for hints...']",
    "listUser": "[role='listbox']",
    "userTable": "div[class='oxd-table-card']",
    "btnSave": "[type='submit']",
    "lblFixOption": "[class='oxd-label']",
    "msgSuccess": "p[class*='oxd-text--toast-message']",
    "btnDialogOk": "[role='document'] [type='button']"
}

class LeavePage {

    /**
     * @author: Sathish
     * Click 'More' button to navigate more nav menu options
     */
    clickMoreBtn() {
        cy.get(leave.topOrderMenu).contains('More').click()
    }

    /**
     * @author: Sathish
     * Click 'Sub Menu' based on sub nav menu name
     * @param {*} subMenuName 
     */
    clickSubMenu(subMenuName) {
        cy.get(leave.topOrderdrpdwnMenu).contains(subMenuName).click()
    }

    /**
     * @author: Sathish
     * Enter 'First Name' and 'Last Name' in employee name field
     * @param {*} firstName 
     * @param {*} lastName 
     */
    enterEmployeeName(firstName, lastName) {
        cy.get(leave.lblOption).contains('Employee Name').parent().next().find(leave.drpdwnEmp).type(firstName + " ",)
        cy.get(leave.listUser).contains(lastName).click()
    }

    /**
     * @author: Sathish
     * Select 'Leave Type' in leave type dropdown
     * @param {*} leaveType 
     */
    selectLeaveType(leaveType) {
        cy.get(leave.lblOption).contains('Leave Type').parent().next().find(leave.drpdownWithOption).click()
        cy.get(leave.listUser).contains(leaveType).click()
    }

    /**
     * @author: Sathish
     * Enter 'From Date' in leave from date field
     * DoubleClick 'To Date' in leave to date field
     * @param {*} leaveDate 
     */
    enterLeaveDate(leaveDate) {
        cy.get(leave.datePicker).first().type(leaveDate, { delay: 200 })
        cy.get(leave.datePicker).last().dblclick()
    }

    /**
     * @author: Sathish
     * Select 'Leave Duration' in leave duration dropdown
     * @param {*} leaveDuration 
     */
    slectLeaveDuration(leaveDuration) {
        cy.get(leave.lblFixOption).contains('Duration').parent().next().find(leave.drpdownWithOption).click()
        cy.get(leave.listUser).contains(leaveDuration).click()
    }

    /**
     * @author: Sathish
     * Click 'Assign' button to assign leave
     */
    clickAssignBtn() {
        cy.get(leave.btnSave).click()
    }

    /**
     * @author: Sathish
     * Click 'Ok' button to confirm assign leave
     */
    clickOkBtn() {
        cy.get(leave.btnDialogOk).last().should('be.visible').click()
    }

    /**
     * @author: Sathish
     * To Verify 'Success Message' that confirms assign leave information is saved.
     */
    verifySuccessMsg() {
        cy.get(leave.msgSuccess).should('be.visible')
    }

    /**
     * @author: Sathish
     * To 'Add' Leave Information - firstName, lastName, leaveType, leaveDate, leaveDuration
     * To 'Assign' Leave Information to employee 
     * To 'Verify' Leave Information is assigned successfully  
     * @param {*} firstName 
     * @param {*} lastName 
     * @param {*} leaveType 
     * @param {*} leaveDate 
     * @param {*} leaveDuration 
     */
    assignLeaveToEmp(firstName, lastName, leaveType, leaveDate, leaveDuration) {
        this.enterEmployeeName(firstName, lastName)
        this.selectLeaveType(leaveType)
        this.enterLeaveDate(leaveDate)
        this.slectLeaveDuration(leaveDuration)
        this.clickAssignBtn()
        this.clickOkBtn()
        this.verifySuccessMsg()
    }
}

export default LeavePage
