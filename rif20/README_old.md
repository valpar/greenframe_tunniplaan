# HK Tunniplaani rakendus

Töö eesmärgiks on arendada välja API'l baseeruv tunniplaani ja kodutööde kuvamise lahendus mis võimaldaks arenduse sujuvat jätkamist tulevikus ja integratsioone kõikvõimalike teiste süsteemidega millel peaks seda vaja olema.

### Projekt - Tunniplaan

## Käivitamine

1. Klooni repositoorium 
```bash
git clone https://github.com/tluhk/rif20-valikpraktika-2.git
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
7. kliendi frontend rakendus töötab browseris aadressil http://localhost:3000

> Praegu võib olla probleeme sellega, et dockeri konteineri loomisel ei paigaldata korrektselt `bcrypt` npm pakett. Sellisel juhul tuleb minna `ts-node-docker` nimelisse konteinerisse, ja käivitada seal `npm uninstall bcrypt` ja `npm install bcrypt`. Seejärel tuleb konteiner taaskäivitada.

## ESLint

API-poolses koodis on rakendatud ESLint koodianalüsaatorit koos Airbnb stiilijuhendiga. Kui kasutad arendamiseks VSCode editori, siis on soovitav paigaldada [ESLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). Seejärel on koodi redigeerimise ajal näha, millised kohad ei vasta stiilijuhendile.

## Meeskond

| **Roll**   | **Nimi** |
| ---------- | -------- |
| **Disain** | Hanna    |
| **Disain** | Laura    |
| **Front**  | Anti     |
| **Back**   | Ahti     |
| **Back**   | Jaanus   |

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

## [Projekti areng](https://github.com/tluhk/rif20-valikpraktika-2/blob/master/project-docs/readme.md)


## Materjalid

- [Diplomitöö, "Uue tunniplaani arendamine", Haapsalu Kolledž 2015](https://www.etera.ee/zoom/4375/view?page=1&p=separate&search=&view=0,0,2480,3509)
