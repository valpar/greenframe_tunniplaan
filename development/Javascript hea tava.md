Javascripti hea praktika juhend
Sisukord
Muutujad
Võrdlused
Funktsioonid
Plokkide kasutamine
Kommentaarid
Vead
Koodi formaatimine
Sündmuste käsitsemine
Väldi eval() kasutamist
Ära laienda JavaScripti sisseehitatud objekte
Ära kasuta obsoletseid funktsioone
Ära kasuta dokument.write()
Kasuta === võrdlust
Hoia oma koodi lühikesena ja loetavana
Muuda oma kood modulariseerituks
Järgi tüüpikindlat võrdlust
Väldi globaalseid muutujaid
Kasuta semikooloneid
Väldi inline manustamist
Väldi setTimeout() ja setInterval()
Ära kasuta HTML kommentaare JavaScriptis
Kasuta alglaadimise optimeerimist
Väldi negatiivsete tingimuslausetega
Väldi süntaksilisi lühendeid
Kasuta .js laiendust
Testimine
Koodi läbivaatamine
Muutujate nimetamine
Koodi taaskasutamine
Optimeeri jõudlust
Kasuta väliseid skripte
Kasuta CDN-e
Pidage oma JavaScripti ajakohasena
Muutujad
Alati, kui määratled muutuja, kasuta let või const sõna. Vastasel juhul muutuja muutub globaalseks, isegi kui see on määratletud funktsiooni sees (viide).

javascript
Copy code
// Halb
x = 1; 

// Hea
let x = 1;
Võrdlused
Võrdluste puhul kasuta alati kolm korda võrdusmärki ===. See tähendab, et ka tüüpe kontrollitakse (viide).

javascript
Copy code
// Halb
if (x == 1) { /* ... */ }

// Hea
if (x === 1) { /* ... */ }
Funktsioonid
Funktsioonide nimetamisel kasuta camelCase stiili. Samuti peaks funktsiooni nimi olema verb või verbifraas (viide).

javascript
Copy code
// Halb
function itemsarray() { /* ... */ }

// Hea
function getItems() { /* ... */ }
Plokkide kasutamine
Alati, kui sul on mitu ploki või lauset, kasuta sulge, et määrata ploki piire (viide).

javascript
Copy code
// Halb
if (x)
  doSomething();

// Hea
if (x) {
  doSomething();
}
Kommentaarid
Kommentaarid peaksid olema piisavalt selged, et teised arendajad saaksid teie koodi kiiresti mõista. Samuti on kasulik lisada funktsioonidele JSDoc kommentaare, mis kirjeldavad funktsiooni sisendit ja väljundit (viide).

javascript
Copy code
/**
 * Arvutab ruudu pindala.
 *
 * @param {number} side - ruudu külg.
 * @return {number} Ruudu pindala.
 */
function calculateSquareArea(side) {
  return side * side;
}
Vead
Vead peaksid alati olema korralikult käideldud. Ärge jätke veaolukordi märkamata. Kasutage try/catch lauseid, et veaolukorrad korralikult käsitseda (viide).

javascript
Copy code
try {
  performRiskyOperation();
} catch (e) {
  console.error(e);
}
Koodi formaatimine
Alati, kui kirjutate koodi, peaksite järgima mõningaid põhilisi formaatimise reegleid, et hoida oma koodi korras ja loetav. Näiteks peaks teie koodis olema korralik joondamine, kasutama õigeid taandeid jne (viide).

javascript
Copy code
// Halb
function foo() {
let x = 1;
if (x) {
doSomething();
}
}

// Hea
function foo() {
  let x = 1;
  if (x) {
    doSomething();
  }
}
Sündmuste käsitsemine
Vältige otsest DOM-sündmuste seostamist. Selle asemel kasutage sündmuse lisajat (viide).

javascript
Copy code
// Halb
<button onclick="doSomething();">Click me</button>

// Hea
let button = document.querySelector('button');
button.addEventListener('click', doSomething);
Väldi eval() kasutamist
eval() funktsioon võib käivitada arvutis ohtliku koodi ja peaks olema välditud (viide).

javascript
Copy code
// Halb
eval('2 + 2');

// Hea
2 + 2;
Ära laienda JavaScripti sisseehitatud objekte
JavaScripti sisseehitatud objektide laiendamine võib põhjustada ootamatuid tulemusi ja tuleks vältida (viide).

javascript
Copy code
// Halb
Array.prototype.duplicate = function() {
  return this.concat(this);
};

// Hea
function duplicateArray(array) {
  return array.concat(array);
}
Ära kasuta obsoletseid funktsioone
Mõned JavaScripti funktsioonid on vananenud või ei ole standardid. Neid ei tohiks kasutada (viide).

javascript
Copy code
// Halb
with (obj) {
  doSomething();
}

// Hea
doSomething(obj);
Ära kasuta dokument.write()
document.write() on aegunud ja seda ei tohiks kasutada (viide).

javascript
Copy code
// Halb
document.write('<h1>Hello World!</h1>');

// Hea
document.body.innerHTML = '<h1>Hello World!</h1>';
Kasuta === võrdlust
Alati, kui võrdlete kahte väärtust, kasutage kolme võrdusmärki ===. See tähendab, et ka tüüpe kontrollitakse (viide).

javascript
Copy code
// Halb
if (x == 1) { /* ... */ }

// Hea
if (x === 1) { /* ... */ }
Hoia oma koodi lühikesena ja loetavana
Kui teil on liiga pikk funktsioon või muutuja, murdke see väiksemateks osadeks. Lühemad funktsioonid ja muutujad on lihtsam lugeda ja mõista (viide).

javascript
Copy code
// Halb
let veryLongVariableNameThatGoesOnForever = 'Hello World!';

