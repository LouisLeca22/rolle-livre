const router = require("express").Router();
const Book = require("../db/Book")

router.get("/", async (req, res) => {
    let books = await Book.getAll();

    if(!books?.length){
        return res.status(400).json({message: "Il n' y a aucun livre !"})
    }

    books = books.map(book => ({...book, status: Boolean(book.status)}))
    res.status(200).json(books)
})

router.post("/", async (req, res) => {
        const {title, author } = req.body 
        if(!title || ! author){
            return res.status(400).json({message: "Tous les champs doivent être remplis"})
        }

        const duplicate = await Book.getByTitle(title)
        if(duplicate.length !== 0){
            return res.status(409).json({message: "Un livre avec un titre similaire a déjà été ajouté"})
        }

        const data = {
            title, 
            author,
            status: false,
            borrower: null,
            date: null
        }

        const book = await Book.createOne(data)
      
        if(book){
            return res.status(201).json({book: data, message: "Le livre a été ajouté"})
        } else {
            return res.status(400).json({message: "Données invalides..."})
        }
})



router.get("/:id", async (req, res) => {
    const result = await Book.getById(req.params.id)
    if(result.length === 0){
        res.status(400).json({message: "Aucun livre n'a été trouvé"})
    }
    let book  = result[0]
    book.status = Boolean(book.status)
    res.status(200).json(book)
})

router.patch("/", async (req, res) => {
    const {id, title, author, status, borrower, date} = req.body 
    if(!id || !title || !author || typeof status !== 'boolean') {
        return res.status(400).json({message: "tous les champs doivent être remplis"})
    }

    if(status && ((borrower === undefined || borrower === null) || (date === undefined || date === null ))){
        return res.status(400).json({message: "Un emprunteur et une date doivent être ajoutés"})
    }

    const result = await Book.getById(id);
    if(result.length === 0){
        return res.status(400).json({message: "Ce livre n'existe pas"})
    }

    const duplicate = await Book.getByTitle(title)
    if(duplicate.length !== 0 && duplicate[0].id !== id){
        return res.status(409).json({message: "Un autre livre avec le même titre existe déjà"})
    }

    const data = {
        title, 
        author,
        status,
        borrower: status ? borrower : null,
        date: status ? date : null,
    }

    const updatedBook = await Book.updateOne(id, data)
    if(updatedBook){

        res.json({book: {id, ...data}, message: "Le livre a bien été modifié"})
    } else {
        res.status(400).json({message: "Données invalides"})
    }
})

router.delete("/", async (req, res) => {
    const {id} = req.body

    if (!id) {
        return res.status(400).json({ message: 'L\'identifiant du livre est nécessaire' })
    }

    const book = await Book.getById(id)

    if (!book) {
        return res.status(400).json({ message: 'Ce livre n\'existe pas' })
    }

    await Book.deleteOne(id)

    res.json({message: `Le livre ${id} a été supprimé` })

})



module.exports = router;