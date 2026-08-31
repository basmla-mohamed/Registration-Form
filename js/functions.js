/*----------------------------get student from user-------------------------------*/
function getStudnt(id){
    let student = { id : id};

    registerInputs.forEach(function(registerInputs){
        let key = registerInputs.name,
        value = registerInputs.value;

        student[key] = value;
    });

    return student;
}


/*-------------------------add student(when make sure from validation)----------*/
function addStudent(){

    let focusInput = registerForm.querySelector("input:focus");

    focusInput?.blur();

    registerInputs.forEach(function(input){
        checkInputs(input);
    });

    let invalidInput = registerForm.querySelector("input.is-invalid");

    if(invalidInput){
        return;
    }

    let student = getStudnt(++id),
        unique = checkUnique(student);                      //make sure before push student

    if(unique.emailExists){
    alert("Email already exist");
    return;
    }

    if(unique.phoneExists){
    alert("Phone already exist");
    return;
    }

    students.push(student);

    updateLocalstorage();

    showStudents(student);

    noData(students);

    resetForm();
}


/*-------------------------validation to make the student-----------------------*/
function validateStudent(student){
    for(let field in student){

        let inputName = field,
        inputValue = student[field];

        console.log(regexInputs[inputName].test(inputValue));
    }
}


/*-------------------------------SHOW STUDENTS IN TABLE-------------------------*/
function showStudents(student){

    tableBody.innerHTML += `
        <tr data-student-id="${student.id}">
            <th scope="row">${student.id}</th>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.email}</td>
            <td>${student.age}</td>
            <td>${student.phone}</td>
            <td>
                <div class="buttons d-flex flex-row">
                    <button class="btn btn-info text-light me-2"
                        onclick="insertStudentInFormWhenEdit(${student.id})">
                        Edit
                    </button>

                    <button class="btn btn-danger text-light"
                        onclick="deleteStudent(${student.id},this)">
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    `;
}


/*-------------------------------GET STUDENT INDEX------------------------------*/
function getStudentIndex(id){

    let studentIndex = students.findIndex(function(student){
        return student.id == id;
    });

    return studentIndex;
}


/*----------------------------SHOW VALID AND INVALID----------------------------*/
function checkInputs(input){

    let inputName = input.name,
    inputValue = input.value,
    emptyInput = inputValue === "",
    errorInput = document.querySelector(
        `p.alert[data-error-name="${inputName}"]`
    ),
    validInput = regexInputs[inputName].test(inputValue);


/*-----------------false inputs-----------------*/

    //empty input
    if(emptyInput){

        input.classList.add("is-invalid");
        errorInput.classList.remove("d-none");
        errorInput.textContent = "This field is required";
        input.dataset.valid = false;
    }

    //invalid input
    else if(!validInput){

        input.classList.add("is-invalid");
        errorInput.classList.remove("d-none");
        errorInput.textContent = "Invalid field";
        input.dataset.valid = false;
    }


/*-----------------true inputs-----------------*/

    else{

        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        errorInput.classList.add("d-none");
        input.dataset.valid = true;
    }
}


/*----------------------------RESET FORM-----------------------------------------*/
function resetForm(){
let editingRow = document.querySelector("tr.editing");

editingRow?.classList.remove("editing");
    registerForm.reset();

    registerInputs.forEach(function(input){

        input.classList.remove("is-valid");
        input.classList.remove("is-invalid");

        let errorrEle = document.querySelector(
            `p.alert[data-error-name="${input.name}"]`
        );

        errorrEle.classList.add("d-none");
    });

    registerForm.setAttribute("data-type","add");

    let btn = registerForm.querySelector("button[type='submit']");

    btn.textContent = "Add";
    btn.classList.remove("bg-info");
    btn.classList.add("bg-success");

    registerForm.removeAttribute("student-id");
    let undoBtn = registerForm.querySelector(".undoBtn");

undoBtn?.remove();
}


/*-------------------------------------Update localStorage-----------------------*/
function updateLocalstorage(){

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}


/*-------------------------------------Show Students after refresh---------------*/
function showStudent(data){
    tableBody.innerHTML = `    <tr>
    <td id="alertWarning" class="table-warning text-center fw-medium d-none" colspan="7">Their are no data</td>

    </tr>`;
    data.forEach(function(student){
        showStudents(student);
    });

    noData(data);

}


