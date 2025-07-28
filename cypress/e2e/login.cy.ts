import userAdminData from "../fixtures/userAdminData.json"
import LoginPage from "../pages/loginPage"

const loginPage = new LoginPage()

beforeEach(()=>{
  loginPage.visitHomePage()
})

describe('Login Tests', () => {
  it('should log in successfully as a regular user', () => {
    loginPage.loginField(userAdminData.userEmail, userAdminData.password)
    loginPage.checkUserLogin()
  })

  it('should log in successfully as an admin', () => {
    loginPage.loginField(userAdminData.adminEmail, userAdminData.password)
    loginPage.checkAdminLogin()
  })

  it('should show an error message for incorret password', () => {
    loginPage.loginField(userAdminData.adminEmail, userAdminData.invalidPassword)
    loginPage.checkErrorLogin()
  })

  it('should show an error message for invalid email', () => {
    loginPage.loginField(userAdminData.invalidEmail, userAdminData.password)
    loginPage.checkErrorLogin()
  })
})