"use strict";
const fs = require("fs/promises")

async function main() {
    console.log("start");
    let allData = ""
    try {
        
      allData += await (fs.readFile("zmones.json"))
    }
      catch(err) {
        allData += 
        " neperskaitytas"
  
      }
      let zmones = ["dasdsad"]
      let pushing = JSON.parse(allData)
      pushing.push(42343)
      try {
        await fs.writeFile("zmones.json", JSON.stringify(pushing), {
            encoding: "utf-8"
        });
    } catch (err) {
        console.log("Failed to write to file", err);
    }
    

    console.log(allData);
    console.log(pushing)
  
      
      console.log("finish");
    }
    main()