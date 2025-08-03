interface BookingAPI {
  "firstname": string,
  "lastname": string,
  "totalprice": number,
  "depositpaid": boolean,
  "additionalneeds": string,
  "bookingdates": BookingDates,
}

interface BookingDates {
  "checkin": string,
  "checkout": string,
}


/* 
{
  "firstname": "{{$randomFirstName}}",
  "lastname": "{{$randomLastName}}",
  "totalprice": "{{$randomPrice}}",
  "depositpaid": "{{$randomBoolean}}",
  "bookingdates": {
    "checkin": "2025-07-01",
    "checkout":"2025-08-01"
  },
  "additionalneeds": "{{$randomJobTitle}}"
}
*/