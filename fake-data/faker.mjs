import { faker } from "@faker-js/faker";
import fs from "fs";

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
    id: i + 1,
  });
}

fs.writeFileSync("debitor.json", JSON.stringify(fakerDebitor));
