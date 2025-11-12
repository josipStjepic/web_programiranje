class Macka {
  constructor(ime, boja, dob, spol) {
    this.ime = ime;
    this.boja = boja;
    this.dob = dob;
    this.spol = spol;
  }


  promijeniDob(novaDob) {
    this.dob = novaDob;
  }


  podaci() {
    return "Ime: " + this.ime +
           ", Boja: " + this.boja +
           ", Dob: " + this.dob +
           ", Spol: " + this.spol;
  }
}


let tigar = new Macka("Tigar", "narančasta", 4, "muški");
let micika = new Macka("Micika", "siva", 2, "ženski");


document.write("<p>" + tigar.podaci() + "</p>");


micika.promijeniDob(5);
document.write("<p>Micika nova dob: " + micika.dob + "</p>");


let mojJSON = JSON.stringify(tigar);

document.write("<p>" + mojJSON + "</p>");


document.write("<p>Posljednja izmjena: " + document.lastModified + "</p>");
//