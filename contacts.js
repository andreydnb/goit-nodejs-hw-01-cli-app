const fs = require("fs/promises")
const path = require("path")
const { randomUUID } = require('crypto')

const contactsPath = path.join(__dirname, "./db/contacts.json")

const readContent = async () => {
    const content = await fs.readFile(contactsPath, 'utf8')
    const result = JSON.parse(content)
    return result
}


 async function listContacts() {
  return await readContent()
}

async function getContactById(contactId) {
  const contacts = await readContent()
  const [contact] = contacts.filter((c) => c.id === contactId)
  return contact
}

async function removeContact(contactId) {
  const contacts = await readContent()
  const [contact] = contacts.filter((c) => c.id === contactId)
  const renewedContacts = contacts.filter((c) => c.id !== contactId)
  await fs.writeFile(contactsPath, JSON.stringify(renewedContacts, null, 2))
  return contact;
}

async function addContact(name, email, phone) {
  const contacts = await readContent()
  const newContact = { id: randomUUID(), name, email, phone }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}

module.exports = {listContacts, getContactById, removeContact, addContact}