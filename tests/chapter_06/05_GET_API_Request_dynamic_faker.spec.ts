import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.use({
  baseURL: process.env.BASE_API_URL,
})

/**
 * Author Luiggie
 */

test('Create GET API request using Faker library only ', async({request}) =>{
  const firstname = faker.person.firstName(); 
  const lastname = faker.person.lastName(); 
  const totalprice = faker.number.int({min: 1000, max: 10000});
  const depositepaid = faker.datatype.boolean();
  const additionalneeds = faker.person.jobTitle();
  const checkin = faker.date.recent().toISOString().split('T')[0];
  const checkout = faker.date.recent().toISOString().split('T')[0];

  const postAPIrequestBody = {
    firstname: firstname,
    lastname: lastname,
    totalprice: totalprice,
    depositpaid: depositepaid,
    bookingdates: {
      checkin: checkin,
      checkout: checkout,
    },
    additionalneeds: additionalneeds,
  }

  const jsonPostAPIrequest = postAPIrequestBody;

  // Create POST API Request
  const postAPIresponse = await request.post(`/booking`, {
    data: jsonPostAPIrequest,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });

  console.log('\n👉🏽 POST API Headers:');
  console.log('postAPIresponse: ', postAPIresponse);
  console.log('\n👉🏽 postAPIresponse.headers(): ', postAPIresponse.headers());

  // Print JSON  API response
  const jsonResponse = await postAPIresponse.json();
  console.log("\nPOST API Response Body:");
  console.log("👉🏽 jsonResponse: ", jsonResponse); //response body

  console.log("\nconst bookingId = jsonResponse.bookingid")
  const bookingId = jsonResponse.bookingid;
  console.log("\n👉🏽 const bookingId = jsonResponse.bookingid")
  console.log("bookingId: ", bookingId);

  // GET API Request
  const getAPIresponse = await request.get(`/booking/${bookingId}`);
  console.log("\n👉🏽 GET API Response:")
  console.log("👉🏽 getAPIresponse: ", getAPIresponse); //response header 
  console.log("\n👉🏽 GET API Headers:")
  console.log("getAPIresponse.headers(): ", getAPIresponse.headers()); //response header 

  console.log("\n👉🏽 GET API Request Body:")
  const jsonGetAPIresponse = await getAPIresponse.json();
  console.log("const jsonGetAPIresponse = await getAPIresponse.json()")
  console.log("jsonGetAPIresponse: ", jsonGetAPIresponse); //response body
  
  // Validating response status and headers
  console.log('\n--------------------------------');
  console.log('Validating POST response status and headers:');
  expect(postAPIresponse.status()).toBe(200);
  console.log('expect(postAPIresponse.status()).toBe(200)');
  expect(postAPIresponse.statusText()).toBe('OK');
  console.log('expect(postAPIresponse.statusText()).toBe("OK")');
  expect(postAPIresponse.headers()['content-type']).toContain('application/json');
  console.log("expect(postAPIresponse.headers()['content-type']).toContain('application/json')");

  console.log('\nValidating GET response status and headers:');
  expect(getAPIresponse.status()).toBe(200);
  console.log('expect(getAPIresponse.status()).toBe(200)');
  expect(getAPIresponse.statusText()).toBe('OK');
  console.log('expect(getAPIresponse.statusText()).toBe("OK")');
  expect(getAPIresponse.headers()['content-type']).toContain('application/json');
  console.log("expect(getAPIresponse.headers()['content-type']).toContain('application/json')");

  // Validating property existence
  console.log('\n--------------------------------');
  console.log('Validating POST response property existence:');
  expect(jsonResponse).toHaveProperty('bookingid');
  console.log("expect(jsonResponse).toHaveProperty('bookingid')");
  expect(jsonResponse).toHaveProperty('booking');
  console.log("expect(jsonResponse).toHaveProperty('booking')");
  expect(jsonResponse.booking).toHaveProperty('firstname');
  console.log("expect(jsonResponse.booking).toHaveProperty('firstname')");
  expect(jsonResponse.booking).toHaveProperty('lastname');
  console.log("expect(jsonResponse.booking).toHaveProperty('lastname')");
  expect(jsonResponse.booking).toHaveProperty('totalprice');
  console.log("expect(jsonResponse.booking).toHaveProperty('totalprice')");
  expect(jsonResponse.booking).toHaveProperty('depositpaid');
  console.log("expect(jsonResponse.booking).toHaveProperty('depositpaid')");
  expect(jsonResponse.booking).toHaveProperty('bookingdates');
  console.log("expect(jsonResponse.booking).toHaveProperty('bookingdates')");
  expect(jsonResponse.booking.bookingdates).toHaveProperty('checkin');
  console.log("expect(jsonResponse.booking.bookingdates).toHaveProperty('checkin')");
  expect(jsonResponse.booking.bookingdates).toHaveProperty('checkout');
  console.log("expect(jsonResponse.booking.bookingdates).toHaveProperty('checkout')");
  expect(jsonResponse.booking).toHaveProperty('additionalneeds');
  console.log("expect(jsonResponse.booking).toHaveProperty('additionalneeds')");

  console.log('\nValidating GET response property existence:');
  expect(jsonGetAPIresponse).toHaveProperty('firstname');
  console.log("expect(jsonGetAPIresponse).toHaveProperty('firstname')");
  expect(jsonGetAPIresponse).toHaveProperty('lastname');
  console.log("expect(jsonGetAPIresponse).toHaveProperty('lastname')");
  expect(jsonGetAPIresponse).toHaveProperty('totalprice');
  console.log("expect(jsonGetAPIresponse).toHaveProperty('totalprice')");
  expect(jsonGetAPIresponse).toHaveProperty('depositpaid');
  console.log("expect(jsonGetAPIresponse).toHaveProperty('depositpaid')");
  expect(jsonGetAPIresponse).toHaveProperty('bookingdates');
  console.log("expect(jsonGetAPIresponse).toHaveProperty('bookingdates')");
  expect(jsonGetAPIresponse.bookingdates).toHaveProperty('checkin');
  console.log("expect(jsonGetAPIresponse.bookingdates).toHaveProperty('checkin')");
  expect(jsonGetAPIresponse.bookingdates).toHaveProperty('checkout');
  console.log("expect(jsonGetAPIresponse.bookingdates).toHaveProperty('checkout')");
  expect(jsonGetAPIresponse).toHaveProperty('additionalneeds');
  console.log("expect(jsonGetAPIresponse).toHaveProperty('additionalneeds')");

  // Validating property types
  console.log('\n--------------------------------');
  console.log('Validating POST response property types:');
  expect(typeof jsonResponse.bookingid).toBe('number');
  console.log("expect(typeof jsonResponse.bookingid).toBe('number')");
  expect(typeof jsonResponse.booking.firstname).toBe('string');
  console.log("expect(typeof jsonResponse.booking.firstname).toBe('string')");
  expect(typeof jsonResponse.booking.lastname).toBe('string');
  console.log("expect(typeof jsonResponse.booking.lastname).toBe('string')");
  expect(typeof jsonResponse.booking.totalprice).toBe('number');
  console.log("expect(typeof jsonResponse.booking.totalprice).toBe('number')");
  expect(typeof jsonResponse.booking.depositpaid).toBe('boolean');
  console.log("expect(typeof jsonResponse.booking.depositpaid).toBe('boolean')");
  expect(typeof jsonResponse.booking.bookingdates.checkin).toBe('string');
  console.log("expect(typeof jsonResponse.booking.bookingdates.checkin).toBe('string')");
  expect(typeof jsonResponse.booking.bookingdates.checkout).toBe('string');
  console.log("expect(typeof jsonResponse.booking.bookingdates.checkout).toBe('string')");
  expect(typeof jsonResponse.booking.additionalneeds).toBe('string');
  console.log("expect(typeof jsonResponse.booking.additionalneeds).toBe('string')");

  console.log('\nValidating GET response property types:');
  expect(typeof jsonGetAPIresponse.firstname).toBe('string');
  console.log("expect(typeof jsonGetAPIresponse.firstname).toBe('string')");
  expect(typeof jsonGetAPIresponse.lastname).toBe('string');
  console.log("expect(typeof jsonGetAPIresponse.lastname).toBe('string')");
  expect(typeof jsonGetAPIresponse.totalprice).toBe('number');
  console.log("expect(typeof jsonGetAPIresponse.totalprice).toBe('number')");
  expect(typeof jsonGetAPIresponse.depositpaid).toBe('boolean');
  console.log("expect(typeof jsonGetAPIresponse.depositpaid).toBe('boolean')");
  expect(typeof jsonGetAPIresponse.bookingdates.checkin).toBe('string');
  console.log("expect(typeof jsonGetAPIresponse.bookingdates.checkin).toBe('string')");
  expect(typeof jsonGetAPIresponse.bookingdates.checkout).toBe('string');
  console.log("expect(typeof jsonGetAPIresponse.bookingdates.checkout).toBe('string')");
  expect(typeof jsonGetAPIresponse.additionalneeds).toBe('string');
  console.log("expect(typeof jsonGetAPIresponse.additionalneeds).toBe('string')");

  // Validating API response body values
  console.log('\n--------------------------------');
  console.log('Validating POST response body values:');
  expect(jsonResponse.bookingid).toBeGreaterThan(0);
  console.log("expect(jsonResponse.bookingid).toBeGreaterThan(0)");
  expect(jsonResponse.booking.firstname).toBe(jsonPostAPIrequest.firstname);
  console.log("expect(jsonResponse.booking.firstname).toBe(jsonPostAPIrequest.firstname)");
  expect(jsonResponse.booking.lastname).toBe(jsonPostAPIrequest.lastname);
  console.log("expect(jsonResponse.booking.lastname).toBe(jsonPostAPIrequest.lastname)");
  expect(jsonResponse.booking.totalprice).toBe(jsonPostAPIrequest.totalprice);
  console.log("expect(jsonResponse.booking.totalprice).toBe(jsonPostAPIrequest.totalprice)");
  expect(jsonResponse.booking.depositpaid).toBe(jsonPostAPIrequest.depositpaid);
  console.log("expect(jsonResponse.booking.depositpaid).toBe(jsonPostAPIrequest.depositpaid)");
  expect(jsonResponse.booking.bookingdates.checkin).toBe(jsonPostAPIrequest.bookingdates.checkin);
  console.log("expect(jsonResponse.booking.bookingdates.checkin).toBe(jsonPostAPIrequest.bookingdates.checkin)");
  expect(jsonResponse.booking.bookingdates.checkout).toBe(jsonPostAPIrequest.bookingdates.checkout);
  console.log("expect(jsonResponse.booking.bookingdates.checkout).toBe(jsonPostAPIrequest.bookingdates.checkout)");
  expect(jsonResponse.booking.additionalneeds).toBe(jsonPostAPIrequest.additionalneeds);
  console.log("expect(jsonResponse.booking.additionalneeds).toBe(jsonPostAPIrequest.additionalneeds)");

  console.log('\nValidating GET response body values:');
  expect(jsonGetAPIresponse.firstname).toBe(jsonPostAPIrequest.firstname);
  console.log("expect(jsonGetAPIresponse.firstname).toBe(jsonPostAPIrequest.firstname)");
  expect(jsonGetAPIresponse.lastname).toBe(jsonPostAPIrequest.lastname);
  console.log("expect(jsonGetAPIresponse.lastname).toBe(jsonPostAPIrequest.lastname)");
  expect(jsonGetAPIresponse.totalprice).toBe(jsonPostAPIrequest.totalprice);
  console.log("expect(jsonGetAPIresponse.totalprice).toBe(jsonPostAPIrequest.totalprice)");
  expect(jsonGetAPIresponse.depositpaid).toBe(jsonPostAPIrequest.depositpaid);
  console.log("expect(jsonGetAPIresponse.depositpaid).toBe(jsonPostAPIrequest.depositpaid)");
  expect(jsonGetAPIresponse.bookingdates.checkin).toBe(jsonPostAPIrequest.bookingdates.checkin);
  console.log("expect(jsonGetAPIresponse.bookingdates.checkin).toBe(jsonPostAPIrequest.bookingdates.checkin)");
  expect(jsonGetAPIresponse.bookingdates.checkout).toBe(jsonPostAPIrequest.bookingdates.checkout);
  console.log("expect(jsonGetAPIresponse.bookingdates.checkout).toBe(jsonPostAPIrequest.bookingdates.checkout)");
  expect(jsonGetAPIresponse.additionalneeds).toBe(jsonPostAPIrequest.additionalneeds);
  console.log("expect(jsonGetAPIresponse.additionalneeds).toBe(jsonPostAPIrequest.additionalneeds)");
  console.log('--------------------------------');
})