// Hea
let greeting = 'Hello World!';
Muuda oma kood modulariseerituks
Suured koodibaasid võivad muutuda väga keeruliseks ja raskesti hooldatavaks, kui neid ei struktureerita korralikult. Proovige oma koodi modulariseerida, et seda oleks lihtsam hooldada ja mõista (viide).

javascript
Copy code
// Halb
var x = 1;
var y = 2;
var z = x + y;

// Hea
import add from './add';

var x = 1;
var y = 2;
var z = add(x, y);
Järgi tüüpikindlat võrdlust
JavaScriptis on kaks võrdlusoperaatorit: == ja ===. Esimene, ==, teeb tüübi konversiooni enne võrdlemist, mis võib põhjustada ootamatuid tulemusi. Teine, ===, ei tee tüübimuundust, seega on see turvalisem ja peaks olema eelistatud (viide).

javascript
Copy code
// Halb
if (x == '10') { /* ... */ }

// Hea
if (x === '10') { /* ... */ }
Väldi globaalseid muutujaid
Globaalsed muutujad võivad olla ohtlikud, kuna neid saab mis tahes kohas muuta. Proovige vältida globaalsete muutujate kasutamist nii palju kui võimalik (viide).

javascript
Copy code
// Halb
var x = 1;

// Hea
let x = 1;
Kasuta semikooloneid
Semikoolonid peaksid olema koodi lõpus, et vältida sõnastamisprobleeme (viide).

javascript
Copy code
// Halb
let x = 1

// Hea
let x = 1;
Väldi inline manustamist
Koodi manustamist HTML-sse tuleks vältida. Selle asemel peaksite oma JavaScripti lisama eraldi .js failide abil (viide).

html
Copy code
<!-- Halb -->
<button onclick="doSomething();">Click me</button>

<!-- Hea -->
<button id="myButton">Click me</button>
<script src="script.js"></script>
Väldi setTimeout() ja setInterval()
setTimeout() ja setInterval() funktsioonid võivad põhjustada probleeme, kuna nad töötavad asünkroonselt. Proovige neid vältida ja kasutada asünkroonse koodi haldamiseks muid võtteid, nagu lubadused või async/await (viide).

javascript
Copy code
// Halb
setTimeout(doSomething, 1000);

// Hea
await new Promise(resolve => setTimeout(resolve, 1000));
doSomething();
Ära kasuta HTML kommentaare JavaScriptis
JavaScripti koodis ei tohiks kasutada HTML kommentaare. Kasutage selle asemel kahekordse kaldkriipsuga kommentaare või JSDoc'i (viide).

javascript
Copy code
// Halb
<!-- This is a comment -->

// Hea
// This is a comment
Kasuta alglaadimise optimeerimist
Optimeerige oma veebilehe laadimisaega, laadides JavaScripti asünkroonselt. See tähendab, et skripti laadimine ei blokeeri lehe ülejäänud osa laadimist (viide).

html
Copy code
<!-- Halb -->
<script src="script.js"></script>

<!-- Hea -->
<script async src="script.js"></script>
Väldi negatiivsete tingimuslausetega
Negatiivsed tingimuslausendid võivad olla raskemini loetavad. Proovige neid vältida, kui võimalik (viide).

javascript
Copy code
// Halb
if (!notTrue) { /* ... */ }

// Hea
if (isTrue) { /* ... */ }
Väldi süntaksilisi lühendeid
Süntaksilised lühendid võivad olla raskemini mõistetavad, eriti algajatele. Proovige neid vältida, kui võimalik (viide).

javascript
Copy code
// Halb
x++;

// Hea
x += 1;
Kasuta .js laiendust
Kui teete JavaScripti faile, veenduge, et neil oleks .js laiendus. See aitab mõista, et fail sisaldab JavaScripti koodi (viide).

html
Copy code
<!-- Halb -->
<script src="script"></script>

<!-- Hea -->
<script src="script.js"></script>
Testimine
Testimine on oluline osa arendusprotsessist. Veenduge, et teil oleksid testid, mis kinnitavad teie koodi korrektsust (viide).

javascript
Copy code
// Testi näide Jest raamistikuga
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
Optimeeri jõudlust
Väldi tarbetuid koodi kordusi, kasuta mälu tõhusalt ja optimeeri oma koodi jõudlust nii palju kui võimalik (viide).

javascript
Copy code
// Halb
for (let i = 0; i < largeArray.length; i++) {
  // ...
}

// Hea
const length = largeArray.length;
for (let i = 0; i < length; i++) {
  // ...
}
Kasuta väliseid skripte
Ärge kirjutage kogu oma JavaScripti HTML-faili. Selle asemel kasutage väliseid .js faile (viide).

html
Copy code
<!-- Halb -->
<script>
  function doSomething() { /* ... */ }
</script>

<!-- Hea -->
<script src="script.js"></script>
Kasuta CDN-e
Kui kasutate mõnda populaarset JavaScripti teeki või raamistikku, võiksite kaaluda selle laadimist sisu kohaletoimetamise võrgustiku (CDN) kaudu. See võib suurendada laadimiskiirust, kuna paljudel külastajatel võib olla teek juba vahemällu laaditud (viide).

html
Copy code
<!-- Halb -->
<script src="jquery.js"></script>

<!-- Hea -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
Pidage oma JavaScripti ajakohasena
JavaScript on pidevalt arenev keel, nii et veenduge, et te hoiaksite oma teadmised ja kood ajakohasena. Jälgige viimaseid arenguid ja ärge kartke neid oma projektidesse rakendada (viide).

javascript
Copy code
// Halb (vananenud kood)
var x = 1;

// Hea (ajakohane kood)
let x = 1;
