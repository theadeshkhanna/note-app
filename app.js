

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};
const argv = yargs
.command('add','Add a new note', {
    title:titleOptions,
    body:bodyOptions
})
.command('list','List all notes')
.command('read','read a note',{
    title:titleOptions,
})
.command('remove','remove a note',{
    title:titleOptions,

})
.command('read','reading a note',{
    title:titleOptions
})
.help()
.argv;
var command = argv._[0];


if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if(note){
        console.log('note created');
        notes.logNotes(note);
    }else{
        console.log('note title already in use');
    }
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNotes(note));
} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if(note){
        console.log('Note found');
        note.logNotes(note);
    }else{
        console.log('No such note exist');
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was Removed' : 'Note not found';
    console.log(message); 
} else {
    console.log('Command not recongnized');
}

