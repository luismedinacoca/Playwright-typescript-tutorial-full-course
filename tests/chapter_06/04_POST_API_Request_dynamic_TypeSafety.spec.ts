import { test, expect } from '@playwright/test';
import { formatAPIRequest } from '../../src/utils/APIHelper';
import { faker } from '@faker-js/faker';

import path from 'path';
import fs from 'fs';

test.use({
  baseURL: process.env.BASE_API_URL,
})

/**
 * Author Luiggie
 */
test('Create POST API request using Faker library', async({request}) =>{
  const firstname = faker.person.firstName(); 
  const lastname = faker.person.lastName(); 
  const totalprice = faker.number.int({min: 1000, max: 10000});

  const filePath = path.join(__dirname, '../../test-data/api_requests/dynamic_POST_API_request.json');
  const jsonTemplate =fs.readFileSync(filePath,'utf-8'); 

  const values = [firstname, lastname, totalprice];

  // Updating POST API request body
  const postAPIrequest = await formatAPIRequest(jsonTemplate, values); 
  // 👉🏽 return all its values as STRING -> 👀 "totalprice" is still "1500"
  const jsonPostAPIrequest = JSON.parse(postAPIrequest);
  console.log('👉🏽 jsonPostAPIrequest: ', jsonPostAPIrequest);
  console.log('')

  const totalPrice = Number(jsonPostAPIrequest['totalprice']);
  jsonPostAPIrequest['totalprice'] = totalPrice;
  console.log('✅ jsonPostAPIrequest: ', jsonPostAPIrequest);
  console.log('');

  // Create POST API Request
  /**
   // Create POST API Request
    const postAPIresponse = await request.post(
      `/booking`, 
      {
        data: jsonPostAPIrequest,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": "Bearer tu_token_aquí"
        }
      }
    });
  */
  const postAPIresponse = await request.post(`/booking`, { data: jsonPostAPIrequest });
  console.log("postAPIresponse: ", postAPIresponse); //response header 

  // Print JSON  API response
  const jsonResponse = await postAPIresponse.json();
  console.log("")
  console.log("jsonResponse: ", jsonResponse); //response body
  console.log("POST API response: " + JSON.stringify(jsonResponse, null, 2) ); // null: no update, 2: number of spaces

  console.log("--------------------------------");

  // Validating API response
  expect(postAPIresponse.status()).toBe(200);
  console.log('expect(postAPIresponse.status()).toBe(200)');
  expect(postAPIresponse.statusText()).toBe("OK");
  console.log('expect(postAPIresponse.statusText()).toBe("OK")')
  expect(postAPIresponse.headers()['content-type']).toContain('application/json');
  console.log("expect(postAPIresponse.headers()['content-type']).toContain('application/json')")

  // Validate property/value names:
  expect(jsonResponse.booking).toHaveProperty('firstname');
  console.log("expect(jsonResponse.booking).toHaveProperty('firstname')")
  expect(jsonResponse.booking).toHaveProperty('lastname');
  console.log("expect(jsonResponse.booking).toHaveProperty('lastname')")
  expect(jsonResponse.booking).toHaveProperty('totalprice');
  console.log("expect(jsonResponse.booking).toHaveProperty('totalprice')")
  expect(jsonResponse.booking).toHaveProperty('depositpaid');
  console.log("expect(jsonResponse.booking).toHaveProperty('depositpaid')")
  expect(jsonResponse.booking).toHaveProperty('bookingdates');
  console.log("expect(jsonResponse.booking).toHaveProperty('bookingdates')")
  expect(jsonResponse.booking.bookingdates).toHaveProperty('checkin');
  console.log("expect(jsonResponse.booking.bookingdates).toHaveProperty('checkin')")
  expect(jsonResponse.booking.bookingdates).toHaveProperty('checkout');
  console.log("expect(jsonResponse.booking.bookingdates).toHaveProperty('checkout')")
  expect(jsonResponse.booking).toHaveProperty('additionalneeds');
  console.log("expect(jsonResponse.booking).toHaveProperty('additionalneeds')")

  console.log("--------------------------------");
  // Validate APIresponse body:
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