/*-------------------------------------Delete Student----------------------------*/
function deleteStudent(id,that){

    if(!confirm("Are You Sure")){
        return;
    }

    let tableRow = that.closest("tr"),
    studentIndex = getStudentIndex(id);

    students.splice(studentIndex,1);

    tableRow.remove();

    updateLocalstorage();

    noData(students);
}


/*-------------------------------------No Data-----------------------------------*/
function noData(data){

    let tableAlert = document.querySelector("#alertWarning");

    if(data.length == 0){

        tableAlert.classList.remove("d-none");

    }else{

        tableAlert.classList.add("d-none");
    }
}


/*--------------------Insert student data in form when we edit------------------*/
function insertStudentInFormWhenEdit(id){

    resetForm();

    let trEle = document.querySelector(
    `tr[data-student-id="${id}"]`
    );
    trEle.classList.add("editing");

    oldStudent = students.find(function(student){
        return student.id == id;
    }),

    btn = registerForm.querySelector("button[type='submit']");

    for(let input of registerInputs){
        input.value = oldStudent[input.name];
    }

    btn.textContent = "Edit";

    btn.classList.add("bg-info");
    btn.classList.remove("bg-success");

  let oldUndoBtn = registerForm.querySelector(".undoBtn");

oldUndoBtn?.remove();

let undoBtn = document.createElement("button");

    undoBtn.textContent = "Undo";
    undoBtn.type = "button";
    undoBtn.classList.add("btn", "btn-secondary", "ms-2", "undoBtn");

    undoBtn.addEventListener("click", function(){
    for(let input of registerInputs){
        input.value = oldStudent[input.name];
    }

});
registerForm.append(undoBtn);
    registerForm.setAttribute("data-type","edit");
    registerForm.setAttribute("student-id",id);
}



/*-------------------------------------EDIT STUDENT------------------------------*/

function editStudent(){

    let focusInput = registerForm.querySelector("input:focus");

    focusInput?.blur();

    registerInputs.forEach(function(input){
        checkInputs(input);
    });


    let invalidInput = registerForm.querySelector("input.is-invalid");

    if(invalidInput){
        return;
    }

        if(!confirm("Confirm edit?")){
    return;
}
    let studentId = Number(registerForm.getAttribute("student-id"));

    let studentIndex = getStudentIndex(studentId);

    if(studentIndex === -1){
        return;
    }

    let student = getStudnt(studentId);

    let unique = checkUnique(student);

if(unique.emailExists){
    alert("Email already exists");
    return;
}

if(unique.phoneExists){
    alert("Phone already exists");
    return;
}

    students[studentIndex] = student;

    let trEle = document.querySelector(
        `tr[data-student-id="${studentId}"]`
    );
trEle.classList.remove("editing");

    trEle.innerHTML = `
        <th scope="row">${student.id}</th>
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
        <td>${student.email}</td>
        <td>${student.age}</td>
        <td>${student.phone}</td>
        <td>
            <div class="buttons d-flex flex-row">

                <button class="btn btn-info text-light me-2"
                    onclick="insertStudentInFormWhenEdit(${student.id})">
                    Edit
                </button>

                <button class="btn btn-danger text-light"
                    onclick="deleteStudent(${student.id},this)">
                    Delete
                </button>

            </div>
        </td>
    `;

    updateLocalstorage();

    resetForm();
}


/*-----------------------------------------------SERCH------------------------------------------------------*/
function search(searchValue){
    let studentResults = students.filter(function(student){
        return student.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
                student.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
                student.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
                student.email.toLowerCase().includes(searchValue.toLowerCase()) ||
                student.age.toLowerCase().includes(searchValue.toLowerCase()) ||
                student.phone.toLowerCase().includes(searchValue.toLowerCase());
    });
   showStudent(studentResults);
}


/*-----------------------------------------------Unique email------------------------------------------------------*/
//dont make 2 students have the same email or phone
function checkUnique(student){

    //regect any student have same email
    let emailExists = students.some(function(item){
        return item.email === student.email && item.id !== student.id;
    });

    //regect any student have same phone number
    let phoneExists = students.some(function(item){
        return item.phone === student.phone && item.id !== student.id;
    });

    return {
        emailExists: emailExists,
        phoneExists: phoneExists
    };
}
