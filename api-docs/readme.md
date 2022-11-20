### Ressursid
```mermaid
erDiagram
    scheduled ||--o{scheduled_has_courses:id
    scheduled ||--o{scheduled_has_lecturers:id
    scheduled ||--o{scheduled_has_rooms:id
   scheduled
   scheduled {
        id number
        startTime datetime
        endTime datetime
        comment string
        subjects_id number
        distanceLink string
        dateCreated datetime
        dateUpdated datetime
        dateDeleted datetime
    }
    courses ||--o{scheduled_has_courses:courses_id
    courses
    courses {
        id number
        course string
        courseLong string
        dateCreated datetime
        dateUpdated datetime
        dateDeleted datetime

    }
    homeworks
    homeworks
    homeworks {
        id number
        description string
        dueDate datetime
        subjects_id number
        dateCreated datetime
        dateUpdated datetime
        dateDeleted datetime
        
    }
    lecturers ||--o{scheduled_has_lecturers:lecturers_id
    lecturers
    lecturers {
        id number
        firstName string
        lastName string
        email string
        dateCreated datetime
        dateUpdated datetime
        dateDeleted datetime
        }
    rooms ||--o{scheduled_has_rooms:rooms_id
    rooms{
        id number
        room string
        dateCreated datetime
        dateUpdated datetime
        dateDeleted datetime
        }
    subjects ||--o{homeworks:subjects_id
    subjects ||--o{scheduled:subjects_id
    subjects
    subjects{
        id number
        subject string
        subjectCode string
        creditPoint number
        dateCreated datetime
        dateUpdated datetime
        dateDeleted datetime
        }  
    scheduled_has_courses
    scheduled_has_courses{
        id number
        scheduled_id
        courses_id
        }
    scheduled_has_rooms
    scheduled_has_rooms{
        id number
        scheduled_id
        rooms_id
        }
    scheduled_has_lecturers
    scheduled_has_lecturers{
        id number
        schedule_id
        lecturers_id
        }
        





```

### Endpoindid

### API töötamise kontrollimiseks
- `GET /api/ping`

### Tunniplaaniga seotud
- [Tunniplaani päring pärimine](./endpoints/users/get.md#list-of-users): `GET /api/schedule`
- [Tunniplaani päring pärimine alates kuupäevast](./endpoints/users/get.md#user-by-id): `GET /api/schedule/:atDate`
- [Tunniplaani päring pärimine alates kuupäevast kuni kuupäevani](./endpoints/users/get.md#user-by-id): `GET /api/schedule/:atDate/:toDate`
- Uue loengu aja lisamine: `POST /api/schedule/`
- Loengu aja muutmine: `PATCH /api/schedule/:id`
- Loengu aja kustutamine: `DELETE /api/v1/users/:id/`

### Õppejõuga seotud
- GET `/lecturers`
- GET `/lecturers/:activeSubjects` ???
- GET `/lecturers/:id`
- POST `/lecturers`
- DELETE `/lecturers/:id`
- PATCH `/lecturers/:id`

### Õppeainega seotud
- GET `/subjects`
- GET `/subjects/:id`
- POST `/subjects`
- DELETE `/subjects/:id`
- PATCH `/subjects/:id`

### Kursusega seotud
- GET `/courses`
- GET `/courses/:id`
- POST `/courses`
- DELETE `/courses/:id`
- PATCH `/courses/:id`


### Ruumiga seotud
- GET `/rooms`
- GET `/rooms/:id`
- POST `/rooms`
- DELETE `/rooms/:id`
- DELETE `/rooms/:id`


### Kodutööga seotud
- Kõik kodutööd: `GET /api/homeworks/`
- Kodutöö id järgi: `GET /api/homeworks/:id`
- Kodutöö lisamine: `POST /api/homeworks/`
- Kodutöö muutmine: `PATCH /api/homeworks/:id`
- Kodutöö kustutamine: `DELETE /api/homeworks/:id`
- Kodutöö leidmine õppeaine koodi ja tähtaja järgi: `GET /api/homeworkbycode/:code/:atDate`






