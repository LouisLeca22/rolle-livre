const db = require("./connectDB");

function getAll(){
    return db("book").select("*").orderBy("id", "desc")
}

function getById(id){
    return db("book").where("id", id).select("*")
}

function getByTitle(title){
    return db("book").where("title", title).select("*")
}

function createOne(book){
    return db("book").insert(book);
}

function deleteOne(id){
    return db("book").where("id", id).del();
}

function updateOne(id, book){
    return db("book").where("id", id).update(book);
}

module.exports = {getAll, getById, getByTitle, createOne, updateOne, deleteOne}