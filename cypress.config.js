const { defineConfig } = require("cypress");
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin')
const { verifyDownloadTasks } = require('cy-verify-downloads');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const xlsx = require('xlsx')
const fs = require('fs')

const excelToJson = require('convert-excel-to-json')

module.exports = defineConfig({

  projectId: 'atpvqq',
  chromeWebSecurity: false,
  video: true,
  screenshotOnRunFailure: true,
  experimentalStudio: true,
  defaultCommandTimeout : 15000, //15 sec
  videoCompression: true,
  screenshotsFolder: "cypress/reports/mochareports/assets",

  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "mochawesome",
    mochawesomeReporterOptions: {
      reportDir: "cypress/reports/mocha",
      quite: true,
      overwrite: false,
      html: false,
      json: true,
    }
  },  

  env: {
    url: "https://rahulshettyacademy.com",
    appURL : "https://opensource-demo.orangehrmlive.com/"
  },

  retries: 0, //runMode: 1, openMode : 1

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      //mochawesome reporter - Html report
      require('cypress-mochawesome-reporter/plugin')(on);;

      //download file
      on('task', { downloadFile })

      //verify download
      on('task', verifyDownloadTasks)

      //allure report
      module.exports = (on, config) => {
        allureWriter(on, config);
        return config;
      };

      //excel 
      on('task', {
        generateJSONFromExcel: generateJSONFromExcel,
      })


      //cucumber
      module.exports = (on, config) => {
        on('file:preprocessor', cucumber())
      }

      //excel - function
      function generateJSONFromExcel(agrs) {
        const wb = xlsx.readFile(agrs.excelFilePath, { dateNF: "mm/dd/yyyy" });
        const ws = wb.Sheets[agrs.sheetName];
        return xlsx.utils.sheet_to_json(ws, { raw: false });
      }

      //excel to json converter
      on('task', {
        excelToJsonConverter(filePath){
            const result =  excelToJson({
            source: fs.readFileSync(filePath)  //fs.readFileSync return a Buffer
        });
        return result;
        }
      })

    },
    specPattern: 'cypress/integration/examples/Scripts/OrangeHRMTest.js'  //cypress/integration/examples/*.js
    //cucumber run -  **/*.feature  
  },
})
