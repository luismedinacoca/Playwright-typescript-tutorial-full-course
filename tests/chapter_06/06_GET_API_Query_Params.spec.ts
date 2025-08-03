import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.use({
  baseURL: process.env.BASE_API_URL,
})

test('Create GET API request using Query Params', async({request}) =>{
  const firstName = faker.person.firstName(); 
  const lastName = faker.person.lastName(); 
  const totalprice = faker.number.int({min: 1000, max: 10000});
  const depositepaid = faker.datatype.boolean();
  const additionalneeds = faker.person.jobTitle();
  const checkin = faker.date.recent().toISOString().split('T')[0];
  const checkout = faker.date.recent().toISOString().split('T')[0];

  const postAPIrequestBody = {
    firstname: firstName,
    lastname: lastName,
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

  // Create GET API request using Query Params
  console.log("\nconst bookingId = jsonResponse.bookingid")
  const bookingId = jsonResponse.bookingid;
  
  console.log("👉🏽 const bookingId = jsonResponse.bookingid")
  console.log("bookingId: ", bookingId);

  // GET API Request
  const getAPIresponse = await request.get(`/booking/`, {
    params:{
      firstname:  firstName,
      lastname:  lastName,
    }
  });
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

})
