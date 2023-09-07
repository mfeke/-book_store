const Book = require('../models/book');

exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOne = (req, res) => {
  const id = req.params.id;
  
   Book.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message:` Cannot delete Book with id=${id}. Maybe Post was not created!`
          });
        } else {
          res.send({
            message: "Post was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Book with id=" + id
        });
      });
};
exports.deleteAll = (req, res) =>{
   Book.deleteMany()
   .then(data=>{
    res.send({message:`${data.deletedCount} Book were deleted successfully!`})
   })
   .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all posts."
    });
  })
   
   
}

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Book.findByIdAndUpdate(id, req.body, { useFindAndModify: true})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Post with id=${id}. Maybe Post was not created!`
        });
      } else res.send({ message: "Post was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating the Post with id=" + id
      });
    });
};
exports.findById = (req, res ) =>{
  const id = req.params.id;
  
  Book.findById(id, { useFindAndModify: false })
  .then(data => {
       if (!data) {
         res.status(404).send({
           message:` Cannot find Book with id=${id}. Maybe Book was not created!`
         });
       } else {
         res.send(data)
       }
  })
  .catch(err => {
       res.status(500).send({
         message: "Could not find Book with id=" + id
       });
  });
}


  


// Implement other CRUD operations (getBookById, updateBook, deleteBook) here...