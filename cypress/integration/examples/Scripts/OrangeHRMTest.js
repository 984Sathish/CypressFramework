import FakerObject from '../Utils/FakerObject'
import LoginPage from '../Pages/LoginPage';
import DashboardPage from '../Pages/DashboardPage';
import PimPage from '../Pages/PimPage';
import AdminPage from '../Pages/AdminPage';
import LeavePage from '../Pages/LeavePage';

const excelFilePath = "C:/Users/sathish.suresh/Documents/CypressFramework/dataFile.xlsx"
const sheetName = 'CreateUser'

const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()
const pimpage = new PimPage()
const adminPage = new AdminPage()
const leavePage = new LeavePage()

beforeEach(function () {
    cy.task('generateJSONFromExcel', { excelFilePath, sheetName }).then(
        (data) => {
            cy.visit(Cypress.env('appURL'))
            loginPage.loginToApplication(data[0].Username, data[0].Password)
        })
})

describe('OrangeHRM Test Automation', function () {

    it('Create Employee', function () {
        const fk = new FakerObject()
        dashboardPage.verifyDashboardPage()
        dashboardPage.clickMainMenu('PIM')
        pimpage.addNewEmployee(fk.firstName, fk.lastName)
        dashboardPage.clickMainMenu('PIM')
        pimpage.searchEmployee(fk.firstName, fk.lastName)
        pimpage.verifyEmployeeIsPresent()
    })

    it('Create Admin', function () {
        const fk = new FakerObject()
        dashboardPage.verifyDashboardPage()
        dashboardPage.clickMainMenu('PIM')
        pimpage.addNewEmployee(fk.firstName, fk.lastName)
        dashboardPage.clickMainMenu('Admin')
        adminPage.addNewAdmin(fk.firstName, fk.lastName, fk.username, fk.password, fk.role, fk.status)
        adminPage.verifyFilterTableIsDisplayed()
        adminPage.searchAdmin(fk.username)
        adminPage.verifyAdminIsPresent()
    })


    it('Add Employee Personal Information', function(){
        const fk = new FakerObject()
        dashboardPage.verifyDashboardPage()
        dashboardPage.clickMainMenu('PIM')
        pimpage.addNewEmployee(fk.firstName, fk.lastName)
        dashboardPage.clickMainMenu('PIM')
        pimpage.searchEmployee(fk.firstName, fk.lastName)
        pimpage.clickEmployee()
        pimpage.addEmpPersonalInfo(fk.nationality, fk.maritalStatus, fk.dob, fk.gender)
        pimpage.addEmpCustomDetails(fk.bloodType)  
    })

    it('Add Employee Contact Details', function(){
        const fk = new FakerObject()
        dashboardPage.verifyDashboardPage()
        dashboardPage.clickMainMenu('PIM')
        pimpage.addNewEmployee(fk.firstName, fk.lastName)
        dashboardPage.clickMainMenu('PIM')
        pimpage.searchEmployee(fk.firstName, fk.lastName)
        pimpage.clickEmployee()
        pimpage.clickSubMenu('Contact Details')
        pimpage.addEmpContactDetails(fk.street, fk.city, fk.state, fk.country, fk.zipCode, fk.mobileNumber, fk.email)
    })
    
    it('Add Employee Job Details', function(){
        const fk = new FakerObject()
        dashboardPage.verifyDashboardPage()
        dashboardPage.clickMainMenu('PIM')
        pimpage.addNewEmployee(fk.firstName, fk.lastName)
        dashboardPage.clickMainMenu('PIM')
        pimpage.searchEmployee(fk.firstName, fk.lastName)
        pimpage.clickEmployee()
        pimpage.clickSubMenu('Job')
        pimpage.addEmpJobDetails(fk.joinedDate)
    })

    it('Assign Leave to employee', function(){
        const fk = new FakerObject()
        dashboardPage.verifyDashboardPage()
        dashboardPage.clickMainMenu('PIM')
        pimpage.addNewEmployee(fk.firstName, fk.lastName)
        dashboardPage.clickMainMenu('Leave')
        leavePage.clickMoreBtn()
        leavePage.clickSubMenu('Assign Leave')
        leavePage.assignLeaveToEmp(fk.firstName, fk.lastName, fk.leaveType, fk.leaveDate, fk.leaveDuration)
    })

})