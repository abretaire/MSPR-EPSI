const fetch = require("node-fetch")

 test('Test api code promo aer3fpfoe', async () => {
     const data = await fetch('https://mspr-epsi.tomco.tech/promos/aer3fpfoe');
     const dataJson = await data.json();
     expect([dataJson[0].DATA, dataJson[0].ID, dataJson[0].MONTANT, dataJson[0].LIBELLE]).toStrictEqual(["aer3fpfoe", 1, 30, "Nike"]);
 });


test('Api fonctionnelle', async () => {
    const data = await fetch('https://mspr-epsi.tomco.tech/promos/');
    const dataJson = await data.json();
    return expect(dataJson).toBeInstanceOf(Array);
});

