import userAdminData from "../fixtures/userAdminData.json"
import LoginPage from "../pages/loginPage"

const loginPage = new LoginPage()

beforeEach(()=>{
  loginPage.visitHomePage()
  loginPage.loginField(userAdminData.adminEmail, userAdminData.password)
})

describe('when admin is logged in', () => {
  it('should display hero cards with information and admin actions', () => {
    cy.get("[data-cy='hero-card']").first().within(() => {
        cy.get("[data-cy='price']").should("exist")
        cy.get("[data-cy='fans']").should("exist")
        cy.get("[data-cy='saves']").should("exist")
        cy.get("[data-cy='name']").should("exist")
        cy.get("[data-cy='pencil']").should("be.visible")
        cy.get("[data-cy='trash']").should("be.visible")
    })
   
  })

  it('editing hero should save and display on home page', () => {
    cy.get("[data-cy='pencil']").first().click()
    cy.get("[data-cy='nameInput']").clear().type("The Fire")
    cy.get("[data-cy='priceInput']").clear().type("10")
    cy.get("button").contains("Submit").click()

    cy.get("[data-cy='hero-card']").first().within(() => {
        cy.get("[data-cy='price']").contains("10")
        cy.get("[data-cy='name']").contains("The Fire")
    })
  })
  it('adding hero should save and display on home page', () => {
    cy.get("[href='/heroes/new']").click()
    cy.get("[data-cy='nameInput']").type(" The 7 lives")
    cy.get("[data-cy='priceInput']").type("30")
    cy.get("[data-cy='fansInput']").type("40")
    cy.get("[data-cy='savesInput']").type("50")
    cy.get("[data-cy='powersSelect']").select("Telekinesis")
    cy.get("button").contains("Submit").click()
  })
  it('should be able to upload new avatar', () => {
    cy.contains("[data-cy='hero-card']", "The 7 lives").find("[data-cy='pencil']").click()
    cy.get("[data-cy='avatarFile']").selectFile("./cypress/fixtures/avatar.jpg")
    cy.get("button").contains("Submit").click()

    cy.contains("[data-cy='hero-card']", "The 7 lives").find('img') .should('have.attr', 'src').and('include', '/avatar')
  })
  it('should be able to delete a hero', () => {
    cy.contains("[data-cy='hero-card']", "The 7 lives").find("[data-cy='trash']").click()
    cy.get("button").contains("Yes").click()
    cy.contains("[data-cy='hero-card']", "The 7 lives").should("not.exist")
   
  })

})