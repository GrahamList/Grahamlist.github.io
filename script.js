// Patrick Graham
// Fall 2021
// Web233 Javascript
// Date: 12/4/21
// Assignment #15

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



function displayShoppinglists() 
{
  document.getElementById("MyList").innerHTML = '';
  var TheList = "";
  var TheRow = "";
  var arrayLength = shoppinglist.length;
  for (var i = 0; i < shoppinglist.length; i++) 
  {
    var btndelete =  ' <input class="button" id="remove" name="delete" type="button" value="Remove" onclick="deleteShoppinglists(' + i + ')" />';
    var arrays = shoppinglist[i];
    arrays = "'"+arrays+"'";
    var btnaddcart =  '<input name="add" type="checkbox" id="adds" value="Add to Shopping Cart" onclick="addtoshopcart('+arrays+','+ i +')" />';
    
    var btnsharelist = '<input class="button" id="shares" name="shares" type="submit" value="Share Thought Collection" onclick="share()" />';
    TheRow = '<li>' + shoppinglist[i] + btndelete + ' '  + btnaddcart + '</li>';
    TheList += TheRow;
  }
  if (arrayLength > 0)
  {
    document.getElementById("MyList").innerHTML = '<ul>' + TheList + '</ul>';
    //Week 14 Add Share Button if arraylist contains values
    document.getElementById("sharebutton").innerHTML = btnsharelist;
  }
  else
  {
    document.getElementById("MyList").innerHTML = ' ';
    //Week 14 Remove Share Button and Sharelist if arraylist contains values
    document.getElementById("sharebutton").innerHTML = ' ';
    document.getElementById("sharelist").innerHTML = ' ';
  }
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
 document.getElementById("MyCart").innerHTML = '<b>Thought Collection</b> ' + '<br>' + TheList;
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
aboutDisplay();
populateshoppinglistonload();
displayShoppinglists();
clearFocus();
};

function populateshoppinglistonload()
{
  shoppinglist = [];
  addtocart = [];
  //load cookie into array
  var y = readCookie('konkollist');
  //remove unwanted chars and format
  y = remove_unwanted(y); 
  //spit array by comma %2C
  
   //v 4.1 get URL
  var geturllistvalue = get("list");
    if (geturllistvalue) {
        geturllistvalue = remove_unwanted(geturllistvalue);
      geturllistvalue = geturllistvalue.split(',');
      shoppinglist = geturllistvalue;
  }else if (y){
       y = y.split('%2C');
      shoppinglist = y;
  }
}

function get(name){
    var url = window.location.search;
    var num = url.search(name);
    var namel = name.length;
    var frontlength = namel+num+1; //length of everything before the value
    var front = url.substring(0, frontlength);
    url = url.replace(front, "");
    num = url.search("&");
    if(num>=0) return url.substr(0,num);
    if(num<0)  return url;
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

  function passlist()
  {
    var url = "https://grahamlist.github.io/index.html?list="+ shoppinglist;   //replace YOURGITHUBURL with your Github repo URL example: Konkollist.github.io
    var accessToken = "4bf002a3e5e27b66882ad3d02626457de1df0b9d"; //replace with your NEW Bit.ly TOKEN
    var params = 
    {
       "long_url" : url          
    };
    $.ajax({
       url: "https://api-ssl.bitly.com/v4/shorten",
       cache: false,
       dataType: "json",
       method: "POST",
       contentType: "application/json",
       beforeSend: function (xhr) 
        {
           xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        },
       data: JSON.stringify(params)
	    }).done(function(data) 
  {
		getshorturl = 1;
		document.getElementById("sharelist").innerHTML = "The URL to share the list:\n" + data.link;
		copyToClipboard(data.link);
	}).fail(function(data) {
		document.getElementById("sharelist").innerHTML = "The URL to share the list:\n" + url;
		copyToClipboard(URL);
	});
}


  //vFinal share function
  function share()
  {
    passlist();
  }

  function copyToClipboard(text) 
  {
    var passbyurl = document.createElement("textarea");
    passbyurl.value = text;
    document.body.appendChild(passbyurl);
 passbyurl.focus();
 passbyurl.select();
 document.execCommand("copy");
 document.body.removeChild(passbyurl);
 alert("URL has been copied. Ready to share: " + text);
 //window.prompt("Copy & Share List!", text);
  
}


  function aboutDisplay()
  {
    alert("Welcome to 'Random Thoughts' App!\n\nCreated by Patrick Graham\n**Please type your thought then press the 'Add Thought button to add it to the list*\n\nQuestions?\nemail Patrick Graham\npjgraham123@gmail.com\n");
  }


















