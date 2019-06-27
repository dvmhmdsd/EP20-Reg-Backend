const googleSheet   = require("google-spreadsheet");
const {promisify}   = require("util");

//getting the client credentials
const creds = require("./client_secret.json");

var sheet;

async function setup() {
    const doc = new googleSheet('1fCSLs_zB7Jq2GDnk-9nNhcTj2bYv06ToXvTt_9H-3NE');
    await promisify(doc.useServiceAccountAuth)(creds);

    const info = await promisify(doc.getInfo)();
    sheet = info.worksheets[0];
}

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