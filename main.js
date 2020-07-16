let button_addTraveler = document.querySelector('#add_trav');
let button_addHunter = document.querySelector('#add_hunt');
let button_addDoctor = document.querySelector('#add_doc');
let input_travelerName = document.querySelector('#tr_name');
let input_hunterName = document.querySelector('#h_name');
let input_doctorName = document.querySelector('#doc_name');

let button_chooseDoctor = document.querySelector('#ch_doc');
let button_chooseHunter = document.querySelector('#ch_hunter');
let button_chooseSick = document.querySelector('#ch_sick');
let button_chooseHungry = document.querySelector('#ch_hungry');
let button_Heal = document.querySelector('#b_heal');
let button_Feed = document.querySelector('#b_feed');

let input_doctor = document.querySelector('#ich_doc');
let input_sick = document.querySelector('#add_ill');
let input_hunter = document.querySelector('#ich_hunter');
let input_hungry = document.querySelector('#add_hungry');
let input_food = document.querySelector('#food');



let button_addWagon = document.querySelector('#wag_capacity');
let input_wagonCapacity = document.querySelector('#w_capacity');
let table_element = document.querySelector('#table_travelers');
let hunt_Button = document.querySelector('#huntB');
let eat_Button = document.querySelector('#eatB');
let add_toWagon_Button = document.querySelector('#toWagonB');
let reset_Button = document.querySelector('#resetB');
let container_wagon = document.querySelector('#wagon_div');

let wagonCapacity_Element;
let wagonFreeSeats_Element;
let wagonTotalFood_Element;
let wagone_Element;

let passengers_table;
let table_row;
let table_cell;
let chBox_num;

// wagon;
let totalFood;
let carantine;
let health;
let traveler_name;
let all_travelers_arr = [];
let count_table_row = 1;
let count_tableP_row;

//hospital
let doctor;
let sick;


//*************HOSPITAL **********/
//button Choose Doctor
button_chooseDoctor.addEventListener('click', function () {

    chBox_num = checkBox_traveler();  // return the number of table row with checkbox = turn on

    let currentTraveler = all_travelers_arr[chBox_num - 1];

    if (currentTraveler.profession === "Doctor") {

        doctor = all_travelers_arr[chBox_num - 1];

        input_doctor.value = doctor.name;

    } else {

        alert('Please choose Doctor!')
    }

})

//button Choose Sick
button_chooseSick.addEventListener('click', function () {

    chBox_num = checkBox_traveler();  // return the number of table row with checkbox = turn on

    sick = all_travelers_arr[chBox_num - 1];

    input_sick.value = sick.name;

})

//button Heal!
button_Heal.addEventListener("click", function () {

    doctor.heal(sick);

    let row_num = all_travelers_arr.findIndex(element => element.id === sick.id);

    table_element.rows[row_num + 1].cells[4].innerHTML = "is healthy";

    if (sick.inWagon === true) {

        let row_numT_sick = wagon.passengers.findIndex(element => element.id === sick.id);
        passengers_table.rows[row_numT_sick + 1].cells[3].innerHTML = "is healthy";
        
        // count Carantine:
        carantine = wagon.shouldQuarantine();
        wagonCarantine_Element.innerHTML = "Carantine: " + carantine;
    }

    input_doctor.value = '';
    input_sick.value = '';

})

//*************FEED HUNGRY **********/

//button Choose Hunter
button_chooseHunter.addEventListener('click', function () {

    chBox_num = checkBox_traveler();  // return the number of table row with checkbox = turn on

    let currentTraveler = all_travelers_arr[chBox_num - 1];

    if (currentTraveler.profession === "Hunter") {

        hunter = all_travelers_arr[chBox_num - 1];

        input_hunter.value = hunter.name;

    } else {

        alert('Please choose Hunter!')
    }

})
//button Choose Hungry
button_chooseHungry.addEventListener('click', function () {

    chBox_num = checkBox_traveler();  // return the number of table row with checkbox = turn on

    hungry = all_travelers_arr[chBox_num - 1];

    input_hungry.value = hungry.name;

})

