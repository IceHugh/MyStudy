var oUl = $("#contact-detail");

var oli = null;
mui.getJSON('js/contact.json', function(data) {
	mui.each(data, function(index, element) {
        var x = data[index].type;
        console.log(document.querySelector("."+x))
        if(document.querySelector("."+x)=== null){
        	createL(x)
        }
		oli = document.createElement("li");
		oli.innerHTML = '<img src="' + data[index].imgURL + '"/><p class="name">' + data[index].name + '<span>' + data[index].alisa + '</span></p><p class="qq">' + data[index].email + '</p>';
		oli.setAttribute("data-value", data[index].tag);
		oli.setAttribute("data-tags", data[index].tag);
		oli.className = "mui-table-view-cell mui-indexed-list-item";
		oUl.append(oli);
	});
})

function createL(obj) {
	oli = document.createElement("li");
	oli.setAttribute("data-group",obj);
	oli.innerText = obj;
	oli.className = "mui-table-view-divider mui-indexed-list-group "+obj;
	oUl.append(oli);
}