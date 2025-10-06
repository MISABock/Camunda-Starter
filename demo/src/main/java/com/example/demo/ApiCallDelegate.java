package com.example.demo;

import com.fasterxml.jackson.databind.JsonNode;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.camunda.spin.plugin.variable.SpinValues;

@Component("apiCallDelegate")
public class ApiCallDelegate implements JavaDelegate {
  @Override
  public void execute(DelegateExecution execution) {
    String url = "https://api.chucknorris.io/jokes/random";
    RestTemplate restTemplate = new RestTemplate();

    JsonNode node = restTemplate.getForObject(url, JsonNode.class);   // komplettes JSON als Baum
    execution.setVariable("apiResponse",
        SpinValues.jsonValue(node.toString()).create());               // als JSON persistieren
  }
}
