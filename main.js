counter = 1;
var removedNodes = [];

// function onload(){
//     // Add initial node
//     var div = document.createElement("div");
//     var circle_container = document.getElementById("circle_container"); 
//     div.innerHTML = "3";          
//     div.classList.add("circle");
//     counter = 0;
//     div.id = "circle" + counter;
//     circle_container.appendChild(div);
//     counter = 1;
// }


function addNode(){
    var div = document.createElement("div");
    var circle_container = document.getElementById("circle_container"); 
    div.style.height = "0px";
    div.style.width = "0px";
    div.style.offsetWidth = "10px"
    div.classList.add("circle");   
    div.id = "circle" + counter;
    counter += 1;
    circle_container.appendChild(div);

    var millisecondsToWait = 30;
    setTimeout(function() {
        div.style.height = "100px";
        div.style.width = "100px";    
        div.innerHTML = document.getElementById('add_data').value;  
    }, millisecondsToWait);
}

function setNode(){
    var nonRemovedId = 'circle' + set_index.value;
    var selectedNode = document.getElementById('circle' + nonRemovedId)
    var circleVal = parseInt(set_index.value)
    var i = 0
    if (removedNodes.length > 0){
        for (i = 0; i < removedNodes.length; i++) {
            if (removedNodes.includes('circle' + parseInt(set_index.value))){
                circleVal = circleVal + 1
                nonRemovedId = 'circle' + circleVal
            }
        } 
    }
    selectedNode = document.getElementById(nonRemovedId)
    selectedNode.innerHTML = set_data.value;
}

function removeNode(){
    var selectedNode = document.getElementById('circle' + remove_index.value)
    selectedNode.style.backgroundColor = "#FA8072";
    removedNodes.push(selectedNode.id);

}

function loopNodes(method){
    var childDivs = document.getElementById('circle_container').childNodes;
    if (method == 'set'){
        loop = parseInt(set_index.value) * 3 - 2;
    } else if (method == 'remove'){
        loop = parseInt(remove_index.value) * 3 - 1;
    } else {
        loop = childDivs.length;
    }
    function load() {
        return new Promise(resolve => {
            for (let i=0, max=loop; i < loop; i++) {
                if(childDivs[i].innerHTML != undefined && childDivs[i].innerHTML != ""){
                    if (!removedNodes.includes(childDivs[i].id)){
                        setTimeout(function timer() {
                            animateNode(childDivs[i].id)
                        }, i * 200);
                    }
                }
            }
            // 
            var millisecondsToWait = 500 * counter;
            setTimeout(function() {
                resolve()
            }, millisecondsToWait);
            
        });
    }

    function make() {
        if (method == 'add'){
            addArrow()
            addNode()
        }
    
        if (method == 'set'){
            setNode()
        }

        if (method == 'remove'){
            removeNode()
        }
    }

    load().then(result => make());
}

function addArrow(){
    // Add initial node
    var arrow = document.createElement("p");
    var circle_container = document.getElementById("circle_container");      
    arrow.classList.add("arrow-right");   
    arrow.id = "arrow-right";
    circle_container.appendChild(arrow);
}

function setSubmit(){
    var set_data = document.getElementById('set_data');
    var set_index = document.getElementById('set_index');
    var indexCircle = document.getElementById( "circle" + set_index.value);
    if(set_data.value === "" || set_index.value === ""){
        swal("Set uses both data and index");
    } else if(set_data.value < 0 || set_index.value < 0 ){
        swal("Entered numbers must be postitive");
    } 
    if (set_index.value > counter - 1){
        swal("Elements in array:  " + counter);
    }

    if(indexCircle){
        loopNodes('set') 
    } else {
        swal("Unable to find index: " + set_index.value);
    }
}



function animateNode(childNode){
    var circle = ""
    circle = document.getElementById(childNode);
    increaseSize()
    var millisecondsToWait = 200;
    setTimeout(function() {
        decreaseSize()
    }, millisecondsToWait);

    function increaseSize(){
        circle.style.width = "115px";
        circle.style.height = "115px";
        circle.style.paddingTop = "30px";
    }

    function decreaseSize(){
        circle.style.width = "100px";
        circle.style.height = "100px";
        circle.style.paddingTop = "25px";
    }
}

function insertSubmit(){
    var insert_data = document.getElementById('insert_data');
    var insert_index = document.getElementById('insert_index');
    if(insert_data.value === "" || insert_index.value === ""){
        swal("Insert uses both data and index");
    } else if(insert_data.value < 0 || insert_index.value < 0 ){
        swal("Entered numbers must be postitive");
    } 

    if (insert_index.value > counter){
        swal("Elements in array:  " + counter);
    }
}

function addSubmit(){
    var add_data = document.getElementById('add_data');
    if(add_data.value == ""){
        swal("Enter a value to add");
    } else {
        loopNodes('add') 
    }

}

function removeSubmit(){
    var remove_index = document.getElementById('remove_index');
    var indexCircle = document.getElementById( "circle" + remove_index.value);
    if(remove_index.value < 0 ){
        swal("Entered numbers must be postitive");
    } 
    if (remove_index.value > counter - 1){
        swal("Elements in array:  " + counter);
    }

    if(indexCircle){
        loopNodes('remove') 
    } else {
        swal("Unable to find index: " + remove_index.value);
    }
}