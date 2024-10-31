const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs')
const path = require('path');
const { contextIsolated } = require('process');

var btnCreate = document.getElementById('btnCreate')
var btnRead = document.getElementById('btnRead')
var btnDelete = document.getElementById('btnDelete')
var fileName = document.getElementById('fileName')
var fileContents = document.getElementById('fileContents')

let pathName = path.join(__dirname, 'Files')

btnCreate.addEventListener('click', function() {// Creating Text File When USer Click CREATE Button
    let file = path.join(pathName, fileName.value)
    let contents = fileContents.value
    fs.writeFile(file, contents, function(err) {//param1 : textfile yang kita nak write param2 : apa yang kita nak write ke text file
        if (err) {
            return console.log(err)
        }
        var txtfile = document.getElementById("fileName").value
        alert(txtfile + "text file was created")
        console.log("The file was created")
    })

})

btnRead.addEventListener('click', function() {// Read Contents of The Created Tex File
    let file = path.join(pathName, fileName.value)

    fs.readFile(file, function(err, data) {
        if (err) {
            return console.log(err)
        }
        fileContents.value = data
        console.log("The file was read!")
    })
})

btnDelete.addEventListener('click', function(){
    let file = path.join(pathName, fileName.value)

    fs.unlink(file, function(err){
        if (err) {
            return console.log(err)
        }
        fileName.value = ""
        fileContents.value = ""
        console.log("The file was deleted")
    })
    
})

btnUpdate.addEventListener('click', function() {
    let file = path.join(pathName, fileName.value)
    let contents = fileContents.value
    fs.writeFile(file, contents, function(err) {//param1 : textfile yang kita nak write param2 : apa yang kita nak write ke text file
        if (err) {
            return console.log(err)
        }
        var txtfile = document.getElementById("fileName").value
        alert(txtfile + "text file was updated")
        console.log("The file was updated")
    })
})