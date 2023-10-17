# See fail on tunniplaani frontendi arenduseks
Selles failis on kirjeldatud tähelepanekud koodi kohta, kus midagi on kirjeldatud.

## Kasutajate haldus
Failis src/components/Home.js

### Kasutajate sisselogimine
Sisselogimise menüü on src/components/views/Header.js
Mobiiliversioon on src/components/views/MobileMenu.js

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

Muutuja `loginInfo`  sisselogitud kasutaja identifitseerimiseks backis.
let token = localStorage.getItem("token");



Kasutaja rollid on defineeritud Reacti efektis:
      
      useEffect(() => {
        const roles = {
        admin: false,
        userLecturer: false,
        userStudent: false,
      };

## Home.js
Muutujad
token = localStorage.getItem("token");
userRole, eestikeelsed nimetused rollidele admin, userStudent, userLecturer 
login = useGoogleLogin

Funktsioonid
work_data - tõenäoliselt laeb tunniplaani andmed
dropdownController - tõenäoliselt käivitub dropdownist uue väärtuse valimisel
scheduleFilter - filtreerib tunniplaani andmeid
dataFilterHandler - 
[data, dropdownsSelection] useEffect
userRollHandler - tõenäoliselt kutsutakse välja Header'i poolt ning seatakse kasutaja rollid
[ loginInfo ] useEffect. Kasutab muutujat roles, seab väärtused (true, false) 
  setAdmin(roles.admin);
  setUserLecturer(roles.userLecturer);
  setUserStudent(roles.userStudent);
addScheduleHandler
newOccurenceHandler
closeAdditionModalHandler
emptyFiltersHandler
mobileMenuHandler
mobileFiltersHandler
scheduleReloadHandler
[ googleProfile ] useEffect
logOut - Seab kõik sisselogimise rollid false'ks
[ googleAccessToken ] useEffect
[ filteredData ] useEffect
[ openModalAnimation ] useEffect
usersListHandler - Avab kasutajate nimekirja modaali