// button_Feed 
button_Feed.addEventListener('click', function () {

    let food = input_food.value;

    hunter.giveFood(hungry, food);

    let row_num_hunter = all_travelers_arr.findIndex(element => element.id === hunter.id);
    table_element.rows[row_num_hunter + 1].cells[3].innerHTML = hunter.food;

    if (hunter.inWagon === true) {

        let row_numT_hunter = wagon.passengers.findIndex(element => element.id === hunter.id);
        passengers_table.rows[row_numT_hunter + 1].cells[2].innerHTML = hunter.food;
    }

    let row_num_hungry = all_travelers_arr.findIndex(element => element.id === hungry.id);
    table_element.rows[row_num_hungry + 1].cells[3].innerHTML = hungry.food;

    if (hungry.inWagon === true) {

        let row_numT_hungry = wagon.passengers.findIndex(element => element.id === hungry.id);
        passengers_table.rows[row_numT_hungry + 1].cells[2].innerHTML = hungry.food;
    }

   
    input_hunter.value = '';
    input_hungry.value = '';

})


// button "Hunt"  click (add +2  to Food) ======================================
hunt_Button.addEventListener('click', function () {

    chBox_num = checkBox_traveler();  // return the number of table row with checkbox = turn on

    let currentTraveler = all_travelers_arr[chBox_num - 1];

    currentTraveler.hunt();

    table_element.rows[chBox_num].cells[3].innerHTML = currentTraveler.food;


    if (currentTraveler.isHealthy === false) {

        table_element.rows[chBox_num].cells[4].innerHTML = 'is ill';
    } else {
        table_element.rows[chBox_num].cells[4].innerHTML = 'is healthy';
    }



    if (currentTraveler.inWagon === true) {

        let rowT_num = wagon.passengers.findIndex(element => element.id === currentTraveler.id);

        passengers_table.rows[rowT_num + 1].cells[2].innerHTML = currentTraveler.food;

        // passengers_table.rows[rowT_num + 1].cells[3].innerHTML = currentTraveler.isHealthy;

        if (currentTraveler.isHealthy === false) {

            passengers_table.rows[rowT_num + 1].cells[3].innerHTML = 'is ill';
        } else {
            passengers_table.rows[rowT_num + 1].cells[3].innerHTML = 'is healthy';
        }

        //count totalFood:
        totalFood = wagon.totalFood(wagon.passengers);
        wagonTotalFood_Element.innerHTML = "Total food :  " + totalFood;

        // count Carantine:
        carantine = wagon.shouldQuarantine();
        wagonCarantine_Element.innerHTML = "Carantine: " + carantine;
    }

})

// button "Eat"  click (subtract -1  from Food) =========================================

eat_Button.addEventListener('click', function () {

    chBox_num = checkBox_traveler();

    let currentTraveler = all_travelers_arr[chBox_num - 1];

    // currentTraveler.food -= 1;

    currentTraveler.eat();

    table_element.rows[chBox_num].cells[3].innerHTML = currentTraveler.food;

    if (currentTraveler.isHealthy === false) {

        table_element.rows[chBox_num].cells[4].innerHTML = 'is ill';
    } else {
        table_element.rows[chBox_num].cells[4].innerHTML = 'is healthy';
    }


    if (currentTraveler.inWagon === true) {

        let rowT_num = wagon.passengers.findIndex(element => element.id === currentTraveler.id);
        passengers_table.rows[rowT_num + 1].cells[2].innerHTML = currentTraveler.food;


        if (currentTraveler.isHealthy === false) {

            passengers_table.rows[rowT_num + 1].cells[3].innerHTML = 'is ill';
        } else {
            passengers_table.rows[rowT_num + 1].cells[3].innerHTML = 'is healthy';
        }

        //count totalFood:
        totalFood = wagon.totalFood(wagon.passengers);
        wagonTotalFood_Element.innerHTML = "Total food :  " + totalFood;

        // count Carantine:

        carantine = wagon.shouldQuarantine();
        wagonCarantine_Element.innerHTML = "Carantine: " + carantine;
    }

})


