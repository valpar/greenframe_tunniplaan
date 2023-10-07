# See fail on tunniplaani frontendi arenduseks
Selles failis on kirjeldatud tähelepanekud koodi kohta, kus midagi on kirjeldatud.

## Kasutajate haldus
Failis src/components/Home.js

### Kasutajate sisselogimine
Sisse logimine algab sellest funktsioonist:
 `const login = useGoogleLogin`
### Kasutajarollide haldus
Failis components Home.js on kirjeldatud sündmus `userRollHandler`.
Kui näiteks `event.target.name === "admin"` siis kirjeldatakse rollid järgmiselt:
      
      if (event.target.name === "admin") {
        setAdmin(true);
        setUserStudent(false);
        setUserLecturer(false);
      }

Muutujas `loginInfo` 


Kasutaja rollid on defineeritud Reacti efektis:
      
      useEffect(() => {
        const roles = {
        admin: false,
        userLecturer: false,
        userStudent: false,
      };

