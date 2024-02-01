
const login = {
    "fldUser": "[name='username']",
    "fldPass": "[name='password']",
    "btnSubmit": "[type='submit']"
}

class LoginPage {

    enterUserName(username) {
        cy.get(login.fldUser).type(username)
    }

    enterPassword(password) {
        cy.get(login.fldPass).type(password)
    }

    clickLogin() {
        cy.get(login.btnSubmit).click()
    }

    loginToApplication(username, password) {
        this.enterUserName(username)
        this.enterPassword(password)
        this.clickLogin()
    }
}

export default LoginPage