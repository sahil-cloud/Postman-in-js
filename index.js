// console.log('hello');

// Utility functions:
// 1. Utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// Initialize no of parameters
let addedParamCount = 0;

// by default paramenetr box is hidden
let paramBox = document.getElementById('parametersBox');
let jsonBox = document.getElementById('requestJsonBox');
paramBox.style.display = 'none';

// on clicking json json will appear and request box disappers
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click',() => {
    jsonBox.style.display='block';
    paramBox.style.display = 'none';
});

// on clicking request box request box will appear and json disappers
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    paramBox.style.display = 'block';
    jsonBox.style.display = 'none';
});

let addParam = document.getElementById('addParam');
addParam.addEventListener('click',() => {
    let params = document.getElementById('params');
    let string = `<div class="row my-3">
                <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                <div class="col">
                    <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
                </div>
                <div class="col">
                    <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                </div>
                <div class="col">
                <button class="btn btn-primary deleteParam">-</button>
                </div>
            </div>`;
    // Convert the element string to DOM node
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    // Add an event listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            // TODO: add a confirmation box to confirm parameter deletion
            e.target.parentElement.parentElement.remove();
        })
    }
    addedParamCount++;
});

// If the user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // Show please wait in the response box to request patience from the user
    // document.getElementById('responseJsonText').value = "Please wait.. Fetching response...";
    document.getElementById('responseJsonText').innerHTML = "Please wait.. Fetching response...";

    // Fetch all the values user has entered
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    // If user has used params option instead of json, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
        data = JSON.stringify(data);
    }

    // Log all the values in the console for debugging
    console.log('URL is ', url);
    console.log('requestType is ', requestType);
    console.log('contentType is ', contentType);
    console.log('data is ', data);

    // if the request type is get, invoke fetch api to create a post request
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonText').value = text;
                // document.getElementById('responseJsonText').innerHTML = text;
                // Prism.highlightAll();
            });
    }

    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.text())
            .then((text) => {
                // text = JSON.parse(result)
                document.getElementById('responseJsonText').value = text;
                console.log(text)
                // document.getElementById('responseJsonText').innerHTML = text;
                // Prism.highlightAll();
            });

    }


});