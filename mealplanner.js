const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs')
const path = require('path');
const { contextIsolated } = require('process');

document.addEventListener('DOMContentLoaded', () => {
    var btnCreate = document.getElementById('btnCreate');
    var btnUpdate = document.getElementById('btnUpdate');
    var btnDelete = document.getElementById('btnDelete');
    var mealList = document.getElementById('mealList');
    
    var selectedRow = null;

    btnCreate.addEventListener('click', function() {// Creating Data When User Click CREATE Button
        var mealName = document.getElementById('fileContents').value
        var mealDate = document.getElementById('mealdate').value
        var mealType = document.getElementById('mealType').value

        if (mealName && mealDate && mealType) {
            if (!selectedRow) {
                addMeal(mealName, mealDate, mealType)
            }
            else {
                updateMeal(mealName, mealDate, mealType)
            }
        }
        else {
            console.log(`Please fill in all fields`)
        }
    })

    btnDelete.addEventListener('click', function() {
        if (selectedRow) {
            deleteMeal(selectedRow)
        }
        else {
            console.log(`Select a Meal to Delete`)
        }
    })

    // Function to Add a New Meal to the Meal List
    function addMeal(name, date, type) {
        // Create a new row
        var row = document.createElement('tr')
        row.innerHTML = `
        <td>${name}</td>
        <td>${date}</td>
        <td>${type}</td>
        <td><button onclick= "selectMeal(this)">Edit</button></td>`
        // Append the new row to the meal list
        mealList.appendChild(row)
        // Clear form fields after adding the meal
        clearForm()
    }

    // Function to update the selected meal with new data
    function updateMeal(name, date, type) {
        // Update the text content of the selected row's cells
        selectedRow.children[0].textContent = name;
        selectedRow.children[1].textContent = date;
        selectedRow.children[2].textContent = type;
        // Clear form fields and reset selected row after updating
        clearForm();
        selectedRow = null;
    }

    // Function to delete a meal from the meal list
    function deleteMeal(row) {
        mealList.removeChild(row);
        clearForm();
        selectedRow = null;
    }
        // Function to select a meal row for editing (triggered by clicking "Edit")
        window.selectMeal = (button) => {
            // Set the selected row to the parent of the clicked button
            selectedRow = button.parentElement.parentElement;
            // Populate form fields with the data from the selected row
            document.getElementById('fileContents').value = selectedRow.children[0].textContent;
            document.getElementById('mealdate').value = selectedRow.children[1].textContent;
            document.getElementById('mealType').value = selectedRow.children[2].textContent;
        };
    
        // Function to clear all form fields and reset the meal type to default
        function clearForm() {
            document.getElementById('fileContents').value = ''; // Clear meal name field
            document.getElementById('mealdate').value = ''; // Clear date field
            document.getElementById('mealType').value = 'breakfast'; // Reset meal type to "breakfast"
        }
})