//button 'Add new Traveler' ==============================================

button_addTraveler.addEventListener('click', function () {
    traveler_name = input_travelerName.value;

    if (input_travelerName.value === '') {
        alert('Please enter the traveler name');
    } else {

        let newTraveler = new Traveler(traveler_name);

        // add new traweler to array with all new travelers
        all_travelers_arr.push(newTraveler);

        add_Table_row(newTraveler);

        input_travelerName.value = '';

    }

});


//button 'Add new Hunter' ==============================================
button_addHunter.addEventListener('click', function () {
    hunter_name = input_hunterName.value;

    if (input_hunterName.value === '') {
        alert('Please enter the hunter name');
    } else {

        let newHunter = new Hunter(hunter_name);

        // add new hunter to array with all new travelers
        all_travelers_arr.push(newHunter);

        add_Table_row(newHunter);

        input_hunterName.value = '';
    }

});

//button 'Add new Doctor' ==============================================
button_addDoctor.addEventListener('click', function () {
    doctor_name = input_doctorName.value;

    if (input_doctorName.value === '') {
        alert('Please enter the Doctor\' name');
    } else {

        let doctor = new Doctor(doctor_name);

        // add new doctor to array with all new travelers
        all_travelers_arr.push(doctor);

        add_Table_row(doctor);

        input_doctorName.value = '';

    }

});

// button Build Wagon ==============================================================
// Create new Wagon. Create empty array with passengers, emplty table with passengers

button_addWagon.addEventListener('click', function () {

    wagonCapacity = input_wagonCapacity.value;

    if (input_wagonCapacity.value === '') {

        alert('Please enter Wagon capacity (number of travelers in Wagon)')

    } else {

        wagon = new Wagon(wagonCapacity);

        wagonCapacity_Element = document.createElement('div');
        wagonFreeSeats_Element = document.createElement('div');
        wagonTotalFood_Element = document.createElement('div');
        wagonCarantine_Element = document.createElement('div');

        wagonCapacity_Element.innerHTML = "Our super wagon capacity: " + wagonCapacity + " seats!";
        wagonFreeSeats_Element.innerHTML = "Free seats :  " + wagon.getAvailableSeatCount() + " seats";
        wagonTotalFood_Element.innerHTML = "Total food :  " + wagon.totalFood();
        wagonCarantine_Element.innerHTML = "Carantine : " + wagon.shouldQuarantine();


        // add table with passangers
        passengers_table = document.createElement('table');

        passengers_table.id = 'table_passengers';

        count_tableP_row = 0;

        container_wagon.append(wagonCapacity_Element, wagonFreeSeats_Element, wagonTotalFood_Element, wagonCarantine_Element, passengers_table);

        tableP_row = passengers_table.insertRow(count_tableP_row);

        tableP_cell = tableP_row.insertCell(0);
        tableP_cell.innerHTML = '';

        tableP_cell = tableP_row.insertCell(1);
        tableP_cell.innerHTML = 'Name';

        tableP_cell = tableP_row.insertCell(2);
        tableP_cell.innerHTML = 'Food';

        tableP_cell = tableP_row.insertCell(3);
        tableP_cell.innerHTML = 'isHealsy';

        count_tableP_row++;

        button_addWagon.disabled = true;

    }
})

