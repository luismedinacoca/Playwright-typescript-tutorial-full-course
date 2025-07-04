// Import xlsx
import * as EXCEL from 'xlsx';
import fs from 'fs';

// Deifine test data structure
interface TestRecord {
  skill_01: string,
  skill_02: string
}

// create method to read excel file
export function readExcelFile(filePath:string){
  // Read the excel file as binary string
  const file = fs.readFileSync(filePath);

  // Parse into workbook
  const workbook = EXCEL.read(file);

  // Get first sheet
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  // Convert sheet into json
  const rawData: any[] = EXCEL.utils.sheet_to_json(sheet, {header:1});

  // convert raw data into TestRecord
  const records: TestRecord[] = rawData.slice(1).map( (column: any) => ({
    skill_01: column[0],
    skill_02: column[1]
  }));

  return records;
}
