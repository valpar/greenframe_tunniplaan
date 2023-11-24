# Tunniplaani API

## API pääsupunktid
API pääsupunktide kirjeldused on failis api-docs/readme.md (kaust api-docs asub repositooriumi juurkataloogis)

Käivitatud API puhul on pääsupunkte saab vaadata veebilehitsejas pääsupunktil `/api-docs`. Kohalikus masinas käivitades `localhost:4000/api-docs`

## Pääsupunktid
Pääsupunktid on failis src/app.ts. Pääsupunkti funktsioonis on kirjeldatud ka kontrollerid, mis asuvad src/components alamkaustades.

Serveri vastuste koodid on kirjeldatud src/components/general/responseCodes.ts

## Kasutaja autentimine
### JWT token
Tokeni loomiseks ja kontrollimiseks on funktsioonid failis src/components/general/jwtService.ts
Tokenis JSON objekt väljadega id: ja role:

Sisse logimine ja tokeni saatmine on kirjeldatud failides src/components/auth/controller.ts ja 
src/components/auth/service.ts

Token dekodeeritakse src/components/auth/isLoggedInMiddleware.ts funktsioonis isLoggedIn: ning edastatakse 
res.locals.user parameetrina järgmisele funktsioonile; isLoggedIn: funktsiooni saab kasutada App.ts failis kirjeldatud pääsupunktides middlewarena.
