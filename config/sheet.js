const googleSheet   = require("google-spreadsheet");
const {promisify}   = require("util");

//getting the client credentials
const creds = require("./client_secret.json");

var sheet;

async function setup() {
    const doc = new googleSheet('1wRglbpPNxBYlN9nckwrqyxIfgos-1L1s13n4g8c6E2k');
    await promisify(doc.useServiceAccountAuth)(creds);

    const info = await promisify(doc.getInfo)();
    sheet = info.worksheets[0];
}

setup();

module.exports = {
    test: async function() {
        console.log(`Title: ${sheet.title}`);
        const row1 = await promisify(sheet.getRows)({
            offset: 1
        });
        console.log(row1);
    },
    createRow: async function(row) {
        await promisify(sheet.addRow)(row);
    }
};