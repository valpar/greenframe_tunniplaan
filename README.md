# HK Tunniplaani rakendus

Eesmärgiks on 2023. aasta Valikpraktika käigus arendada edasi API'l baseeruvat tunniplaani ja kodutööde kuvamise lahendust, mis võimaldaks arenduse sujuvat jätkamist tulevikus ja integratsioone võimalike teiste süsteemidega.

## Koosolekud

[Link](https://github.com/TLUHK-RIF21/HK-Tunniplaan/blob/master/rif21/koosolekud.md)

## Praktikapäevikud
- [Andrus](https://github.com/TLUHK-RIF21/HK-Tunniplaan/issues/2)
- [Mario](https://github.com/TLUHK-RIF21/HK-Tunniplaan/issues/1)

## Meeskond

| **Roll**   | **Nimi** |
| ---------- | -------- |
| **Arendaja** | Andrus    |
| **Arendaja/Projektijuht** | Mario    |

### Projekt - Tunniplaan

## Käivitamine

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
- [Diplomitöö, "Uue tunniplaani arendamine", Haapsalu Kolledž 2023]()
- [Diplomitöö, "Uue tunniplaani arendamine", Haapsalu Kolledž 2023]()
