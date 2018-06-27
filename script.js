// JavaScript Document
"use strict";
window.addEventListener("DOMContentLoaded", inIt);
function inIt() {
	window.addEventListener("hashchange", function () {
		pageActivator(window.location.hash);
	});
	if (window.location.hash != "") {
		pageActivator(window.location.hash);
	} else {
		pageActivator("#page-general");
	}
	$1input();
	$2input();
	$3input();
	$4input();
}

function deleteStudentsAdd1() {
	let elements = document.querySelectorAll("#btn_justified li");
	let i;
	let count = 0;
	let len = elements.length;
	for (i = 0; i < len; i++) {
		if (elements[i].hasAttribute("data-group2") && elements[i].getAttribute("data-group2") != "all") {
			count++;
		}
	}

	return count;
}

function deleteStudents() {
	let x = deleteStudentsAdd1();
	if (x > 0) {
		let sender = this;
		let id = sender.dataset.id;
		for (let student in people) {
			if (people[student]._id == id) {
				people.splice(student, 1);
				break;
			}
		}
		$1input();
		$2input();
		$3input();
		$4input();
		let element = this;
		let groupNumber = element.dataset.new;
		if (groupNumber == "all") {
			document.querySelectorAll("#table tbody tr").forEach(function (group) {
				group.classList.remove("hidden");
			});
		} else {
			document.querySelectorAll("#table tbody tr").forEach(function (g) {
				if (g.dataset.group == groupNumber) {
					g.classList.remove("hidden");
				} else {
					g.classList.add("hidden");
				}
			});
		}
	} else {
		let sender = this;
		let id = sender.dataset.id;
		for (let student in people) {
			if (people[student]._id == id) {
				people.splice(student, 1);
				break;
			}
		}
		$1input();
		$2input();
		$3input();
		$4input();
	}
}
//функция подготовки селекта в форме редактирования
function createOption() {
	let groups = [];
	for (let i in people) {
		if (groups.indexOf(people[i].group) == -1) {
			groups.push(people[i].group);
		}
	}
	groups.sort();
	let option = "";
	for (let j in groups) {
		option += "<option value=\"" + groups[j] + "\"" + ">Группа " + groups[j] + "</option>";
	}
	return option;
}
//Генерация случайного id 
function makeid() {
	let text = "";
	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < 25; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

function saveNewStudent(s) {
	s.preventDefault();
	if (document.querySelector("#_id").value == "") {

		let student = {
			"_id": makeid(),
			name: {
				first: document.querySelector("#first").value,
				last: document.querySelector("#last").value
			},
			group: Number(document.querySelector("#group").value),
			age: Number(document.querySelector("#age").value),
			gender: document.querySelector("[name='gender']:checked").value
		}
		if (student.name.first == "" || student.name.last == "") {
			alert("Введите полные данные");
		} else {
			people.push(student);
		}
	} else {
		let _id = document.querySelector("#_id").value;
		for (let i = 0; i < people.length; i++) {
			if (people[i]._id == _id) {
				people[i].name.first = document.querySelector("#first").value;
				people[i].name.last = document.querySelector("#last").value;
				people[i].age = Number(document.querySelector("#age").value);
				people[i].group = Number(document.querySelector("#group").value);
				people[i].gender = document.querySelector("[name=gender]:checked").value;
			} 
		}
	}
	if (document.querySelector("#first").value !== "" || document.querySelector("#last").value !== "") {
		$1input();
		$2input();
		$3input();
		$4input();
		pageActivator("#page-students");
		document.querySelector("#adition_link").addEventListener("click", function () {
			pageActivator("#page-add-student");
			document.querySelector("#_id").value = "";
			document.querySelector("#age").value = "";
			document.querySelector("#first").value = "";
			document.querySelector("#last").value = "";
			document.querySelector("#group").value = "";
			document.querySelector("[name=gender]:checked").false;
		});
	}
}

//изменяем данные существующих студентов
function editStudent() {
	let id = this.dataset.id;
	let i;
	let len = people.length;
	for (i = 0; i < len; i++) {
		if (id == people[i]._id) {
			document.querySelector("#_id").value = people[i]._id;
			document.querySelector("#age").value = people[i].age;
			document.querySelector("#first").value = people[i].name.first;
			document.querySelector("#last").value = people[i].name.last;
			document.querySelector("#group").value = people[i].group;
			document.querySelector("[name=gender][value='" + people[i].gender + "']").checked = true;
			pageActivator("#page-add-student");
			break;
		}
	}
}


//сделаем свой вывод в инит
function $4input() {
	document.querySelectorAll("[data-delete=delete]").forEach(function (item) {
		item.addEventListener("click", deleteStudents);
	});
	document.querySelectorAll(".edit").forEach(function (item) {
		item.addEventListener("click", editStudent);
	});
	document.querySelector("#group").innerHTML = createOption();
	document.querySelector("#save-new-student").addEventListener("click", saveNewStudent);
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!6 задание конец!!!!!!!!!!!!!
function clearClasses() {
	document.querySelectorAll(".page").forEach(function (item) {
		item.classList.add("hidden");
	});
	document.querySelectorAll("#navigator li").forEach(function (l) {
		l.classList.remove("active");
	});
}
// id обязательно пишем с #!!!!
function pageActivator(pageName) {
	if (document.querySelector(".page" + pageName) != null) {
		clearClasses();
		document.querySelector(pageName).classList.remove("hidden");
	}
	if (pageName !== "#page-add-student") {
		let linkA = document.querySelector(".navbar-nav a[href=\"" + pageName + "\"]")
		linkA.parentElement.classList.add("active");
	}
}

//Вывод вкладки пульт управления
function $1input() {
	document.getElementById("a").innerHTML = calcGroup().length;
	document.getElementById("b").innerHTML = calcStudents();
	document.getElementById("c").innerHTML = calcM();
	document.getElementById("d").innerHTML = calcF();
	document.getElementById("e").innerHTML = aveAge();
	document.getElementById("f").innerHTML = aveGroup();
	document.getElementById("g").innerHTML = aveAmountM();
	document.getElementById("h").innerHTML = aveAmountF();
}

//число групп
function calcGroup() {
	let groups = [];
	let i;
	let len = people.length;
	for (i = 0; i < len; i++) {
		if (groups.indexOf(people[i].group) == -1) {
			groups.push(people[i].group);
		}
	}
	return groups;
}

//число студентов
function calcStudents() {
	return people.length;
}
//число мужчин
function calcM() {
	let countM = 0;
	for (let man in people) {
		if (people[man].gender == "m") {
			countM++;
		}
	}
	return countM;
}
//число женщин
function calcF() {
	let countF = 0;
	for (let man in people) {
		if (people[man].gender == "f") {
			countF++;

		}
	}
	return countF;
}
//средний возраст
function aveAge() {
	let calcAge = 0;
	let students = 0;
	let result;

	for (let person in people) {
		calcAge += people[person].age;
		students++;
	}
	calcAge = parseInt(calcAge);
	result = Math.round(calcAge / students);
	return result;
}
//среднее число человек в группе
function aveGroup() {
	let groups = calcGroup();
	let len = people.length;
	return Math.round(len / groups.length);
}
//среднее число мужчин
function aveAmountM() {
	let amountM = calcM();
	let groups = calcGroup();
	return Math.round(amountM / groups.length);
}
//среднее число женщин
function aveAmountF() {
	let amountF = calcF();
	let groups = calcGroup();
	return Math.round(amountF / groups.length);
}
//Создаем объекты групп
function createObject(groupNumber, people) {
	let object = {
		"groupN": 0,
		"amount": 0,
		"sumAge": 0,
		"ageM": 0,
		"ageF": 0,
		"averageAge": 0,
		"m": 0,
		"f": 0,
		"averageAgeM": 0,
		"averageAgeF": 0
	}
	people.forEach(function (item) {
		if (item.group == groupNumber) {
			object.groupN = item.group;
			object.amount++;
			object.sumAge += item.age;
			if (item.gender == "m") {
				object.m++;
				object.ageM += parseInt(item.age);
			} else if (item.gender = "f") {
				object.f++;
				object.ageF += item.age;
			}
		}
		object.averageAge = Math.round(object.sumAge / object.amount);
		object.averageAgeM = Math.round(object.ageM / object.m);
		object.averageAgeF = Math.round(object.ageF / object.f);
	});
	return object;
}
//сортировка групп
function gCompare(a, b) {
	if (a > b) {
		return 1;
	} else if (a == b) {
		return 0;
	} else if (a < b) {
		return -1;
	}
}
//создаем группы
function createGroups() {
	let index = "";
	let groups = calcGroup();
	groups.sort(gCompare);
	groups.forEach(function (group) {
		let gr = createObject(group, people);
		index += "<div class = \"row\"><div class = \"col-sm-12 col-md-6 col-lg-6\">" +
			"<ul class = \"list-group\"><li class = \"list-group-item\">" +
			"Номер группы" + "<span class= \"badge\">" + gr.groupN + "</span</li>" +
			"<li class = \"list-group-item\">" +
			"Число мужчин" + "<span class= \"badge\">" + gr.m + "</span</li>" +
			"<li class = \"list-group-item\">" +
			"Число женщин" + "<span class= \"badge\">" + gr.f + "</span</li>" +
			"<li class = \"list-group-item\">" +
			"Средний возраст" + "<span class= \"badge\">" + gr.averageAge + "</span</li>" +
			"<li class = \"list-group-item\">" +
			"Средний возраст мужчин" + "<span class= \"badge\">" + gr.averageAgeM + "</span</li>" +
			"<li class = \"list-group-item\">" +
			"Средний возраст женщин" + "<span class= \"badge\">" + gr.averageAgeF + "</span</li>" +
			"</ul></div></div"
	});
	return index;
}
//команда вывода в инит
function $2input() {
	document.getElementById("page-groups").innerHTML = createGroups();
}

//Выводим третью вкладку
function showTable() {
	let tmp = "";
	let sexTranslator = {
		'm': "м",
		'f': "ж"
	}
	let i;
	let len = people.length;
	for (i = 0; i < len; i++) {
		tmp += "<tr data-group=\"" + people[i].group +
			"\"><td>" + people[i].name.last + "</td><td>" +
			people[i].name.first + "</td><td>" + people[i].group +
			"</td><td>" + people[i].age + "</td><td>" +
			sexTranslator[people[i].gender] + "</td><td><button type=\"button\" data-id=\"" +
			people[i]._id + "\"" + "data-delete =\"delete\"" + "data-new=\"" + people[i].group + "\"" + "class=\"btn btn-default\">" + "<span class=\"glyphicon glyphicon-remove\"></span></button><a href=\"#page-add-student\"  role=\"button\" data-id=\"" +
			people[i]._id + "\"" + "class=\"btn btn-default edit\">" + "<span class=\"glyphicon glyphicon-pencil\"></span></a></td></tr>";
	}
	return tmp;
}

//сортировка таблицы - функция
function sortStudents() {
	let x = document.querySelectorAll("#btn_justified li");
	let i;
	let len = x.length;
	for (i = 0; i < len; i++) {
		if (x[i].hasAttribute("data-group2")) {
			x[i].removeAttribute("data-group2");
		}
	}
	var key = this.dataset.sort;
	people.sort(function (a, b) {
		var va;
		var vb;
		if (key == "last" || key == "first") {
			va = a.name;
			vb = b.name;
		}
		if (key == "group" || key == "age" || key == "gender" || key == "management") {
			va = a;
			vb = b;
		}
		if (va[key] > vb[key]) {
			return 1;
		} else if (va[key] < vb[key]) {
			return -1;
		} else if (va[key] == va[key]) {
			return 0;
		}
	});
	var head = document.querySelectorAll("#table thead th");
	if (this.classList.contains("bg-success")) {
		people.reverse();
		head.forEach(function (td) {
			td.classList.remove("bg-primary");
			td.classList.remove("bg-success");
		});
		this.classList.add("bg-primary");
	} else {
		head.forEach(function (td) {
			td.classList.remove("bg-primary");
			td.classList.remove("bg-success");
		});
		this.classList.add("bg-success");
	}
	document.querySelector("#table tbody").innerHTML = showTable();
	$4input();
}

function filterTable() {
	let element = this;
	let groupNumber = element.dataset.group;
	element.setAttribute("data-group2", groupNumber);
	if (groupNumber == "all") {
		document.querySelectorAll("#table tbody tr").forEach(function (group) {
			group.classList.remove("hidden");
		});
	} else {
		document.querySelectorAll("#table tbody tr").forEach(function (g) {
			if (g.dataset.group == groupNumber) {
				g.classList.remove("hidden");
			} else {
				g.classList.add("hidden");
			}
		});
	}
}
//Команда вывода в инит
function $3input() {
	document.querySelector("#table tbody").innerHTML = showTable();
	//добавляем события - клики для сортировки таблицы

	let a = document.querySelectorAll("#table thead th").forEach(function (b) {
		if (b.innerHTML != "Управление") {
			b.addEventListener("click", sortStudents);
		}
	});
	document.querySelectorAll("#btn_justified li").forEach(function (l) {
		l.addEventListener("click", filterTable);
	});
}
