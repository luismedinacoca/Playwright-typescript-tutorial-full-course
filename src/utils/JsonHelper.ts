import fs from 'fs';
import path from 'path';
import { TestData } from '../interface/Module1TestData.interface';

export async function loadTestData(){
  const environment = `${process.env.TEST_EXECUTION_ENV}` || 'qa';
  const directoryPath = path.join(__dirname, `../../test-data/`, environment);

  const jsonData: TestData = {};

  // reading directory/folder
  fs.readdirSync(directoryPath).forEach(file => {
    if(path.extname(file) === '.json'){
      const filePath = path.join(directoryPath, file);

      //reading the file content
      const fileContent: TestData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      
      //merge the content into a sinle object
      Object.assign(jsonData, fileContent);
    }
  })
  return jsonData;
}
