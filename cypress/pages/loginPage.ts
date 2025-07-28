class LoginPage{
   
   visitHomePage(){
    cy.visit('http://localhost:3000/heroes')
   }
    loginField(email: string,password: string){
        cy.get("button").contains("Login").click()
        cy.get("[data-cy='email']").type(email)
        cy.get("[data-cy='password']").type(password)
        cy.get("button").contains("Sign in").click()
        
    }
    checkUserLogin(){
        cy.contains("Logout").should("be.visible")
    }
    checkAdminLogin(){
        cy.contains("Create New Hero").should("be.visible")
    }
    checkErrorLogin(){
        cy.contains("Invalid email or password")
    }
} export default LoginPage