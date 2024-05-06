const express = require('express')
const mongoose = require('mongoose')
const app = express();

const uri = "mongodb+srv://Cluster48763:ms1552@notes.m5me51g.mongodb.net/?retryWrites=true&w=majority&appName=notes";
app.use(express.json());

async function connect(){
    try{
        await mongoose.connect(uri)
        console.log("Connected to MDB");
    } catch (error) {
        console.error(error);
    }
}

connect();
const port = process.env.PORT || 5050;
app.listen(port, "0.0.0.0", ()=>{console.log("Server started on port 5050")});
const noteSchema = new mongoose.Schema({
    key:Number, 
    title: String, 
    content: String,
})
const noteModel = mongoose.model("notes", noteSchema)

let notes = [
    {
      key: 1,
      title: "Delegation",
      content:
        "Q. How many programmers does it take to change a light bulb? A. None – It’s a hardware problem",
    },
    {
      key: 2,
      title: "Loops",
      content:
        "How to keep a programmer in the shower forever. Show him the shampoo bottle instructions: Lather. Rinse. Repeat.",
    },
    {
      key: 3,
      title: "Arrays",
      content:
        "Q. Why did the programmer quit his job? A. Because he didn't get arrays.",
    },
    {
      key: 4,
      title: "Hardware vs. Software",
      content:
        "What's the difference between hardware and software? You can hit your hardware with a hammer, but you can only curse at your software.",
    }
  ];
  
// app.get("/api", (req, res) => {
//     res.json({"notes":notes })
// })

app.get("/api/", async(req, res) =>{
    try {
        const noteData = await noteModel.find();
        res.json({"notes":noteData});
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


app.post("/api/add/", async(req, res) => {
    // const { title, content } = req.body;
    // const nextKey = notes.reduce((max, note) => (note.key > max ? note.key : max), 0) + 1;
    // const newNote = {
    //     key: nextKey,
    //     title,
    //     content
    // };
    // notes.push(newNote);
    // res.status(201).json(newNote);
    try {
        const { key, title, content } = req.body;
        if (!key || !title || !content) {
            return res.status(400).json({ error: "Key, title, and content are required" });
        }

        const newNote = new noteModel({
            key,
            title,
            content,
        });

        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        console.error("Error adding note:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

});

app.delete("/api/delete/:id", async(req, res) => {
        // const id = parseInt(req.params.id)+1;
        // const index = notes.findIndex(note => note.key === id);
        //     if (index === -1) {
        //     return res.status(404).json({ error: "Note not found." });
        // }
        // notes.splice(index, 1);
        // res.status(200).json({ message: "Note deleted." });

        const key = parseInt(req.params.id);

        try {
            const deletedNote = await noteModel.findOneAndDelete({ key: key });
            if (!deletedNote) {
            return res.status(404).json({ error: "Note not found." });
            }
            
            res.status(200).json({ message: "Note deleted.", deletedNote });
        } catch (error) {
            console.error('Error deleting note:', error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    

