// import playwright module
import { test, expect } from '@playwright/test';
import postAPIrequest from '../../test-data/api_requests/POST_API_request.json';

test.use({
  baseURL: process.env.BASE_API_URL,
})

/**
 * Author Luiggie
 */
test('Create POST API request using static file ', async({request}) =>{
  const postAPIresponse = await request.post(`/booking`, { data: postAPIrequest });

  // Create POST API Request
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
  expect(jsonResponse.booking.firstname).toBe(postAPIrequest.firstname);
  console.log("expect(jsonResponse.booking.firstname).toBe(postAPIrequest.firstname)");
  expect(jsonResponse.booking.lastname).toBe(postAPIrequest.lastname);
  console.log("expect(jsonResponse.booking.lastname).toBe(postAPIrequest.lastname)");
  expect(jsonResponse.booking.totalprice).toBe(postAPIrequest.totalprice);
  console.log("expect(jsonResponse.booking.totalprice).toBe(postAPIrequest.totalprice)");
  expect(jsonResponse.booking.depositpaid).toBe(postAPIrequest.depositpaid);
  console.log("expect(jsonResponse.booking.depositpaid).toBe(postAPIrequest.depositpaid)");
  expect(jsonResponse.booking.bookingdates.checkin).toBe(postAPIrequest.bookingdates.checkin);
  console.log("expect(jsonResponse.booking.bookingdates.checkin).toBe(postAPIrequest.bookingdates.checkin)");
  expect(jsonResponse.booking.bookingdates.checkout).toBe(postAPIrequest.bookingdates.checkout);
  console.log("expect(jsonResponse.booking.bookingdates.checkout).toBe(postAPIrequest.bookingdates.checkout)");
  expect(jsonResponse.booking.additionalneeds).toBe(postAPIrequest.additionalneeds);
  console.log("expect(jsonResponse.booking.additionalneeds).toBe(postAPIrequest.additionalneeds)");

  console.log("--------------------------------");


})