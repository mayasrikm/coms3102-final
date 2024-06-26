const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();

const uri = "mongodb+srv://Cluster48763:ms1552@notes.m5me51g.mongodb.net/?retryWrites=true&w=majority&appName=notes";
app.use(express.json());
app.use(cors());
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

app.delete("/api/delete/:key", async(req, res) => {
        // const id = parseInt(req.params.id)+1;
        // const index = notes.findIndex(note => note.key === id);
        //     if (index === -1) {
        //     return res.status(404).json({ error: "Note not found." });
        // }
        // notes.splice(index, 1);
        // res.status(200).json({ message: "Note deleted." });

        const key = parseInt(req.params.key);
        console.log("HELLO", key);
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
    

