class navigatoins{
    elements = {
        adminTab: () => cy.get(':nth-child(1) > .oxd-main-menu-item'),
        userManagementTab: () => cy.get('.oxd-topbar-body-nav > ul > :nth-child(1)'),
    }   

    clickonAdminTab(){
        this.elements.adminTab().click();
    }
}

export default navigatoins