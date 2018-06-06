var menu = document.getElementById('menu');

var apiUrl = 'http://entree-s18.herokuapp.com/v1/menu';
var apiRequest;
var response;

document.onreadystatechange = function()
{
	if(document.readyState == 'interactive')
	{
		
		getMenuItems();
		//loadMenuItems();
		//saveMenuItems();
	}
};

function getMenuItems()
{
	apiRequest = new XMLHttpRequest();
	apiRequest.onload = catchResponse;
	apiRequest.onerror = httpRequestOnError;
	apiRequest.open('get', apiUrl, true);
	apiRequest.send();
}

function httpRequestOnError() 
{
	displayMenuItems('ERROR');
}



function catchResponse() {

	if (apiRequest.statusText === "OK") 
	{
		response = JSON.parse(apiRequest.responseText);
		for(var i = 0; i < response.menu_size; i++)
			{
				displayMenuItems(response.menu_items[i].description);
			}
		//saveMenuItems();
	}
}

function getPic(item)
{
	var pic;
	if(item.indexOf('beef patty') != -1)
	{
		pic="beef-patty.jpg";
	}
	else if(item.indexOf('beef ribs') != -1)
	{
		pic="beef-ribs.jpg";
	}
	else if(item.indexOf('chicken leg') != -1)
	{
		pic="chicken-leg.jpg";
	}
	else if(item.indexOf('eggplant') != -1)
	{
		pic="eggplant.jpg";
	}
	else if(item.indexOf('omelet') != -1)
	{
		pic="omelet.jpg";
	}
	else if(item.indexOf('pasta') != -1)
	{
		pic="pasta.jpg";
	}
	else if(item.indexOf('pork') != -1)
	{
		pic="pork.jpg";
	}
	else if(item.indexOf('ribeye') != -1)
	{
		pic="ribeye.jpg";
	}
	else if(item.indexOf('salmon') != -1)
	{
		pic="salmon.jpg";
	}
	else if(item.indexOf('shrimp') != -1)
	{
		pic="shrimp.jpg";
	}
	else if(item.indexOf('steak') != -1)
	{
		pic="steak.jpg";
	}
	else if(item.indexOf('tofu') != -1)
	{
		pic="tofu.jpg";
	}
	else if(item.indexOf('turkey') != -1)
	{
		pic="turkey-breast.jpg";
	}
	else if(item.indexOf('scallop') != -1)
	{
		pic="scallops.jpg";
	}
	else
	{
		pic='trash.jpg';
	}
	return pic;
}


function displayMenuItems(item)
{
	var menuItem = document.getElementById('menuItem');
	var menuItemTitle = document.getElementById('menuItemTitle');
	var menuItemImg = document.getElementById('menuItemImg');

	var node = menuItem.cloneNode(true);
	var cloneNodeAttributes = node.querySelector('[id="menuItemTitle"]');
	cloneNodeAttributes.innerHTML = item;
	var cloneNodeImg = node.querySelector('[id="menuItemImg"]');
	cloneNodeImg.src= './images/' + getPic(item);

	node.style.display = 'block';
	menu.appendChild(node);
	
	
}

function saveMenuItems() {
	var list = JSON.parse(localStorage.getItem('menu'));
	if (list == null) {
		list = response;
	}

	localStorage.setItem('menu', JSON.stringify(list));
	loadMenuItems();

}

function loadMenuItems()
{
	
	var list = JSON.parse(localStorage.getItem('menu'));
	if (list == null) 
	{
		saveMenuItems();
	}

	
	menuItemTitle.innerHtml = '';

	for (var key in list) {
		if (list.hasOwnProperty(key)) {
			var node = menuItem.cloneNode(true);
			//var textnode = document.createTextNode(key + ' - ' + list[key]);
			node.appendChild(textnode);
			menu.appendChild(node);
			for(var i = 0; i < list.menu_size; i++)
			{
				displayMenuItems(list.menu_items[i].description);
			}
		}
	}

}