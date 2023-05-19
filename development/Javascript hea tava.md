Vabandust segaduse pärast! Siin on täielik juhend:

# Javascripti hea praktika juhend

## Sisukord

1. [Muutujad](#Muutujad)
2. [Võrdlused](#Võrdlused)
3. [Funktsioonid](#Funktsioonid)
4. [Plokkide kasutamine](#Plokkide-kasutamine)
5. [Kommentaarid](#Kommentaarid)
6. [Vead](#Vead)
7. [Koodi formaatimine](#Koodi-formaatimine)
8. [Sündmuste käsitsemine](#Sündmuste-käsitsemine)
9. [Väldi eval() kasutamist](#Väldi-eval()-kasutamist)
10. [Ära laienda JavaScripti sisseehitatud objekte](#Ära-laienda-JavaScripti-sisseehitatud-objekte)
11. [Ära kasuta obsoletseid funktsioone](#Ära-kasuta-obsoletseid-funktsioone)
12. [Ära kasuta dokument.write()](#Ära-kasuta-dokument.write())
13. [Kasuta === võrdlust](#Kasuta-===-võrdlust)
14. [Hoia oma koodi lühikesena ja loetavana](#Hoia-oma-koodi-lühikesena-ja-loetavana)
15. [Muuda oma kood modulariseerituks](#Muuda-oma-kood-modulariseerituks)
16. [Järgi tüüpikindlat võrdlust](#Järgi-tüüpikindlat-võrdlust)
17. [Väldi globaalseid muutujaid](#Väldi-globaalseid-muutujaid)
18. [Kasuta semikooloneid](#Kasuta-semikooloneid)
19. [Väldi inline manustamist](#Väldi-inline-manustamist)
20. [Väldi setTimeout() ja setInterval()](#Väldi-setTimeout()-ja-setInterval())
21. [Ära kasuta HTML kommentaare JavaScriptis](#Ära-kasuta-HTML-kommentaare-JavaScriptis)
22. [Kasuta alglaadimise optimeerimist](#Kasuta-alglaadimise-optimeerimist)
23. [Väldi negatiivsete tingimuslausetega](#Väldi-negatiivsete-tingimuslausetega)
24. [Väldi süntaksilisi lühendeid](#Väldi-süntaksilisi-lühendeid)
25. [Kasuta .js laiendust](#Kasuta-.js-laiendust)
26. [Testimine](#Testimine)
27. [Koodi läbivaatamine](#Koodi-läbivaatamine)
28. [Muutujate nimetamine](#Muutujate-nimetamine)
29. [Koodi taaskasutamine](#Koodi-taaskasutamine)
30. [Optimeeri jõudlust](#Opt

imeeri-jõudlust)
31. [Kasuta väliseid skripte](#Kasuta-väliseid-skripte)
32. [Kasuta CDN-e](#Kasuta-CDN-e)
33. [Pidage oma JavaScripti ajakohasena](#Pidage-oma-JavaScripti-ajakohasena)

---

## Muutujad

Alati, kui määratled muutuja, kasuta `let` või `const` sõna. Vastasel juhul muutuja muutub globaalseks, isegi kui see on määratletud funktsiooni sees ([viide](https://google.github.io/styleguide/jsguide.html#features-use-const-and-let)).

```javascript
// Halb
x = 1; 

// Hea
let x = 1;
```

---

## Võrdlused

Võrdluste puhul kasuta alati kolm korda võrdusmärki `===`. See tähendab, et ka tüüpe kontrollitakse ([viide](https://eslint.org/docs/rules/eqeqeq)).

```javascript
// Halb
if (x == 1) { /* ... */ }

// Hea
if (x === 1) { /* ... */ }
```

---

## Funktsioonid

Funktsioonide nimetamisel kasuta camelCase stiili. Samuti peaks funktsiooni nimi olema verb või verbifraas ([viide](https://google.github.io/styleguide/jsguide.html#naming-rules-common-to-all-identifiers)).

```javascript
// Halb
function itemsarray() { /* ... */ }

// Hea
function getItems() { /* ... */ }
```

---

## Plokkide kasutamine

Alati, kui sul on mitu ploki või lauset, kasuta sulge, et määrata ploki piire ([viide](https://google.github.io/styleguide/jsguide.html#formatting-braces)).

```javascript
// Halb
if (x)
  doSomething();

// Hea
if (x) {
  doSomething();
}
```

---

## Kommentaarid

Kommentaarid peaksid olema piisavalt selged, et teised arendajad saaksid teie koodi kiiresti mõista. Samuti on kasulik lisada funktsioonidele JSDoc kommentaare, mis kirjeldavad funktsiooni sisendit ja väljundit ([viide](https://google.github.io/styleguide/jsguide.html#jsdoc)).

```javascript
/**
 * Arvutab ruudu pindala.
 *
 * @param {number} side - ruudu külg.
 * @return {number} Ruudu pindala.
 */
function calculateSquareArea(side) {
  return side * side;
}
```

---

## Vead

Vead peaksid alati olema korralikult käideldud. Ärge jätke veaolukordi märkamata. Kasutage `try/catch` lauseid, et veaolukorrad korralikult käsitseda ([viide](https://google.github.io/styleguide/jsguide.html#features-exceptions)).

```javascript
try {
  performRiskyOperation();
} catch (e) {
  console.error

(e);
}
```

---

## Koodi formaatimine

Alati, kui kirjutate koodi, peaksite järgima mõningaid põhilisi formaatimise reegleid, et hoida oma koodi korras ja loetav. Näiteks peaks teie koodis olema korralik joondamine, kasutama õigeid taandeid jne ([viide](https://google.github.io/styleguide/jsguide.html#formatting)).

```javascript
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
```

---

## Sündmuste käsitsemine

Vältige otsest DOM-sündmuste seostamist. Selle asemel kasutage sündmuse lisajat ([viide](https://google.github.io/styleguide/jsguide.html#features-evt-registerListener)).

```javascript
// Halb
<button onclick="doSomething();">Click me</button>

// Hea
let button = document.querySelector('button');
button.addEventListener('click', doSomething);
```

---

## Väldi eval() kasutamist

`eval()` funktsioon võib käivitada arvutis ohtliku koodi ja peaks olema välditud ([viide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!)).

```javascript
// Halb
eval('2 + 2');

// Hea
2 + 2;
```

---

## Ära laienda JavaScripti sisseehitatud objekte

JavaScripti sisseehitatud objektide laiendamine võib põhjustada ootamatuid tulemusi ja tuleks vältida ([viide](https://eslint.org/docs/rules/no-extend-native)).

```javascript
// Halb
Array.prototype.duplicate = function() {
  return this.concat(this);
};

// Hea
function duplicateArray(array) {
  return array.concat(array);
}
```

---

## Ära kasuta obsoletseid funktsioone

Mõned JavaScripti funktsioonid on vananenud või ei ole standardid. Neid ei tohiks kasutada ([viide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)).

```javascript
// Halb
with (obj) {
  doSomething();
}

// Hea
doSomething(obj);
```

---

## Ära kasuta dokument.write()

`document.write()` on aegunud ja seda ei tohiks kasutada ([viide](https://google.github.io/styleguide/jsguide.html#disallowed-features-document.write)).

```javascript
// Halb
document.write('<h1>Hello World!</h1>');

// Hea
document.body.innerHTML = '<h1>Hello World!</h1>';
```

---

## Kasuta === võrdlust

Alati, kui võrdlete kahte väärtust, kasutage kolme võrdusmärki `===`. See tähendab, et ka tüüpe kontrollitakse ([viide](https://google.github.io/styleguide/jsguide.html#features-equality-checks-exceptions)).

```javascript
// Halb
if (x == 1) { /* ...

 */ }

// Hea
if (x === 1) { /* ... */ }
```

---

## Hoia oma koodi lühikesena ja loetavana

Kui teil on liiga pikk funktsioon või muutuja, murdke see väiksemateks osadeks. Lühemad funktsioonid ja muutujad on lihtsam lugeda ja mõista ([viide](https://eslint.org/docs/rules/max-len)).

```javascript
// Halb
let veryLongVariableNameThatGoesOnForever = 'Hello World!';

// Hea
let greeting = 'Hello World!';
```

---

## Muuda oma kood modulariseerituks

Suured koodibaasid võivad muutuda väga keeruliseks ja raskesti hooldatavaks, kui neid ei struktureerita korralikult. Proovige oma koodi modulariseerida, et seda oleks lihtsam hooldada ja mõista ([viide](https://github.com/airbnb/javascript#modules)).

```javascript
// Halb
var x = 1;
var y = 2;
var z = x + y;

// Hea
import add from './add';

var x = 1;
var y = 2;
var z = add(x, y);
```

---

## Järgi tüüpikindlat võrdlust

JavaScriptis on kaks võrdlusoperaatorit: `==` ja `===`. Esimene, `==`, teeb tüübi konversiooni enne võrdlemist, mis võib põhjustada ootamatuid tulemusi. Teine, `===`, ei tee tüübimuundust, seega on see turvalisem ja peaks olema eelistatud ([viide](https://google.github.io/styleguide/jsguide.html#features-equality-checks-exceptions)).

```javascript
// Halb
if (x == '10') { /* ... */ }

// Hea
if (x === '10') { /* ... */ }
```

---

## Väldi globaalseid muutujaid

Globaalsed muutujad võivad olla ohtlikud, kuna neid saab mis tahes kohas muuta. Proovige vältida globaalsete muutujate kasutamist nii palju kui võimalik ([viide](https://google.github.io/styleguide/jsguide.html#features-use-const-and-let)).

```javascript
// Halb
var x = 1;

// Hea
let x = 1;
```

---

## Kasuta semikooloneid

Semikoolonid peaksid olema koodi lõpus, et vältida sõnastamisprobleeme ([viide](https://eslint.org/docs/rules/semi)).

```javascript
// Halb
let x = 1

// Hea
let x = 1;
```

---

## Väldi inline manustamist

Koodi manustamist HTML-sse tuleks vältida. Selle asemel peaksite oma JavaScripti lisama eraldi .js failide abil ([viide](https://google.github.io/styleguide/jsguide.html#disallowed-features-eval-and-new-function)).

```html
<!-- Halb -->
<button onclick="doSomething();">Click me

</button>

<!-- Hea -->
<button id="myButton">Click me</button>
<script src="script.js"></script>
```

---

## Väldi setTimeout() ja setInterval()

`setTimeout()` ja `setInterval()` funktsioonid võivad põhjustada probleeme, kuna nad töötavad asünkroonselt. Proovige neid vältida ja kasutada asünkroonse koodi haldamiseks muid võtteid, nagu lubadused või async/await ([viide](https://eslint.org/docs/rules/no-set-interval)).

```javascript
// Halb
setTimeout(doSomething, 1000);

// Hea
await new Promise(resolve => setTimeout(resolve, 1000));
doSomething();
```

---

## Ära kasuta HTML kommentaare JavaScriptis

JavaScripti koodis ei tohiks kasutada HTML kommentaare. Kasutage selle asemel kahekordse kaldkriipsuga kommentaare või JSDoc'i ([viide](https://google.github.io/styleguide/jsguide.html#formatting-comments)).

```javascript
// Halb
<!-- This is a comment -->

// Hea
// This is a comment
```

---

## Kasuta alglaadimise optimeerimist

Optimeerige oma veebilehe laadimisaega, laadides JavaScripti asünkroonselt. See tähendab, et skripti laadimine ei blokeeri lehe ülejäänud osa laadimist ([viide](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/javascript-startup-optimization)).

```html
<!-- Halb -->
<script src="script.js"></script>

<!-- Hea -->
<script async src="script.js"></script>
```

---

## Väldi negatiivsete tingimuslausetega

Negatiivsed tingimuslausendid võivad olla raskemini loetavad. Proovige neid vältida, kui võimalik ([viide](https://eslint.org/docs/rules/no-negated-condition)).

```javascript
// Halb
if (!notTrue) { /* ... */ }

// Hea
if (isTrue) { /* ... */ }
```

---

## Väldi süntaksilisi lühendeid

Süntaksilised lühendid võivad olla raskemini mõistetavad, eriti algajatele. Proovige neid vältida, kui võimalik ([viide](https://eslint.org/docs/rules/no-plusplus)).

```javascript
// Halb
x++;

// Hea
x += 1;
```

---

## Kasuta .js laiendust

Kui teete JavaScripti faile, veenduge, et neil oleks .js laiendus. See aitab mõista, et fail sisaldab JavaScripti koodi ([viide](https://eslint.org/docs/rules/consistent-return)).

```html
<!-- Halb -->
<script src="script"></script>

<!-- Hea -->
<script src="script.js"></script>
```

---

## Testimine

Testimine on oluline osa arendusprotsessist. Veenduge, et teil oleksid testid, mis kinnitavad teie koodi korrektsust ([viide](https://jestjs.io/)).

```javascript
// Testi näide

 Jest raamistikuga
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

---

## Optimeeri jõudlust

Väldi tarbetuid koodi kordusi, kasuta mälu tõhusalt ja optimeeri oma koodi jõudlust nii palju kui võimalik ([viide](https://developers.google.com/web/fundamentals/performance)).

```javascript
// Halb
for (let i = 0; i < largeArray.length; i++) {
  // ...
}

// Hea
const length = largeArray.length;
for (let i = 0; i < length; i++) {
  // ...
}
```

---

## Kasuta väliseid skripte

Ärge kirjutage kogu oma JavaScripti HTML-faili. Selle asemel kasutage väliseid .js faile ([viide](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript)).

```html
<!-- Halb -->
<script>
  function doSomething() { /* ... */ }
</script>

<!-- Hea -->
<script src="script.js"></script>
```

---

## Kasuta CDN-e

Kui kasutate mõnda populaarset JavaScripti teeki või raamistikku, võiksite kaaluda selle laadimist sisu kohaletoimetamise võrgustiku (CDN) kaudu. See võib suurendada laadimiskiirust, kuna paljudel külastajatel võib olla teek juba vahemällu laaditud ([viide](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript)).

```html
<!-- Halb -->
<script src="jquery.js"></script>

<!-- Hea -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
```

---

## Pidage oma JavaScripti ajakohasena

JavaScript on pidevalt arenev keel, nii et veenduge, et te hoiaksite oma teadmised ja kood ajakohasena. Jälgige viimaseid arenguid ja ärge kartke neid oma projektidesse rakendada ([viide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript)).

```javascript
// Halb (vananenud kood)
var x = 1;

// Hea (ajakohane kood)
let x = 1;
```

---

See on minu soovituste lõpp. Loodetavasti leiate need näpunäited kasulikud ja aitavad teil kirjutada paremat, loetavamat ja tõhusamat JavaScripti koodi. Õnnelikku kodeerimist!
