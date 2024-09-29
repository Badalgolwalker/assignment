const { asyncerror } = require("../middleware/asyncerror");
const Transaction = require("../models/transaction");
const Book = require("../models/bookmodel");
const Errorhandler = require("../utils/Errorhandler");
const usermolde = require("../models/usermolde");


exports.issue = asyncerror(async (req, res, next) => {
    const { bookId, userId } = req.body;
    const book = await Book.findById(bookId);
    const user = await usermolde.findById(userId);
    if (!book) {
        return next(new Errorhandler("Book not found", 404));
    }else{

        if (book.isAvailable) {
            const transaction = new Transaction({
                bookId, 
                userId, 
                issueDate: new Date(),
                status: "issued"
             });
             transaction.save();
             book.isAvailable = false;
             book.save();
             user.issuedbook.push(book._id);
             user.save();

             res.status(200).send('Book issued successfully');
        }
        else{
            res.status(400).send('Book not available');
        }
    }


    
})

exports.returned = asyncerror(async (req, res, next) => {
    const { bookId, userId } = req.body;
    if(!bookId || !userId){
        return next(new Errorhandler("Please provide bookId and userId", 400));
    }
    const user = await usermolde.findById(userId);

    const book = await Book.findById(bookId);
    if(book.isAvailable === false){
        
        const transaction = new Transaction({
           bookId, 
           userId, 
           returnDate: new Date(),
           status: "returned"
        });
        transaction.save();
        book.isAvailable = true;
        book.save();
        if(user.issuedbook.includes(book._id)){
            user.issuedbook.pull(book._id);
            user.save();
        }
        res.status(200).send('Book returned successfully');
    }
    else{
        res.status(400).send('Book not issued');

    }
})


exports.issueStatus = asyncerror(async (req, res, next) => {

const bookId = req.params.id;

const transaction = await Transaction.find({bookId:bookId}).populate("userId");
const book = await Book.findById(bookId);

let currentstatus = book.isAvailable ? "available" : "issued"

const issued = transaction.filter(t => t.status === "issued")
const totaluser = issued.length
const currentUser = issued.length > 0 ? issued[0].userId : null

res.status(200).json({totaluser,
    currentUser:currentUser.username,
    currentstatus
    
})


})


exports.totalrent = asyncerror(async (req, res, next) => {
    const bookId = req.params.id;

    const transaction = await Transaction.find({bookId:bookId,status:"returned"}).populate("userId");
    const book = await Book.findById(bookId);
    const issued = transaction.filter(t => t.status === "returned")
    const total = issued.length

    const totalrent = book.rentPerDay * total
    res.status(200).json({totalrent,
        MessageChannel:"Total Rent Per Day"
    })
})

exports.daterange = asyncerror(async (req, res, next) => {
    const { startDate, endDate } = req.query;

const transaction = await Transaction.find({
    issuedate: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
    }
});
    if (transaction.length === 0) {
        return res.status(404).json({ message: "No transactions found in this date range." });
    }

    res.status(200).json(transaction);
});


