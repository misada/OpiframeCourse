var database = []
window.onload = function () {
	createForm()
	getshoppinglist()
}

createForm = () => {
	let anchor = document.getElementById("anchor");
	let shoppingForm = document.createElement("form");
	let centeringdiv = document.createElement("div");
	centeringdiv.setAttribute("class", "col-xs-1");
	centeringdiv.setAttribute("align", "center");
	
	//Item type input
	
	let typeinput = document.createElement("input");
	typeinput.setAttribute("type","text");
	typeinput.setAttribute("value","");
	typeinput.setAttribute("name","typeinput");
	typeinput.setAttribute("id","typeinput");
	let typeinputlabel = document.createElement("label");
	typeinputlabel.setAttribute("for","typeinput");
	let typelabeltext = document.createTextNode("Type:");
	typeinputlabel.appendChild(typelabeltext);

	//count input
	
	let countinput = document.createElement("input");
	countinput.setAttribute("type","number");
	countinput.setAttribute("value","");
	countinput.setAttribute("name","countinput");
	countinput.setAttribute("id","countinput");
	let countinputlabel = document.createElement("label");
	countinputlabel.setAttribute("for","countinput");
	let countlabeltext = document.createTextNode("Count:");
	countinputlabel.appendChild(countlabeltext);
	
	//price input
	
	let priceinput = document.createElement("input");
	priceinput.setAttribute("type","number");
	priceinput.setAttribute("value","");
	priceinput.setAttribute("name","priceinput");
	priceinput.setAttribute("id","priceinput");
	let priceinputlabel = document.createElement("label");
	priceinputlabel.setAttribute("for","priceinput");
	let pricelabeltext = document.createTextNode("Price:");
	priceinputlabel.appendChild(pricelabeltext);
		
	// Submit button
	let submit = document.createElement("input");
	submit.setAttribute("type","submit");
	submit.setAttribute("value","add");
	submit.setAttribute("class", "btn btn-primary");
	
	let br = document.createElement("br");
	shoppingForm.appendChild(typeinputlabel);
	shoppingForm.appendChild(typeinput);
	shoppingForm.appendChild(br);

	shoppingForm.appendChild(priceinputlabel);
	shoppingForm.appendChild(priceinput);
	shoppingForm.appendChild(br.cloneNode());
	
	shoppingForm.appendChild(countinputlabel);
	shoppingForm.appendChild(countinput);
	shoppingForm.appendChild(br.cloneNode());
	
	shoppingForm.appendChild(submit);
	shoppingForm.addEventListener("submit", function(event){
		event.preventDefault();
		addtoList();
	})
	
	centeringdiv.appendChild(shoppingForm);
	anchor.appendChild(centeringdiv);
	
	let tableanchor = document.createElement("div");
	tableanchor.setAttribute("id", "tableanchor");
	anchor.appendChild(tableanchor);
}

addtoList =()=> {
	let type = document.getElementById("typeinput").value
	let price = document.getElementById("priceinput").value
	let count = document.getElementById("countinput").value
	let shoppingitem = {
		type: type,
		count: count,
		price: price
	}
	let request = {
		method: "POST",
		mode: "cors",
		headers: {"content-type": "application/json"},
		body: JSON.stringify(shoppingitem)
	}
	fetch ('/api/shopping', request).then(res=>{
		if (res.ok){
			getshoppinglist();
		}else {
			console.log("Add to list failed. Reason " + res.status)
		}
	}).catch(error=>{
		console.log(error);
	});
	/*
	database.push(shoppingitem);
	populatetable();
	*/
}

populatetable = (data) => {
	let tableanchor = document.getElementById("tableanchor")
	let table = document.getElementById("table")
	if (table) {
		tableanchor.removeChild(table);
	}
	
	let newtable = document.createElement("table");
	newtable.setAttribute("id","table");
	newtable.setAttribute("class", "table");
	
	let header = document.createElement("thead");
	let headerrow = document.createElement("tr");
	let typeheader = document.createElement("th");
	let typetext = document.createTextNode("Type");
	typeheader.appendChild(typetext);
	
	let priceheader = document.createElement("th");
	let pricetext = document.createTextNode("Price");
	priceheader.appendChild(pricetext);
	
	let countheader = document.createElement("th");
	let counttext = document.createTextNode("Count");
	countheader.appendChild(counttext);
	
	headerrow.appendChild(typeheader);
	headerrow.appendChild(priceheader);
	headerrow.appendChild(countheader);
	
	header.appendChild(headerrow);
	
	newtable.appendChild(header);
	
	//table body
	let body = document.createElement("tbody");
	for (i=0; i<data.length; i++){
		let tablerow = document.createElement("tr");
		for (x in data[i]) {
			if (x==="id"){
				continue
			}
			let column = document.createElement("td");
			let info = document.createTextNode(data[i][x]);
			column.appendChild(info);
			tablerow.appendChild(column);
		}
		body.appendChild(tablerow);
	}
newtable.appendChild(body);
tableanchor.appendChild(newtable);	
}

getshoppinglist = ()=> {
	let request = {
		method: "GET",
		mode: "cors",
		headers: {"content-type": "application/json"},
	}
	fetch ('/api/shopping', request).then(res=>{
		if (res.ok){
			res.json().then(data=>{
				populatetable(data)
			})
		}else {
			console.log("Add to list failed. Reason " + res.status)
		}
	}).catch(error=>{
		console.log(error);
	});
}