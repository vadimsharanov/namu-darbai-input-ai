const readline = require("readline");
const fs = require("fs/promises");


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
    ND

    let vardas = await inputText("Ivesk varda: ");
    console.log(vardas);

    try {
        let alga = await inputNumber("Ivesk alga: ");
        console.log(alga);
    } catch (err) {
        console.log("blogas skaicius", err);
    }

    let zmones = [
        {
            vardas: "Jonas",
            pavarde: "Jonaitis",
            alga: 123.48
        },
        {
            vardas: "Petras",
            pavarde: "Petraitis",
            alga: 123.48
        },
        {
            vardas: "Antanas",
            pavarde: "Antanaitis",
            alga: 123.48
        }
    ];
    try {
        await fs.writeFile("zmones.json", JSON.stringify(zmones), {
            encoding: "utf-8"
        });
    } catch (err) {
        console.log("Failed to write to file", err);
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
