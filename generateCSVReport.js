function generateCSVReport(result) {
    var CSVFile = this.generateCSV(result);
    var blob = new Blob([CSVFile], {
        type: "text/csv;charset=utf-8;"
    });

    if (navigator.msSaveBlob) { //for IE 10+
        navigator.msSaveBlob(blob, "users.csv");
    } else {
        var encodedUri = encodeURI(CSVFile);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "users.csv");
        document.body.appendChild(link);

        link.click();
        document.body.removeChild(link);
    }
}

function generateCSV(result) {
    var CSVFile = "data:text/csv;charset=utf-8,";

    //Create the attr list as the first user(For further use please specify own AttrList)
    var AttrList = [];


    if (result != null) {
        for (var key in result[0]) {
            if (result[0].hasOwnProperty(key)) {
                CSVFile += "\"" + key + "\",";
                AttrList.push(key);
            }
        }
        CSVFile += "\n";
    }
    result.forEach(function(jsonData) {
        AttrList.forEach(function(key) {
            if (jsonData.hasOwnProperty(key)) {
                if (jsonData[key] != null) {
                    CSVFile += "\"" + jsonData[key] + "\",";
                } else {
                    CSVFile += ",";
                }
            } else {
                CSVFile += ",";
            }
        });
        CSVFile += "\n";
    });
    return CSVFile;
},