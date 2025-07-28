import userAdminData from "../fixtures/userAdminData.json"
import LoginPage from "../pages/loginPage"

const loginPage = new LoginPage()

beforeEach(()=>{
  loginPage.visitHomePage()
})

describe('when not logged in', () => {
  it('clicking on like should alert the user they need to login', () => {
    cy.get("[data-cy='like']").first().click()
    cy.contains("You must log in to like")
    cy.get("button").contains("Ok").click()
    cy.contains("You must log in to like").should("not.exist")
  })
  it('clicking on hire should alert the user they need to login', () => {
    cy.get("[data-cy='money']").first().click()
    cy.contains("You must log in to hire this hero")
    cy.get("button").contains("Ok").click()
    cy.contains("You must log in to hire this hero").should("not.exist")
  })
})

describe('when user is logged in', () => {
  beforeEach(()=>{
    loginPage.loginField(userAdminData.userEmail, userAdminData.password)
  })

  it('clicking like on a hero should increase their fan count', () => {
    
    cy.get("[data-cy='hero-card']").first().within(() => {
      cy.get("[data-cy='fans']").invoke("text").then((likeBefore) => {
        const fanCountBefore = parseInt(likeBefore)

        cy.get("[data-cy='like']").click()

        cy.get("[data-cy='fans']").invoke("text").should((likeAfter) => {
          const fanCountAfter = parseInt(likeAfter)
          expect (fanCountAfter).to.eq(fanCountBefore + 1)
        })
      })
    })
  })

  it('user should be able to hire a hero', () => {
    
    cy.get("[data-cy='saves']").first().invoke("text").then((savesBefore) =>{
      const savesCountBefore = parseInt(savesBefore)

      cy.get("[data-cy='money']").first().click()
      cy.contains("Yes").click()

      
      cy.get("[data-cy='saves']").first().invoke("text").then((savesAfter) => {
        const savesCountAfter = parseInt(savesAfter)
        expect (savesCountAfter).to.eq(savesCountBefore + 1)

      })
    })
  }) 
  
  it('user should be able to decline a hero', () => {
    
    cy.get("[data-cy='saves']").first().invoke("text").then((savesBefore) => {
      const savesCountBefore = parseInt(savesBefore)

      cy.get("[data-cy='money']").first().click()
      cy.contains("No").click()

      cy.get("[data-cy='saves']").first().invoke("text").then((savesAfter) => {
        const savesCountAfter = parseInt(savesAfter)
        expect (savesCountAfter).to.eq(savesCountBefore)
      })

    })
    
  })
})


