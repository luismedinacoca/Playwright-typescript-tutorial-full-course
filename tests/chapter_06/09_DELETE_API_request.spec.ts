import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import tokenAPIRequest from '../../test-data/api_requests/Token_API_REquest.json';
import patchAPIRequest from '../../test-data/api_requests/PATCH_API_Requeest.json';
test.use({
  baseURL: process.env.BASE_API_URL,
})
test('Create DELETE API request using Faker library only ', {tag: ['@PlaywrightWithJenkins']}, async({request}) =>{
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
  console.log("👉🏽 getAPIresponse: ", getAPIresponse); 
  console.log("\n👉🏽 GET API Headers:")
  console.log("getAPIresponse.headers(): ", getAPIresponse.headers()); 
  console.log("\n👉🏽 GET API Request Body:")
  const jsonGetAPIresponse = await getAPIresponse.json();
  console.log("const jsonGetAPIresponse = await getAPIresponse.json()")
  console.log("jsonGetAPIresponse: ", jsonGetAPIresponse); 

  // Generate Token API Request:
  const tokenAPIresponse = await request.post(`/auth`, {
    data: tokenAPIRequest,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
  expect(tokenAPIresponse.status()).toBe(200);
  console.log("expect(tokenAPIresponse.status()).toBe(200)");
  expect(tokenAPIresponse.statusText()).toBe('OK');
  console.log("expect(tokenAPIResponse.statusText()).toBe('OK');");
  const tokenAPIJsonResponse = await tokenAPIresponse.json();
  console.log("const tokenAPIJsonResponse = await tokenAPIresponse.json()");
  const token =  tokenAPIJsonResponse.token;
  console.log("const token =  tokenAPIJsonResponse.token");
  console.log("🔐 Token: ", token);
  
  // DELETE API Request
  const deleteAPIresponse = await request.delete(`/booking/${bookingId}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cookie': `token=${token}`,
    },
  });
  expect(deleteAPIresponse.status()).toBe(201);
  console.log("expect(patchAPIresponse.status()).toBe(201)");
  expect(deleteAPIresponse.statusText()).toBe('Created');
  console.log("expect(deleteAPIresponse.statusText()).toBe('Created')");
  console.log("\n👉🏽 DELETE API Response body:", await deleteAPIresponse.body());
})
