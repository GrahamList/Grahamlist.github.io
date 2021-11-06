// Patrick Graham
// Fall 2021
// Web233 Javascript
// Date: 11/5/21
// Assignment #13

var addtocart = [];

var MyItems = { 
  name:"",
  price:""
};

var shoppinglist = [];

function addShoppinglist(item) {
  var groc="";
  var count=0;

  MyItems.name=item;
  
  
  for (var x in MyItems)
  {
    
    
    groc += MyItems[x];
    
   count++;
  }
  
  shoppinglist.push(groc);
  displayShoppinglists();
  clearFocus();
}



function displayShoppinglists() {
"<div class = left>";
var TheList = "";
var arrayLength = shoppinglist.length;
for (var i = 0; i < arrayLength; i++) {
var btndelete =  ' <input class="button" name="delete" type="button" value="Remove Item" onclick="deleteShoppinglists(' + i + ')" />';
var btnupdate =  ' <input class="button" name="edit" type="button" value="Edit Item" onclick="changeShoppinglist(' + i + ')" />';
var arrays = shoppinglist[i];
arrays = "'"+arrays+"'";
var btnaddcart =  '<label><input name="add" type="checkbox" id="adds" value="Add to Shopping Cart" onclick="addtoshopcart('+arrays+',' + i + ')" addtocart.checked=false"/></label>';
TheList = TheList + shoppinglist[i] + btndelete + ' ' +  btnupdate + ' ' + btnaddcart + '<br>';
}
  if (shoppinglist.length >= 1)
  {
    document.getElementById("MyList").innerHTML = '<b>Shopping List</b> ' + '<br>' + TheList;
  }
  else
  {
    document.getElementById("MyList").innerHTML = "";
  }
"</div>"
}


function displayShoppingCart() {
"<div class = left>";
var TheList = "";
var TheRow = "";
var arrayLength = addtocart.length;
for (var i = 0; i < arrayLength; i++) 
{



var btndelete =  ' <input class="button" id="remove" name="delete" type="button" value="Remove Item" onclick="deleteShoppingCart(' + i + ')" />';

var arrays = addtocart[i];
arrays = "'"+arrays+"'";
var btnaddlist =  '<label><input name="add" type="checkbox" id="adds" value="Add to Shopping List" onclick="addbacktoshoppinglist('+arrays+',' + i + ')" checked="checked"/>Add Back To List</label>';
TheRow =  addtocart[i] + btndelete + ' ' +  ' ' + btnaddlist + '<br>';
TheList += TheRow;
}

if (arrayLength > 0)
{
 document.getElementById("MyCart").innerHTML = '<b>Shopping Cart</b> ' + '<br>' + TheList;
}else{
 document.getElementById("MyCart").innerHTML = '';
}
"</div>"
}





function clearFocus()
{
  document.getElementById("item").value = "";
  
  document.getElementById("item").focus();
}

function deleteShoppinglists(position) {
  shoppinglist.splice(position, 1);
  displayShoppinglists();
  displayShoppingCart();
  savecookie();
}

function deleteShoppingCart(position) {
  addtocart.splice(position, 1);
  displayShoppinglists();
  displayShoppingCart();
  savecookie();
}


function changeShoppinglist(position) {
 //document.getElementById("MyList").innerHTML = shoppinglist[position];
 var arrays = shoppinglist[position];
 arrays = arrays.split(",");
   var e1 = arrays[0];
  var e2 = arrays[1];

 var eitem = prompt("Please enter new item", e1);
 shoppinglist[position] = eitem
 displayShoppinglists();
 displayShoppingCart();
 savecookie();
}

function changeShoppingCart(position) {
  document.getElementById("MyCart").innerHTML = shoppinglist[position];
  var arrays = addtocart[position];
  arrays = arrays.split(",");
    var e1 = arrays[0];
   var e2 = arrays[1];
 var ReplacedAmount = e2.replace(/\$/g,'');
  var eitem = prompt("Please enter new item", e1);
  var ecost = prompt("Please enter the cost", ReplacedAmount);
  addtocart[position] = eitem + "," + ' $' + ecost;
  displayShoppinglists();
  displayShoppingCart();
  savecookie(); 
}

function addbacktoshoppinglist(item,num) {
  deleteShoppingCart(num);
  shoppinglist.push(item);
  
  displayShoppinglists();

  displayShoppingCart() 
  savecookie();
  clearFocus();
}

function addtoshopcart(item, num) {
  deleteShoppinglists(num);
  addtocart.push(item);
  
  displayShoppinglists();
  displayShoppingCart() 
  savecookie();
  
  clearFocus();
}

function savecookie()
{
  delete_cookie('konkollist');
   var date = new Date();
   //keeps for a year
    date.setTime(date.getTime() + Number(365) * 3600 * 1000);
   document.cookie = 'konkollist' + "=" + escape(shoppinglist.join(',')) + "; path=/;expires = " + date.toGMTString();
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function delete_cookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function savecookie()
{
  delete_cookie('grahamlist');
   var date = new Date();
   date.setTime(date.getTime() + Number(365) * 3600 * 1000);
   document.cookie = 'grahamlist' + "=" + escape(shoppinglist.join(',')) + "; path=/;expires = " + date.toGMTString();
}

window.onload = function() {
alert("Welcome to 'Shopping List' App!\n\nCreated by Rock Valley College\n**Javascript(Web233) Students**\n\nQuestions?\nemail Professor Chuck Konkol\nc.konkol@rockvalleycollege.edu\n\nRegister @ RockValleyCollege.edu");
populateshoppinglistonload();
displayShoppinglists();
clearFocus();
};

function populateshoppinglistonload()
{
  shoppinglist = [];
  addtocart = [];
  //load cookie into array

  var y = readCookie('grahamlist');

  //remove unwanted chars and format
  y = remove_unwanted(y).toString(); 
  //spit array by comma %2C
  y = y.split('%2C');
  if (y) 
  {
    shoppinglist = y;
  }

  function remove_unwanted(str) 
  { 
    
    if ((str==null) || (str=='')) 
    {
       return "";  
    }
    else 
    {
      str = str.toString();  
      str = str.replace(/%20/g, "");
      str = str.replace(/%24/g, "$"); 
      str = str.replace(/%7C/g, " | ");
      return str.replace(/[^\x20-\x7E]/g, '');  
    } 
  }  

}














