let users = JSON.parse(localStorage.getItem("users")) || [];
let items = JSON.parse(localStorage.getItem("items")) || [];

let chart;

/* REGISTER */

function register(){

let name=document.getElementById("regName").value;
let email=document.getElementById("regEmail").value;
let pass=document.getElementById("regPass").value;

if(name==""||email==""||pass==""){
alert("Fill all details");
return;
}

users.push({name,email,pass});

localStorage.setItem("users",JSON.stringify(users));

alert("Registration Successful");

showLogin();

}

/* LOGIN */

function login(){

let email=document.getElementById("email").value;
let pass=document.getElementById("password").value;

let user=users.find(u=>u.email==email && u.pass==pass);

if(user){

document.getElementById("loginPage").style.display="none";
document.getElementById("homePage").style.display="block";

loadDashboard();
showItems();

}else{

alert("Invalid Login");

}

}

function showRegister(){
document.getElementById("loginPage").style.display="none";
document.getElementById("registerPage").style.display="block";
}

function showLogin(){
document.getElementById("registerPage").style.display="none";
document.getElementById("loginPage").style.display="block";
}

function logout(){
location.reload();
}

function showSection(section){

document.querySelectorAll(".section")
.forEach(sec=>sec.style.display="none");

document.getElementById(section).style.display="block";

}

/* ADD ITEM */

function addItem(){

let name=document.getElementById("name").value;
let supplier=document.getElementById("supplier").value;
let qty=document.getElementById("qty").value;

if(name==""||supplier==""||qty==""){
alert("Enter all details");
return;
}

let id="INV"+(items.length+1);

items.push({
id,
name,
supplier,
qty,
date:new Date().toLocaleString()
});

if(qty<10){
alert("⚠ Low Stock Item Added");
}

localStorage.setItem("items",JSON.stringify(items));

showItems();
loadDashboard();

}

/* SHOW ITEMS */

function showItems(){

let table=document.getElementById("table");

table.innerHTML=`
<tr>
<th>ID</th>
<th>Name</th>
<th>Supplier</th>
<th>Qty</th>
<th>Status</th>
<th>Date</th>
<th>Update</th>
<th>Delete</th>
</tr>
`;

items.forEach((item,i)=>{

let status=item.qty<10 ?
"<span class='low'>Low Stock</span>" : "OK";

table.innerHTML+=`

<tr>
<td>${item.id}</td>
<td>${item.name}</td>
<td>${item.supplier}</td>
<td>${item.qty}</td>
<td>${status}</td>
<td>${item.date}</td>

<td><button class="update" onclick="updateItem(${i})">Update</button></td>
<td><button class="delete" onclick="deleteItem(${i})">Delete</button></td>

</tr>

`;

});

}

/* DELETE */

function deleteItem(i){

items.splice(i,1);

localStorage.setItem("items",JSON.stringify(items));

showItems();
loadDashboard();

}