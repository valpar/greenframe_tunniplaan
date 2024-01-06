# HK Tunniplaani rakendus

Eesmärgiks on 2023. aasta Valikpraktika käigus arendada edasi API'l baseeruvat tunniplaani ja kodutööde kuvamise lahendust, mis võimaldaks arenduse sujuvat jätkamist tulevikus ja integratsioone võimalike teiste süsteemidega.

Esialgseks plaaniks on arendada edasi kasutajate haldust ning testimist.

## Koosolekud

- [Link](https://github.com/TLUHK-RIF21/HK-Tunniplaan/blob/master/rif21/koosolekud.md)

## Praktikapäevikud
- [Andrus](https://github.com/TLUHK-RIF21/HK-Tunniplaan/issues/2)
- [Mario](https://github.com/TLUHK-RIF21/HK-Tunniplaan/issues/1)

## Meeskond

| **Roll**   | **Nimi** |
| ---------- | -------- |
| **Arendaja** | Andrus    |
| **Arendaja/Projektijuht** | Mario    |

## Käivitamine

### Käivitamine kohalikus arvutis
API käivitamiseks tuleb minna development/api kausta ning seal sisestada käsk npm run dev
Enne esimest käivitamist peale repositooriumi kloonimist võib olla vajalik deinstalleerida bcrypt
käisuga npm uninstall brcypt ning installeerida see uuesti npm install bcrypt
API kaustuab porti 4000 ning API toimimist saab kontrollida aadressil http://localhost:4000/ping 

Kliendirakendus tuleb käivitada kohalikus arvutis development/client kaustast käsuga npm start.
Enne esimest käivitamist peale repositooriumi kloonimist tuleks käivitada käsk npm ci 
pakettide installeerimiseks
Kliendirakendust saab avada brauserist aadressil http://localhost:3000

Selleks, et kohalikus arvutis käivitatud API saaks ühenduda Dockeris töötava andmebaasiga, tuleb development/api/src/database.ts failis asendada rida "host: 'mysql_server'," reaga "host: process.env.DB_HOST," ning lisada rida "port: Number(process.env.DB_PORT),", .env failis tuleb kirjutada vastavalt DB_HOST="localhost" ja DB_PORT="3307".

**NB!!!** Kasutades Visual Studio Code (VSCode), siis terminaliaknas cd käsuga kausta vahetamisel tuleb kindlasti kasutada suur- ja väiketähti. Vastasel juhul annab ESLint veateate.

### Käivitamine Dockeris
1. Klooni repositoorium 
```bash
git clone https://github.com/TLUHK-RIF21/HK-Tunniplaan
```
2. vali alamkaust development 
```bash
cd development
```
3. käivita docker
- esimene kord 
```bash
docker-compose build
```
- edaspidi 
```bash
docker-compose up -d
```
4. arendamisel vsc docker extension ja seal vaates "containers" juurest api peal parem klõps ja "view logs" - siis saab api-ga toimuvat näha.
5. api töötamist saab kontrollida browseris aadressil http://localhost:4000/ping
6. ühiduvust andmebaasiga browseris aadressil http://localhost:4000/schedule
7. kliendi frontend rakendus töötab browseris aadressil http://localhost:80

> Praegu võib olla probleeme sellega, et dockeri konteineri loomisel ei paigaldata korrektselt `bcrypt` npm pakett. Sellisel juhul tuleb minna `ts-node-docker` nimelisse konteinerisse, ja käivitada seal `npm uninstall bcrypt` ja `npm install bcrypt`. Seejärel tuleb konteiner taaskäivitada.

## Rakenduse laadimine serverisse
Kohalikus masinas kasutamise jaoks tuleb kliendile anda aadressiks localhost. Selleks tuleb muuta faili development/client/src/config.json. Serverisse laadimisel tuleb selles failis API aadressid asendada serveri URL'iga


## ESLint

API-poolses koodis on rakendatud ESLint koodianalüsaatorit koos Airbnb stiilijuhendiga. Kui kasutad arendamiseks VSCode editori, siis on soovitav paigaldada [ESLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). Seejärel on koodi redigeerimise ajal näha, millised kohad ei vasta stiilijuhendile.



## Tehnoloogia valik (esialgne)

- Front
  - HTML5
  - CSS
  - Bootstrap
  - Javascript
  - React
- Back
  - Node.js
  - Javascript/Typescript
  - MariaDB
- Tools
  - Visual Code
  - Github
  - Docker
  - Slack

## [Projekti areng](https://github.com/TLUHK-RIF21/HK-Tunniplaan/blob/main/README.md)


## Materjalid

- [Diplomitöö, "Uue tunniplaani arendamine", Haapsalu Kolledž 2015](https://www.etera.ee/zoom/4375/view?page=1&p=separate&search=&view=0,0,2480,3509)
- [Diplomitöö, "TUNNIPLAANI RAKENDUSE ARENDAMINE JA JUURUTAMINE 
TALLINNA ÜLIKOOLI HAAPSALU KOLLEDŽI NÄITEL", Haapsalu Kolledž 2023](https://www.etera.ee/s/GaiJ04Pyr7)
- [Diplomitöö, "HAAPSALU KOLLEDŽI TUNNIPLAANI NUTISEADME KUVA LOOMINE", Haapsalu Kolledž 2023](https://www.etera.ee/s/g3O1UHS5CX)
