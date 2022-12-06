# Testplaan

Testimise eesmärgiks on veenduda, et arendatav süsteem vastaks tellija poolt esitatud nõuetele ja kirjeldatud funktsionaalsusele. Tunniplaani rakenduse testimiseks kasutatakse vaid manuaaltestimist.
Tunniplaani kasutajaliides:
- Tudengi vaade – read-only, kasutaja saab andmeid vaid vaadata,
- Õppejõu vaade – read-write, kasutajal on võimalik mõningasi andmeid lisada ja muuta
- Admin vaade – read-write, kasutajal on võimalik enamike andmeväljade sisusid lisada ja muuta

## Funktsionaalne testimine
Funktsionaalse testimise eesmärgiks on kontrollida süsteemi vastavust funktsionaalsetele nõuetele ning leida võimalikke vigu ja vastuolusid. Funktsionaalse testimise lähtepunktiks on kasutusmallid. Funktsionaalsed nõuded vastavad küsimusele "Mida peab tarkvara tegema?". Testimist teostavad arendusprojekti liikmed.
## Mittefunktsionaalne testimine
Mittefunktsionaalse testimise eesmärgiks on kontrollida süsteemi vastavust mittefunktsionaalsetele nõuetele. Mittefunktsionaalsed nõuded vastavad küsimusele "Kuidas tarkvara peab vajalikke funktsioone täitma?". Mittefunktsionaalsete nõuete alusel koostatakse vastavad testjuhtumid, mille vastu on võimalik testida. Testimise lõpus koostatakse raport. Testimist teostab testgrupp, kelleks on Tallinna Ülikooli Haapsalu Kolledži tudengid, õppejõud ning administraator.
## Mittefunktsionaalse testimise meetod
Testjuht laseb kasutajal rakenduses toimetada ning monitoorib seda kõrvalt. Kasutajal palutakse kõva häälega väljendada oma tundeid seoses rakenduse ning selle toimimisega. Kasutajal palutakse läbida testjuhtumid. Testjuhtumid loeb kasutajale ette testjuht, kes leiud ka ise raporteerib ning kasutaja kommentaarid valideerib.

## Testimise tulemid
- Testplaan (see dokument)
- Testijuhtumid
- Testijuhtumite raportid
- Testimisega seotud moodulite kasutusjuhendid

## Vearaport
Vearaport on vea kirjeldus, mis koosneb vähemalt neljast osast:
- Pealkiri
- Kirjeldus
- Eeldus
- Tegelikkus

Vearaportis peab olema kirjas probleemi kirjeldus ja vea kordamiseks vajalik info. Vigade registreerimise juures on oluline anda piisavalt infot, et arendajal oleks võimalik viga korrata ning uurida. Testimise juhtimist korraldav isik peab tagama, et kõik kasutajad, kes rakendust testivad, puudustele ise tähelepanu pööraks. Testjuht ise täheldatud vigu ei kommenteeri. 
Vigade raporteerimiseks dokumenteerib testjuht kasutajaga testjuhtumeid läbides leidusid, mille ta ka eraldiseisvatena projekti repositooriumisse kannab. Kasutajad ei raporteeri vigu otse projekti repositooriumisse, sest neile ligipääsude jagamine antud keskkonda ei ole mõistlik ning meie testimise meetod eeldab testjuhi vahetut suhtlust testijaga.
