const sqlite3 = require("sqlite3").verbose()
const {faker} = require("@faker-js/faker");
const {promisify} = require("util")
const fs = require('fs'); 
const csv = require('csv-parser');


// connect to  DB
const db = new sqlite3.Database('./book.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.error(err.message)
});

const query = promisify(db.all).bind(db);


const createTableQuery = "CREATE TABLE IF NOT EXISTS book (id INTEGER PRIMARY KEY, title TEXT NOT NULL, author TEXT NOT NULL, status BOOLEAN DEFAULT 0, borrower DEFAULT null,date DEFAULT null)";

// const newBook = {
//     title: faker.name.jobTitle(),
//     author: faker.name.firstName(),
//     status: true,
//     borrower: faker.name.lastName(),
//     date: faker.date.past().getTime()
// }

const books = []

fs.createReadStream('./doc.csv', "latin1")
.pipe(csv({separator: ";"}))
.on('data', function(data){
    try {
        books.push(data)
    }
    catch(err) {
        //error handler
    }
})
.on('end',function(){
    
});  


const create = async ({ table, object }) => {
    const keys = Object.keys(object).join(",");
    const values = Object.values(object)
      .map((v) => `"${v}"`)
      .join(",");
    const res = await query(`INSERT INTO ${table} (${keys}) VALUES (${values})`);
    return res;
  };

  const read = async ({ table }) => {
    const res = await query(`SELECT * FROM ${table}`);
    return res;
  };

  const run = async () => {
    await query(createTableQuery);

    for (let book of books){
      await create({ table: "book", object: book });
    }

    const results = await read({ table: "book" });
    console.log(results);
  };
  
  run();


