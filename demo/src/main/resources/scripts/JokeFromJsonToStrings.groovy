import org.camunda.spin.json.SpinJsonNode

def json = execution.getVariable('apiResponse') as SpinJsonNode

def value = json.prop('value').stringValue()

execution.setVariable('joke', value)

