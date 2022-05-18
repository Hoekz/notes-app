
let page = {
  get editor() { return cy.get('.note-editor'); },
  get newNote() { return page.editor.find('.new-note'); },
  get titleInput() { return page.editor.find('.title'); },
  get textInput() { return page.editor.find('.text'); },
  get save() { return cy.get('.save'); },
  get remove() { return cy.get('.delete'); },
  list: {
    get active() { return cy.get('.notes-list .active .list-item'); },
  },
};

describe('Notes App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('editor', () => {  
    it('should have button in middle of page has correct text', () => {
      page.newNote.should('have.length', 1);
      page.newNote.should('have.text', 'Create New Note');
    });

    describe('editing note', () => {  
      beforeEach(() => {
        page.newNote.click();
      });

      it('should launch editor on button press', () => {
        page.titleInput.should('be.visible');
        page.titleInput.should('be.focused');
        page.textInput.should('be.visible');
      });

      it('should be able to create a new note', () => {
        page.titleInput.type('New Title');
        page.textInput.focus();
        page.textInput.type('New note.');

        page.save.click();

        page.list.active.should('contain', 'New Title');
      });

      it('should be able to delete the new note', () => {
        cy.contains('New Title').click();
        page.remove.click();

        cy.contains('New Title').should('not.exist');
      })
    });
  });
});
