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

Muutuja `loginInfo`  sisselogitud kasutaja identifitseerimiseks backis. loginInfosse salvestatakse autentimisel API'lt saadud vastus koos tokeniga.

Sisselogimisel salvestatakse info ka localStorage'sse:
  
  localStorage.setItem("token", JSON.stringify(response.data));

  let token = localStorage.getItem("token");


## Home.js
Muutujad
token = localStorage.getItem("token");
userRole, eestikeelsed nimetused rollidele admin, userStudent, userLecturer 
login = useGoogleLogin



## UI elemendid
UI elemendid (Modal, Input, Dropdown, Button jne) on asuvad kaustas src/components/UI

### Modaalid

#### Modal
Näide Modal'i kasutamisest:

Näide on võetud failist src/components/views/UserEditModal.js
    
    <Modal
      onCenter={true}
      onHidden={hideModal}
      onClose={closeHandler}
      overlay={showOverlay}
    >
      <div className="relative flex flex-col">
    
        # Järgnev kood moodustab sulgemisristikese ülemisse paremasse nurka
        
        <div className="relative flex justify-end">
          <i
            onClick={closeHandler}
            className={`bi bi-x-lg absolute text-3xl lg:text-xl -top-2 -right-2`}
          ></i>
        </div>
        
        # Siit algab dialoogi sisu

        <div className="flex flex-col items-center mb-2 lg:min-w-[50rem]">
        
        # Järgnev kood loob päise dialoogile

          <h1 className="font-bold text-lg my-2 mb-6">{`${
            editMode ? "KASUTAJA ANDMETE MUUTMINE" : "UUE KASUTAJA LISAMINE"
          }`}</h1>
        
        # Siin kuvatakse dialoogi sisu
          
        </div>
        
        # Siit algab dialoogi jalus koos salvestamise ja kustutamise nuppudega
        
        # Siin on vaheriba???

        <div
          className={`flex ${
            props.editMode
              ? "justify-between space-x-20"
              : "justify-center lg:justify-between"
          } w-full pt-8`}
        >

      </div>
    </Modal>

ConfrimModalid nupuvajutuste korral või samuti otse Modal'i kehasse kirjutada.

#### ConfirmModal
ConfirmModal on kasutusel näiteks Jah/Ei kinnituse küsimiseks.
Siin on näide ConfirmModali kasutamisest:
Näide on võetud failist src/components/views/UserEditModal.js

    {showDeleteConfirmModal && (
      <div className="absolute top-20 -left-16">
        <ConfirmModal
          onDecline={declineHandler}
          onConfirm={deleteItemHandler}
          modalMessage={deleteModalMessage}
          topArrow={true}
        />
      </div>
    )}


#### RequestModal
RequestModal on kasutusel päringute vastuste tarvis.
Näide RequestModali kasutamisest:
Näide on võetud failist src/components/views/UserEditModal.js
    
    {showRequestModal && (
      <RequestModal
        error={requestError}
        success={requestSuccess}
        loading={requestLoading}
        modalMessage={requestMessage}
        customStyle="top-1/2 lg:ml-32"
        onDecline={endRequestHandler}
        onConfirm={failedRequestConfirmHandler}
      />
    )}

#### Modalite kuvamine
Modale on võimalik kuvada viisil, et kui mõni väärtus on tõene, siis Modal kuvatakse:

    {showRequestModal && (
      <RequestModal
        # siin on vajalikud propsid
      />
    )}

Muutujat muudetakse läbi Reacti UseState, mis väärtuse muutumisel renderdab vastava objekti:

See näide on kirjas failis Home.js
  const [showUsersModal, setShowUsersModal] = useState(false);


### Dialoogi elementid

#### Input
##### InputOvarLappingLabel

Näide on võetud failist src/components/views/UserEditModal.js

    <InputOverlappingLabel
      placeholder="Eesnimi"
      onChange={inputChangeHandler}
      name={"firstName"}
      value={e.firstName}
      errorMessage={errorMessage[i]?.firstName}
      eTopPos="true"
      index={i}
    />

Sealtsamast on näide inputChangeHandlerist:

    const inputChangeHandler = (value) => {
        const isFirstName = value.name === "firstName";
  
        const trimmedValue = value?.value.trim();
        
        if (isFirstName) {
          !hasValue
          ? setErrorMessages((prevState) => {
            const prev = [...prevState];
            prev[value.id] = {
              ...prev[value.id],
              firstName: mandatoryFields,
            };
            return prev;
          })
        : setErrorMessages((prevState) => {
            const prev = [...prevState];
            prev[value.id] = {
              ...prev[value.id],
              firstName: null,
            };
            return prev;
          });
        setEnteredUserData((prevState)  => {
            const prev = [...prevState];
            prev[value.id] = {
              ...prev[value.id],
              firstName: trimmedValue,
            };
          return prev;
        });
      }
    }

##### DropDownOverlappingInput
Näide on võetud failist src/components/views/UserEditModal.js

    <DropdownOverlappingInput
      placeholder="Roll"
      onChange={inputChangeHandler}
      name={"role"}
      value={
        roleOptions.find((item) => {
        return item.value === e.role;
        })?.label
      }
      errorMessage={errorMessage[i]?.role}
      eTopPos="true"
      options={roleOptions}
      showOptions="true"
      readOnly="true"
      index={i}
    />

#### Button
Tavapärane HTML nupp
Näide on võetud failist src/components/views/UserEditModal.js

    <button
      onClick={confirmModalHandler}
      className="btn-actions"
      type="button"
      name="delete"
    >
      KUSTUTA
    </button>

### Handler
Handlerid on kasutusel näiteks Input elemendist sisestuse lugemiseks.

Handler muutujana peaks paiknema seal, kus sisestuselement luuakse, või kus on vaja tulemust kasutada. Näiteks, kui kogu rakenduses on vaja sisestatud väärtust kasutada, võib handleri luua ka Home.js failis.

Handler andtakse sisestuselemendile läbi propside:

    <button
      onClick={confirmModalHandler}
    />


    const confirmModalHandler = (event) => {
      if (event.target.name === "delete") {
        setShowDeleteConfirmModal(true);
        setOverlay(true);
      }
    }

## Päringud
Päringute tegemiseks kasutatakse axios paketti.

    axios.post('/login', 
      {
        email: email,
        password: password
      })
      .then((response) => {
  
        # siia tuleb kirjutada see, mida vastuse korral teha
  
      })
      .catch((error) => {
        console.log("Error: ")
        console.log(error)
      })
