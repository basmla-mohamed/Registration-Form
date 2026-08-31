/*----------------------------------------------------Select Elements---------------------------------------------------------------*/
let
registerForm = document.querySelector("form"),
registerInputs = registerForm.querySelectorAll("input"),                                    //input form
students= [],                                                                               //all student will send we are collected in array and in the start the array empty
id = 0 ,
oldStudent = null,
tableBody = document.querySelector("tbody"),                                                //in the start id = 0
regexInputs = {
    firstName : /^[A-Za-z ]+$/,
    lastName : /^[A-Za-z ]+$/,
    email : /^[A-Za-z][A-Za-z0-9\.]+@(gmail|yahoo)\.(com|org)$/,
    age: /^[0-9]{2}$/,
    phone : /^(02)?(010|011|012|015)[0-9]{8}$/,
    },
darkTHemeButton = document.querySelector("button.darkTheme"),
searchInput = document.querySelector("#searchInput");



/*----------------------------------------------------Local Storage---------------------------------------------------------------*/
if (localStorage.getItem("students") == null){
     updateLocalstorage();
}else{
    students = JSON.parse(localStorage.getItem("students"));
    id = students[students.length -1] ?.id ?? 0;
    showStudent(students);
}


/*----------------------------------------------------Submit form---------------------------------------------------------------*/
registerForm.addEventListener("submit", function(e){

    e.preventDefault();

    let formDataSet = registerForm.getAttribute("data-type");

    if(formDataSet == "add"){

        addStudent();

    }else if(formDataSet == "edit"){

        editStudent();
    }
});


/*----------------------------------------------------SEARCH---------------------------------------------------------------*/
searchInput.addEventListener("keyup",function(){
    search(this.value);
});


/*----------------------------------------------------Dark theme---------------------------------------------------------------*/
darkTHemeButton.addEventListener("click", function(){

    let label = document.querySelectorAll("label"),
        searchInput = document.querySelector("#search input"),
        searchLabel = document.querySelector("#search label"),
        table = document.querySelector("table"),
        myButton = document.querySelector("button.darkTheme");

    myButton.classList.toggle("dark");

    registerForm.classList.toggle("dark");



    registerInputs.forEach(function(input){
        input.classList.toggle("dark");
    });

    searchInput.classList.toggle("dark");


    table.classList.toggle("dark");



label.forEach(function(label){
    label.classList.toggle("dark");
});
localStorage.setItem("theme", registerForm.classList.contains("dark"));
noData(students);
});


/*----------------------------------------------------Save Theme in localStorage---------------------------------------------------------------*/
if(localStorage.getItem("theme") === "true"){
    darkTHemeButton.click();                                                     //if dark theme exist fire all code in the click
}


















/*---------------------------------------------to do:------------------------------------------*/
/*
1-id++   (icrease id every one student)

2-array = students to make it have all students

3-every student are push in the end of array (students)

4-make every student properties written in tableBody

5-when we fill any input if we send in it a thing show is-valid and if we dont send show in-valid(must fill input)
    -when i focus(blur) => 
        -show invalid or valid
        -show small alerrt after input

6-make sure from validation(must fill input with varidation rules)
    -when i enter data to input
        -if valid ok
        -if invalid no and show invalid message

7-after we submit form remove invalid or valid icons 

8-if you find any invalid input return(dont complete)

9-beacause the regex reading when we blur(if we enter the last input uncorrect it will send without respect regex)

10-if we dont enter data and submit empty inputs it will print emty in table

11-delete data from table after reset and remove icons of validation

12-when i refresh the data are deleted (the solution store it in local storage)

13-when i refresh the website data remove from table

14-make id dainamic and +1 after any add student

15-if no students are in localStorage and i submit we will find error because no id>lenght

16-delete student from table after delete

17-if no students add a alert message
    note:innerHTML change html content              (the best select elements in their functions)

18-insert data to form when we edit
    note:we musn't sent parameter (object)such student then we must send unique thing such id

19-after we send data change the button to edit
    -when we click on edit it will add new tr

20-search



//---------------------------------------------ADDITIONAL FEATURE:------------------------------------------
1. Input with spaces allowed – The form accepts text inputs that can contain spaces.     (put space in regex of last name and first name)

2. Delete/Edit confirmation – A confirmation modal appears before deleting or editing a student record .
    note:confirm message when i edit or delete student

3. Undo edit option – An Undo button is available when editing, allowing users to cancel changes .
    explain:when the user enter edit if he want to backspace from his disicion and return to old input

4. Form reset button – A dedicated button resets the entire form .
    explain:reset button under add button

5. Row highlight on edit – The row being edited is visually highlighted with a CSS class .
    explin:when i edit a student highlight his row

6. No student alert – An alert is displayed when the table has no student records .
    done

7. Form validation feedback – Custom design for valid and invalid input states improves user experience.
    done

8-email and phone unique and show email or phone has
    -if student email is exit dont accpect a new student have the same email

9-dark theme  
*/