import { faker } from "@faker-js/faker";
import fs from "fs";
import { cwd } from "process";

const fakerDebitor = [];

for (let i = 0; i < 50; i++) {
  fakerDebitor.push({
    name: faker.name.findName(),
    jenis_pengurusan: faker.random.arrayElement(["standar", "komplit"]),
    notaris: faker.name.findName(),
    data_agunan: faker.company.catchPhrase(),
    cabang: faker.address.cityName(),
    nomor: faker.datatype.uuid(),
    tanggal_penyerahan: faker.datatype.datetime(),
    tanggal_berakhir: faker.datatype.datetime(),
    status: faker.random.arrayElement(["done", "progress", "pending"]),
    alamat: faker.random.arrayElement(["Raha", "Kendari", "Unaha", "Buton"]),
    id: i + 1,
  });
}

fs.writeFileSync(
  `${cwd()}/fake-data/debitor.json`,
  JSON.stringify(fakerDebitor)
);

const fakerBranchs = [];
const branchs = [
  "Cabang Raha",
  "Cabang Kendari",
  "Cabang Unaha",
  "Cabang Buton",
  "Cabang Bombana",
  "Buton Selatan",
  "Cabang Kolaka",
  "Cabang Konawe",
  "Cabang Konawe Kepulawan",
  "Cabang Muna Barat",
  "Cabang Baubau",
];

for (let i = 0; i < branchs.length; i++) {
  fakerBranchs.push({
    branch: branchs[i],
    id: i + 1,
  });
}

fs.writeFileSync(
  `${cwd()}/fake-data/branch.json`,
  JSON.stringify(fakerBranchs)
);

const fakerUsers = [];

for (let i = 0; i < 50; i++) {
  fakerUsers.push({
    role: faker.random.arrayElement([
      "Administrator",
      "Admin Pusat",
      "Apraisal",
      "Notaris",
    ]),
    id: i + 1,
    name: faker.name.findName(),
  });
}

fs.writeFileSync(`${cwd()}/fake-data/user.json`, JSON.stringify(fakerUsers));
