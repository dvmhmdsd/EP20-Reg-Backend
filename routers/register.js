

//Export Google Sheets API config file
const Gsheet = require("../config/sheet");

router.post("/", (req, res) => {
    //Adding the row to the sheet
    Gsheet.createRow(req.body, (err, row) => {
        if (!err) res.sendStatus(200);
    });
});