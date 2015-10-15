var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();
var page;
driver.get('http://www.cc.gov.eg/Legislations/Egypt_Legislations.aspx');
page= "javascript:__doPostBack(\'ctl00$MainContent$GridView1\',\'Page$1\')"
driver.findElement(By.css('[href^="'+page+'"]')).click();
driver.executeScript(function() {
    return document.querySelector('#MainContent_GridView1').innerHTML;
  }).then(function(innerHTML) {
   	console.log(innerHTML);
  });
//driver.quit();
