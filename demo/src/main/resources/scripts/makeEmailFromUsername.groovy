def firstname = execution.getVariable("firstname")
def lastname = execution.getVariable("lastname")

def email = firstname.toLowerCase() + "." + lastname.toLowerCase() + "@example.com"

// Ergebnis im Prozesskontext speichern
return email