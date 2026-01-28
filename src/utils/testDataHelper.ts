import * as fs from "fs";
import * as path from "path";

/**
 * Extract JIRA ID from test file name
 * Example: ballotQueue_INT-8382.spec.ts => INT-8382
 */
export function extractJiraId(testFileName: string): string | null {
  const match = testFileName.match(/_([A-Z]+-\d+)/);
  return match ? match[1] : null;
}

/**
 * Get test data file path based on JIRA ID
 */
export function getTestDataFilePath(jiraId: string): string {
  const testDataDir = path.join(process.cwd(), "src", "test-data");
  return path.join(testDataDir, `${jiraId}.json`);
}

/**
 * Read and parse JSON test data file
 */
export function readTestData(jiraId: string): Record<string, any> {
  try {
    const filePath = getTestDataFilePath(jiraId);

    if (!fs.existsSync(filePath)) {
      throw new Error(`Test data file not found: ${filePath}`);
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error: any) {
    throw new Error(`Error reading test data for ${jiraId}: ${error.message}`);
  }
}

/**
 * Get test data by key from JSON file
 */
export function getTestDataValue(jiraId: string, key: string): any {
  const testData = readTestData(jiraId);

  if (!(key in testData)) {
    throw new Error(`Key "${key}" not found in test data for ${jiraId}`);
  }

  return testData[key];
}

/**
 * Create test data file
 */
export function createTestDataFile(
  jiraId: string,
  data: Record<string, any>
): void {
  try {
    const testDataDir = path.join(process.cwd(), "src", "test-data");

    if (!fs.existsSync(testDataDir)) {
      fs.mkdirSync(testDataDir, { recursive: true });
    }

    const filePath = getTestDataFilePath(jiraId);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`Test data file created: ${filePath}`);
  } catch (error: any) {
    throw new Error(`Error creating test data file: ${error.message}`);
  }
}

/**
 * Read all test data files in a directory
 */
export function readAllTestData(): Record<string, Record<string, any>> {
  try {
    const testDataDir = path.join(process.cwd(), "src", "test-data");
    const allData: Record<string, Record<string, any>> = {};

    if (!fs.existsSync(testDataDir)) {
      return allData;
    }

    const files = fs.readdirSync(testDataDir);

    files.forEach((file) => {
      if (file.endsWith(".json")) {
        const jiraId = file.replace(".json", "");
        const filePath = path.join(testDataDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        allData[jiraId] = JSON.parse(fileContent);
      }
    });

    return allData;
  } catch (error: any) {
    throw new Error(`Error reading test data: ${error.message}`);
  }
}

/**
 * Delete test data file
 */
export function deleteTestDataFile(jiraId: string): void {
  try {
    const filePath = getTestDataFilePath(jiraId);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Test data file deleted: ${filePath}`);
    }
  } catch (error: any) {
    throw new Error(`Error deleting test data file: ${error.message}`);
  }
}

/**
 * Check if test data file exists
 */
export function testDataExists(jiraId: string): boolean {
  const filePath = getTestDataFilePath(jiraId);
  return fs.existsSync(filePath);
}

/**
 * Load test data from file based on test info
 * Extracts JIRA ID from test file name and reads corresponding JSON data
 * @param testInfo - Playwright test.info() object
 * @returns Test data object from JSON file
 */
export function loadTestDataFromFile(testInfo: any): Record<string, any> {
  const testFileName = testInfo.file.split("\\").pop()?.split("/").pop() || "";
  const jiraId = extractJiraId(testFileName);

  if (!jiraId) {
    throw new Error(
      `Could not extract JIRA ID from test file name: ${testFileName}. ` +
        `Expected format: testName_JIRA-123.spec.ts`
    );
  }

  console.log(`Loading test data for ${jiraId}...`);
  const testData = readTestData(jiraId);
  console.log(`Test Data for ${jiraId}:`, testData);

  return testData;
}
