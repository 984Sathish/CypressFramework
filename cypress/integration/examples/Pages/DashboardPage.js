const dashboard = {
    "btnMenu": "span[class*='oxd-main-menu-item--name']"
}

class DashboardPage {

    /**
     * @author: sathish 
     * Verify 'Dashboard Page URL'
     */
    verifyDashboardPage() {
        cy.url().should('include', 'dashboard')
    }

    /**
     * @author: sathish 
     * Click 'Main Menu' based on Menu Name 
     * @param {*} menuName 
     */
    clickMainMenu(menuName) {
        cy.get(dashboard.btnMenu).contains(menuName).click()
    }

}
export default DashboardPage