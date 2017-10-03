const Nightmare = require('nightmare');   
const assert = require('assert');
const prompt = require('prompt-promise');
var browser = Nightmare({ show: true });

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

async function run() {
  let username = await prompt("username: ");
  let password = await prompt.password("password: ");
  
  while (true) {
  
  try {
    console.log("Connexion à la page de test...");
    await browser.goto('http://novelupdates.com');

    if (await browser.exists('.newfrmposts')) {
      //console.log("Déjà connecté à internet");
      //await browser.end();
      continue;
    }

    //console.log("connecté!");

    //assert(await browser.exists('input[name="username"]'), "Pas d'endroit où mettre le login");
    browser.type('input[name="username"]', username);
    browser.type('input[name="password"]', password);

    browser.evaluate(() => submitAction());

    console.log ("Submit effectué!");

    //browser.end();

  } catch(err) {
    console.error(err);
  }
  
  sleep(10000); 
  }

  browser.end();
}

run();
