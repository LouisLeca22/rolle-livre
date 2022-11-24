const fs = require('fs'); 
const csv = require('csv-parser');

const books = [];

fs.createReadStream('./doc.csv', "latin1")
.pipe(csv({separator: ";"}))
.on('data', function(data){
    const array = []
    try {
        console.log(data)
       array.push(data)

        //perform the operation
    }
    catch(err) {
        //error handler
    }
})
.on('end',function(){
    console.log(books)
});  
