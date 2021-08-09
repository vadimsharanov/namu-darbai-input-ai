const readline = require("readline");
const fs = require("fs/promises");

class Zmogus {
    constructor(vardas, pavarde, alga) {
        this.vardas = vardas;
        this.pavarde = pavarde;
        this.alga = alga;
    }
 }

 
 

 const rl = readline.createInterface({
     input: process.stdin,
     output: process.stdout
    });
    
    function inputText(msg) {
        return new Promise((resolve) => {
            rl.question(msg, (answer) => {
                resolve(answer);
            });
        });
    }
    function inputNumber(msg) {
        return new Promise((resolve, reject) => { 
            rl.question(msg, (answer) => {
                const num = parseFloat(answer);
                if (!isNaN(num) && Number.isFinite(num)) {
                    resolve(num);
                } else {
                    reject(new Error(`${answer} is not a number`));
                }
            });
        });
        
    }
    
    async function main() {
 
         let pushing = [];
        let menu = await inputText(" Menu: \r\n 1) atspausdinti visus zmones. \r\n 2) Prideti nauja zmogu.\r\n 3) Istrinti zmogu.\r\n 4) Algos filtras.\r\n 0) Baigti darba. \r\n");
        let allData = "";
        try {
            allData += await(fs.readFile("zmones.json"))
        }
        catch(err) {
        }
        try {
        pushing = JSON.parse(allData)
        }
        catch(err) {
            await fs.writeFile("zmones.json", JSON.stringify([]), {
                encoding: "utf-8"
            });
        }
        if (menu === "0") {
            console.log("Darbas baigtas");
        }
        // console.log(pushing);
        if (menu === "1") {
            console.log(pushing);
        }
        if (menu === "2") {
            try {
                let zmogeliukas = new Object()
                zmogeliukas.vardas = await inputText("Ivesk varda: \r\n ");
                zmogeliukas.pavarde = await inputText("Ivesk pavarde: \r\n ")
                zmogeliukas.alga = await inputNumber("Ivesk alga: \r\n ")
                pushing.push(zmogeliukas)
                
            } catch (err) {
                console.log("blogas skaicius", err);
            }

            try {
                await fs.writeFile("zmones.json", JSON.stringify(pushing), {
                    encoding: "utf-8"
                });
            } catch (err) {
                console.log("Failed to write to file", err);
            }
        }
        if (menu === "3") {
            let vardass = await inputText("Iveskite varda, kuri noretumete pasalinti \r\n")
            for (let duomenys of pushing) {
                if ( duomenys.vardas === vardass) {
                    console.log("Toks vardas duomenu bazeje yra, istrinu.  ");
                    pushing.splice(duomenys, 1)
                    console.log(pushing);
                }
                try {
                    await fs.writeFile("zmones.json", JSON.stringify(pushing), {
                        encoding: "utf-8"
                    });
                } catch (err) {
                    console.log("Failed to write to file", err);
                }
            //  console.log(duomenys.vardas);
                
            } 
        }
        if (menu === "4") {
            let algosFiltras = await inputText("Iveskite skaiciu \r\n") 
            console.log(`Siu zmoniu algos yra didesnes, negu ${algosFiltras}`);
            for ( let duomenys of pushing) {
                if (duomenys.alga > algosFiltras) {
                    console.log(duomenys);
                }
            }

        }
        else {
            await main()
        }
        rl.close();
    }


    
main();
/*
zmoniu sarasas

vienas zmogus atrodo taip:
{
    vardas: "Jonas"
    pavarde: "Jonaitis",
    alga: 123.48
}

parodom meniu:
1. atspausdinti visus zmones
2. prideti nauja
3. istrinti zmogu
0. pabaigti

duomenys saugomi faile zmones.json
jei failo nera - programa sukuria faila pirmo pridejimo metu

1. perskaitom is zmones.json ir parodom sarasa (su numeriais)
jei failo nera - nieko nespausdinam
2. papraso ivesti varda, pavarde, alga
prideda nauja zmogu i sarasa (prie failo, jei nera sukuria)
3. papraso ivesti numeri (is saraso) zmogaus, kuri reikia istrinti
istrina is saraso ir perraso faila
0. baigia darba

pasirinkus neegzistuojanti meniu punkta (jei ivede ne 0, 1, 2, 3, tai vel spausdinti meniu)

*)
4. turtuoliu sarsas
papraso ivesti skaiciu
atspausdina visus zmones, kuriu alga didesne uz ivesta skaiciu

*/