// Define una interfaz para la respuesta de la reserva (Booking Response)
// Esto ayuda con el tipado y la autocompletado en tu editor.
interface BookingResponse {
  bookingid: number;
  booking: BookingPayload;
  /*
  booking: {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: {
      checkin: string;
      checkout: string;
    };
    additionalneeds?: string; // Es opcional en la API
  };*/
}

// Define una interfaz para los datos de la reserva que enviamos
interface BookingPayload {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds: string;
}

/**
 * Autor: Luiggie
 * Descripción: Create a new Booking using dynamic data from Faker.js,
 * valida la respuesta de creación, y luego obtiene la reserva para validarla.
 */
test('should successfully create and retrieve a booking using Faker.js data', async ({ request }) => {

  // --- Arrange (Preparación de datos y expectativas) ---

  // Generación de datos dinámicos para el payload
  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();
  const totalprice = faker.number.int({ min: 1000, max: 10000 });
  const depositpaid = faker.datatype.boolean();
  const additionalneeds = faker.person.jobTitle();

  // Generación de fechas: asegúrate de que checkout sea posterior a checkin.
  const checkinDate = faker.date.future({ years: 1, refDate: new Date() }); // Una fecha en el futuro
  const checkoutDate = faker.date.soon({ days: 10, refDate: checkinDate }); // 10 días después de checkin

  const checkin = checkinDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  const checkout = checkoutDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD

  // Payload completo para la solicitud POST
  const postAPIrequestBody: BookingPayload = {
    firstname: firstname,
    lastname: lastname,
    totalprice: totalprice,
    depositpaid: depositpaid,
    bookingdates: {
      checkin: checkin,
      checkout: checkout,
    },
    additionalneeds: additionalneeds,
  };

  // Expectativas para la respuesta de creación (POST)
  const expectedPostStatusCode = 200;
  const expectedPostStatusText = 'OK';
  const expectedContentType = 'application/json';

  // Estructura esperada para la respuesta de creación.
  // Usamos `expect.any()` para validar tipos y `expect.stringMatching` para formatos.
  const expectedPostResponseStructure = {
    bookingid: expect.any(Number),
    booking: {
      firstname: expect.any(String),
      lastname: expect.any(String),
      totalprice: expect.any(Number),
      depositpaid: expect.any(Boolean),
      bookingdates: {
        checkin: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
        checkout: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
      },
      additionalneeds: expect.any(String),
    },
  };

  // Expectativas para la respuesta de obtención (GET)
  const expectedGetStatusCode = 200;
  const expectedGetStatusText = 'OK';


  // --- Act (Ejecución de las solicitudes) ---

  // 1. Crear POST API Request
  console.log("--- Sending POST Request to Create Booking ---");
  console.log("Request Body:", JSON.stringify(postAPIrequestBody, null, 2));

  const postAPIresponse = await request.post(`/booking`, {
    data: postAPIrequestBody,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  // Imprimir headers de la respuesta POST (para depuración)
  console.log("\nPOST API Response Headers:", postAPIresponse.headers());

  // Parsear y tipar la respuesta JSON de la creación
  let jsonPostResponse: BookingResponse;
  try {
    jsonPostResponse = await postAPIresponse.json();
    console.log("\nPOST API Response Body:", JSON.stringify(jsonPostResponse, null, 2));
  } catch (e) {
    const rawText = await postAPIresponse.text();
    console.error(`❌ Error parsing POST response as JSON (Status: ${postAPIresponse.status()}):`, rawText);
    throw new Error(`Failed to parse POST response as JSON. Raw response: ${rawText}`);
  }

  const bookingId = jsonPostResponse.bookingid;
  console.log("\nExtracted Booking ID:", bookingId);

  // 2. Realizar GET API Request
  console.log("\n--- Sending GET Request to Retrieve Booking ---");
  const getAPIresponse = await request.get(`/booking/${bookingId}`, {
    headers: {
      'Accept': 'application/json',
    },
  });

  // Imprimir headers de la respuesta GET (para depuración)
  console.log("\nGET API Response Headers:", getAPIresponse.headers());

  // Parsear y tipar la respuesta JSON de la obtención
  let jsonGetAPIresponse: BookingPayload; // GET devuelve el booking directamente
  try {
    jsonGetAPIresponse = await getAPIresponse.json();
    console.log("\nGET API Response Body:", JSON.stringify(jsonGetAPIresponse, null, 2));
  } catch (e) {
    const rawText = await getAPIresponse.text();
    console.error(`❌ Error parsing GET response as JSON (Status: ${getAPIresponse.status()}):`, rawText);
    throw new Error(`Failed to parse GET response as JSON. Raw response: ${rawText}`);
  }

  // --- Assert (Validaciones) ---

  // --- Validating POST Response Status and Headers ---
  console.log("\n--- Validating POST Response Status and Headers ---");
  expect(postAPIresponse.status(), `POST response status should be ${expectedPostStatusCode}`).toBe(expectedPostStatusCode);
  expect(postAPIresponse.statusText(), `POST status text should be "${expectedPostStatusText}"`).toBe(expectedPostStatusText);
  expect(postAPIresponse.headers()['content-type'], `POST Content-Type should include "${expectedContentType}"`)
    .toContain(expectedContentType);

  // --- Validating POST Response Body - Property Existence & Types ---
  console.log("\n--- Validating POST Response Body - Property Existence & Types ---");
  // Validamos que la respuesta contenga la estructura esperada y los tipos correctos
  expect(jsonPostResponse).toEqual(expect.objectContaining(expectedPostResponseStructure));

  // Validar que el `bookingid` es un número positivo (es generado por la API)
  expect(jsonPostResponse.bookingid, 'POST response bookingid should be a positive number').toBeGreaterThan(0);

  // --- Validating POST API Response Body Values ---
  console.log("\n--- Validating POST API Response Body Values ---");
  // Aquí validamos que los datos devueltos en la propiedad `booking` coincidan con lo que enviamos
  expect(jsonPostResponse.booking.firstname, 'POST response firstname should match request').toBe(postAPIrequestBody.firstname);
  expect(jsonPostResponse.booking.lastname, 'POST response lastname should match request').toBe(postAPIrequestBody.lastname);
  expect(jsonPostResponse.booking.totalprice, 'POST response totalprice should match request').toBe(postAPIrequestBody.totalprice);
  expect(jsonPostResponse.booking.depositpaid, 'POST response depositpaid should match request').toBe(postAPIrequestBody.depositpaid);
  expect(jsonPostResponse.booking.bookingdates.checkin, 'POST response checkin date should match request').toBe(postAPIrequestBody.bookingdates.checkin);
  expect(jsonPostResponse.booking.bookingdates.checkout, 'POST response checkout date should match request').toBe(postAPIrequestBody.bookingdates.checkout);
  expect(jsonPostResponse.booking.additionalneeds, 'POST response additionalneeds should match request').toBe(postAPIrequestBody.additionalneeds);

  // --- Validating GET Response Status and Headers ---
  console.log("\n--- Validating GET Response Status and Headers ---");
  expect(getAPIresponse.status(), `GET response status should be ${expectedGetStatusCode}`).toBe(expectedGetStatusCode);
  expect(getAPIresponse.statusText(), `GET status text should be "${expectedGetStatusText}"`).toBe(expectedGetStatusText);
  expect(getAPIresponse.headers()['content-type'], `GET Content-Type should include "${expectedContentType}"`)
    .toContain(expectedContentType);

  // --- Validating GET API Response Body Values ---
  console.log("\n--- Validating GET API Response Body Values ---");
  // Validamos que los datos recuperados sean idénticos a los que enviamos inicialmente
  expect(jsonGetAPIresponse.firstname, 'GET response firstname should match original request').toBe(postAPIrequestBody.firstname);
  expect(jsonGetAPIresponse.lastname, 'GET response lastname should match original request').toBe(postAPIrequestBody.lastname);
  expect(jsonGetAPIresponse.totalprice, 'GET response totalprice should match original request').toBe(postAPIrequestBody.totalprice);
  expect(jsonGetAPIresponse.depositpaid, 'GET response depositpaid should match original request').toBe(postAPIrequestBody.depositpaid);
  expect(jsonGetAPIresponse.bookingdates.checkin, 'GET response checkin date should match original request').toBe(postAPIrequestBody.bookingdates.checkin);
  expect(jsonGetAPIresponse.bookingdates.checkout, 'GET response checkout date should match original request').toBe(postAPIrequestBody.bookingdates.checkout);
  expect(jsonGetAPIresponse.additionalneeds, 'GET response additionalneeds should match original request').toBe(postAPIrequestBody.additionalneeds);

  console.log("\n--- All API validations passed! ---");
});