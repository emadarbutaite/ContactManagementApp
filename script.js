const tableKey = 'table';

let clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', () => {
    localStorage.removeItem(tableKey);
});

let myTable;
let myTableDemo = {
    'Antanas': {
        'lname': 'Kairys',
        'birthday': '1956-06-12',
        'number': '860945673',
        'email': 'antanas.kairys@gmail.com',
        'address': 'Taikos pr. 67, Klaipėda'
    },
    'Emilija': {
        'lname': 'Kairytė',
        'birthday': '1997-11-23',
        'number': '865476891',
        'email': 'emilija123@gmail.com',
        'address': 'Vilniaus g. 5, Vilnius'
    }
};

let validateEmailAddress = (input) => {
    var regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    if (regex.test(input)) {
        return true;
    } else {
        return false;
    }
}

let refreshDOMTable = () => {
    let myTableKeys = Object.keys(myTable);
    let tableContainer = document.getElementById('myTableContainer');
    let oldTableBody = document.getElementById('tableBody');
    tableContainer.removeChild(oldTableBody);
    let newTableBody = document.createElement('span');
    newTableBody.id = 'tableBody';
    tableContainer.appendChild(newTableBody);

    for(let i = 0; i < myTableKeys.length; i++){
        let currentRow = document.createElement('div');
        let currentFNameCol = document.createElement('div');
        let currentLNameCol = document.createElement('div');
        let currentBirthdayCol = document.createElement('div');
        let currentNumberCol = document.createElement('div');
        let currentEmailCol = document.createElement('div');
        let currentAddressCol = document.createElement('div');
        let currentEditBtn = document.createElement('div');
        let currentDelBtn = document.createElement('div');

        currentRow.className = 'table-row';
        currentFNameCol.className = 'table-column fname';
        currentLNameCol.className = 'table-column lname';
        currentBirthdayCol.className = 'table-column birthday';
        currentNumberCol.className = 'table-column number';
        currentEmailCol.className = 'table-column email';
        currentAddressCol.className = 'table-column address';
        currentEditBtn.className = 'table-column edit';
        currentDelBtn.className = 'table-column delete';

        currentFNameCol.innerHTML = myTableKeys[i];
        currentLNameCol.innerHTML = myTable[myTableKeys[i]].lname;
        currentBirthdayCol.innerHTML = myTable[myTableKeys[i]].birthday;
        currentNumberCol.innerHTML = myTable[myTableKeys[i]].number;
        currentEmailCol.innerHTML = myTable[myTableKeys[i]].email;
        currentAddressCol.innerHTML = myTable[myTableKeys[i]].address;

        currentEditBtn.innerHTML = '<i class = "fas fa-edit"></i>';
        currentDelBtn.innerHTML = '<i class = "fas fa-trash-alt"></i>';

        currentRow.appendChild(currentFNameCol);
        currentRow.appendChild(currentLNameCol);
        currentRow.appendChild(currentBirthdayCol);
        currentRow.appendChild(currentNumberCol);
        currentRow.appendChild(currentEmailCol);
        currentRow.appendChild(currentAddressCol);
        currentRow.appendChild(currentEditBtn);
        currentRow.appendChild(currentDelBtn);
        newTableBody.appendChild(currentRow);
    }

    let enableDisableNewUserModal = (option) => {
        let newPersonFName = document.getElementById('fname');
        let newPersonLName = document.getElementById('lname');
        let newPersonBirthday = document.getElementById('birthday');
        let newPersonNumber = document.getElementById('number');
        let newPersonEmail = document.getElementById('email');
        let newPersonAddress = document.getElementById('address');
        newPersonFName.value = '';
        newPersonLName.value = '';
        newPersonBirthday.value = '';
        newPersonNumber.value = '';
        newPersonEmail.value = '';
        newPersonAddress.value = '';
        
        let newPersonModal = document.getElementById('newPersonModal');
        let backdrop = document.getElementById('backdrop');
        
        newPersonModal.className = `${option}-modal`;
        backdrop.className = `${option}-modal`;
    }

    let addNewEntryBtn = document.getElementById('addNewEntry');
    let editBtns = document.getElementsByClassName('edit');
    let deleteBtns = document.getElementsByClassName('delete');

    let newPersonSubmitBtn = document.getElementById('newPersonSubmitBtn');
    let newPersonCancelBtn = document.getElementById('newPersonCancelBtn');

    newPersonSubmitBtn.addEventListener('click', () => {
        let newPersonFName = document.getElementById('fname').value.trim();
        let newPersonLName = document.getElementById('lname').value.trim();
        let newPersonBirthday = document.getElementById('birthday').value.trim();
        let newPersonNumber = document.getElementById('number').value.trim();
        let newPersonEmail = document.getElementById('email').value.trim();
        let newPersonAddress = document.getElementById('address').value.trim();

        if(newPersonFName === ''){
            document.getElementById('fname').className = 'input-err';
        }else {
            document.getElementById('fname').className = '';
        }

        if(newPersonLName === ''){
            document.getElementById('lname').className = 'input-err';
        }else {
            document.getElementById('lname').className = '';
        }

        if(newPersonBirthday === ''){
            document.getElementById('birthday').className = 'input-err';
        }else {
            document.getElementById('birthday').className = '';
        }

        if(newPersonNumber === '' ){
            document.getElementById('number').className = 'input-err';
        }else {
            document.getElementById('number').className = '';
        }

        if(newPersonEmail === '' || validateEmailAddress(newPersonEmail) == false){
            document.getElementById('email').className = 'input-err';
        }else {
            document.getElementById('email').className = '';
        }
        
        if(newPersonFName !== '' && newPersonLName !== '' && newPersonBirthday !== '' && newPersonNumber !== '' && newPersonEmail !== ''){
            let newPerson = {};
            myTable[newPersonFName] = {
                'lname': newPersonLName,
                'birthday': newPersonBirthday,
                'number': newPersonNumber,
                'email': newPersonEmail,
                'address': newPersonAddress
            }
            localStorage.setItem(tableKey, JSON.stringify(myTable));
            enableDisableNewUserModal('disable');
            refreshDOMTable();
        }
    });

    newPersonCancelBtn.addEventListener('click', () => {
        enableDisableNewUserModal('disable');
    });

    addNewEntryBtn.addEventListener('click', () => {
        enableDisableNewUserModal('enable');
    });

    for(let i = 0; i < editBtns.length; i++){
        editBtns[i].addEventListener('click', ($event) => {
            let nameToEdit = $event.target.parentElement.children[0].innerText;
            let personToEdit = myTable[nameToEdit];
            enableDisableNewUserModal('enable');
            let newPersonFName = document.getElementById('fname');
            let newPersonLName = document.getElementById('lname');
            let newPersonBirthday = document.getElementById('birthday');
            let newPersonNumber = document.getElementById('number');
            let newPersonEmail = document.getElementById('email');
            let newPersonAddress = document.getElementById('address');
            newPersonFName.value = nameToEdit;
            newPersonLName.value = personToEdit.lname;
            newPersonBirthday.value = personToEdit.birthday;
            newPersonNumber.value = personToEdit.number;
            newPersonEmail.value = personToEdit.email;
            newPersonAddress.value = personToEdit.address;
        })

        for (let i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].addEventListener('click', ($event) => {
                let nameToDelete = $event.target.parentElement.children[0].innerText;
                let isSure = window.confirm('Are you sure you want to delete ' + nameToDelete + '?');
                if (isSure){
                    deleteUserFromTable(nameToDelete);
                }
            })
        }
    }
}

let deleteUserFromTable = (userName) => {
    let tempTable = {};
    let myTableKeys = Object.keys(myTable);
    for(let i = 0; i < myTableKeys.length; i++){
        if(userName !== myTableKeys[i]){
            tempTable[myTableKeys[i]] = myTable[myTableKeys[i]];
        }
    }
    myTable = tempTable;
    localStorage.setItem(tableKey, JSON.stringify(myTable));
    refreshDOMTable();
}

let init = () => {
    if(localStorage.getItem(tableKey)){
        myTable = JSON.parse(localStorage.getItem(tableKey));
    }else{
        myTable = myTableDemo;
        localStorage.setItem(tableKey, JSON.stringify(myTable));
    }
    refreshDOMTable();
}

init();
