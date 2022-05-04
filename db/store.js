const fs = require("fs");
const path = require("path");
const util = require("util");
const express = require("express");
const app = express();

// Creates a promise that the program will complete before continuing. 
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    constructor() {
        this.lastId = 0;
    };
    read() {
        return readFileAsync(path.join(__dirname, "db.json"), "utf8");
    };
    write(note) {
        return writeFileAsync(path.join(__dirname, "db.json"), JSON.stringify(note));
    };
    getNotes() {
        return this.read().then(notes => {
            let parsedNotes = JSON.parse(notes);
            console.log(parsedNotes);
            return parsedNotes;
        });
    };
    addNote(newNote) {
        console.log(newNote);
        return this.getNotes().then(notes => {
            const newNoteList = [...notes, newNote]; // Creates a new array with the memebers of the array notes and adds newNote to the end
            console.log(newNoteList);
            return this.write(newNoteList);
        })
    };
    deleteNotes(title) {
        // use the filter function
        return this.getNotes()
            .then(notes => {
                console.log("This note says " + title);
                for (var i = 0; i < notes.length; i++) {
                    if (notes[i].title === title) {
                        // Splice takes i position, and then deletes the 1 note.
                        notes.splice(i, 1);
                        console.log(notes);
                        break;
                    }
                }
                this.write(notes);

            })
    }
};

const store = new Store();

module.exports = store;