// button "To Wagon" ==================================================
// add traveler to Wagon (traveler should be choosen with check-box)
add_toWagon_Button.addEventListener('click', function () {

    if (wagon.getAvailableSeatCount() === 0) {
        alert('No empty sits in Wagon');

    } else {

        chBox_num = checkBox_traveler();

        let currentPassenger = all_travelers_arr[chBox_num - 1];

        if (currentPassenger.inWagon === true) {

            alert('This traveler already in the Wagon');

        } else {
            wagonFreeSeats_Element.innerHTML = "Free :  " + (wagon.getAvailableSeatCount() - 1) + " seats";

            currentPassenger.inWagon = true;

            table_element.rows[chBox_num].cells[5].innerHTML = 'in Wagon';

            //=================

            wagon.passengers.push(currentPassenger);

            tableP_row = passengers_table.insertRow(count_tableP_row);

            tableP_cell = tableP_row.insertCell(0);

            tableP_cell = tableP_row.insertCell(1);
            tableP_cell.innerHTML = currentPassenger.name;

            tableP_cell = tableP_row.insertCell(2);
            tableP_cell.innerHTML = currentPassenger.food;

            tableP_cell = tableP_row.insertCell(3);
            if (currentPassenger.isHealthy === true) {
                tableP_cell.innerHTML = "is healthy";
            } else {
                tableP_cell.innerHTML = "is ill";

            }

            count_tableP_row++;

            //count totalFood:
            totalFood = wagon.totalFood(wagon.passengers);
            wagonTotalFood_Element.innerHTML = "Total food :  " + totalFood;

            // count Carantine:

            carantine = wagon.shouldQuarantine();
            wagonCarantine_Element.innerHTML = "Carantine: " + carantine;
        }
    }


})

// Reset button ==============================================

reset_Button.addEventListener("click", function () {
    let pTable = document.querySelector('#wagon_div');

    pTable.innerHTML = '';

    var tableLength = table_element.rows.length;
    for (let i = tableLength - 1; i > 0; i--) {
        table_element.deleteRow(i)
    }
    count_table_row = 1;
    button_addWagon.disabled = false;
    all_travelers_arr = [];
    wagon.passengers = [];
})


//===========================================

//******FUNCTIONS*********************************** */

// return the number of chosen traveler (number of row in table)
function checkBox_traveler() {
    let td_arr = document.querySelectorAll('tr');

    let cheee = document.querySelector('#cb_id1');

    let row_arr = document.querySelectorAll('tr');
    chBox_num = 0;
    for (let i = 1; i < row_arr.length; i++) {
        let current_CheckBox = document.querySelector('#cb_id' + i);
        if (current_CheckBox.checked === true) {
            chBox_num = i;
            break;
        }
    }
    return chBox_num;
}

// Check box - unique click [just one checkbox can be turn on. Function selectOnlyThis(id) was added to dynamically generated Check-box/]

function selectOnlyThis(id) {

    let cb_array = document.querySelectorAll('.checkbox_name');

    for (var i = 1; i <= cb_array.length; i++) {
        if ("cb_id" + i === id && document.getElementById("cb_id" + i).checked === true) {
            document.getElementById("cb_id" + i).checked = true;
        } else {
            document.getElementById("cb_id" + i).checked = false;
        }
    }
}

// ---- add new row in table with Travelers
function add_Table_row(newObjectName) {

    table_row = table_element.insertRow(count_table_row);
    // insert cells

    // insert cell 1 with check box
    table_cell = table_row.insertCell(0);
    //create check box
    var cbox = document.createElement('input');
    cbox.type = 'checkbox';
    cbox.className = 'checkbox_name';
    cbox.id = 'cb_id' + count_table_row;
    cbox.setAttribute('onclick', "selectOnlyThis(this.id)");
    table_cell.append(cbox);


    //create new cell 1 with traveler name
    table_cell = table_row.insertCell(1);
    table_cell.innerHTML = newObjectName.name;

    //create new cell 2  with traveler profession
    table_cell = table_row.insertCell(2);
    // table_cell.innerHTML = newTraveler.profession;
    table_cell.innerHTML = newObjectName.profession;

    //create new cell 3  with traveler food
    table_cell = table_row.insertCell(3);
    table_cell.innerHTML = newObjectName.food;

    //create new cell 4 with traveler Health
    table_cell = table_row.insertCell(4);

    health = newObjectName.isHealthy ? "is healthy" : "is ill"

    table_cell.innerHTML = health;

    //create new cell 5 [IN Wagon???]]
    table_cell = table_row.insertCell(5);

    inWagon = newObjectName.inWagon ? "in Wagon" : "not in Wagon";

    table_cell.innerHTML = inWagon;

    count_table_row++;

}