var dogId = "";

function fetchDogs() {
	const p = document.createElement("p");
	p.innerText = "loading...";
	p.setAttribute("id","loading");
	document.body.appendChild(p);
	const content = document.getElementById("content");
	
	fetch("http://localhost:3000/players", {method: 'get'})
	.then((response)=>{
		response.json()
		.then((data)=>{
			console.log(data); // in data sunt potaile
			if (data.length) {
				document.body.removeChild(p);
			}
			/// const dog of data -> direct obiectul
			for (let i = 0; i<data.length; i++) {
				const img = document.createElement("img");
				img.width = 100;
				img.setAttribute("src",data[i].img);
				content.appendChild(img);
				const nume = document.createElement("h2");
				nume.innerText=data[i].name;
				content.appendChild(nume);
				
				const button = document.createElement("button");
				button.innerText = "Edit";
				button.onclick = function() {
					document.getElementById("name").value = data[i].name;
					document.getElementById("image").value = data[i].img;
					dogId = data[i].id;
				}
				
				content.appendChild(button);
				
				const buttonDel = document.createElement("button");
				buttonDel.innerText = "Delete";
				buttonDel.onclick = function() {
					deleteDog(data[i].id);
				}
				
				content.appendChild(buttonDel);
					
				
				
				
				const divider = document.createElement("hr");
				content.appendChild(divider);
			}
		})
	});
	
}

function addDog() {
	const name = document.getElementById("name").value;
	const image = document.getElementById("image").value;
	if (!name || !image) {
		alert("Invalid data!");
		return;
	}
	const newDog = { name: name, img: image };
	
	
	fetch("http://localhost:3000/players", 
		  {method: 'post', 
		   headers: 
		   {
			   'Content-Type' : 'application/json'
		   },
		   body: JSON.stringify(newDog)
		  }).then(function(response)
				  {
					console.log(response); window.location.reload();}
				  );
}


function editDog() {
	const name = document.getElementById("name").value;
	const image = document.getElementById("image").value;
	if (!name || !image) {
		alert("Invalid data!");
		return;
	}
	const newDog = { name: name, img: image };
	fetch("http://localhost:3000/players/"+dogId, 
		  {method: 'put', 
		   headers: 
		   {
			   'Content-Type' : 'application/json'
		   },
		   body: JSON.stringify(newDog)
		  }).then(function(response)
				  {
					console.log(response); window.location.reload();}
				  );
	
}

function deleteDog( id) {
	fetch("http://localhost:3000/players/"+id, 
		  {method: 'delete', 
		  }).then(function(response)
				  {
					console.log(response); window.location.reload();}
				  );
}

// function(arg){}  este ac lucru cu (arg)=>{}
fetchDogs();