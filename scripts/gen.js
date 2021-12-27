import _ from "lodash";
import fs from "fs";
import path from "path";
import en from "../mobile/locales/en.json";

async function gen(locale) {
    let { default: localeData } = await import(`../mobile/locales/${locale}.json`);
    let data = _.merge({}, en, localeData);
    fs.writeFileSync(path.resolve(`mobile/locales/${locale}.json`), JSON.stringify(data, null, 2));
    console.log(Object.keys(data).length, Object.keys(en).length);
}

async function genAll() {
    let files = fs.readdirSync(path.resolve("mobile/locales"));
    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        if (file.endsWith(".json") && file.slice(0, -5) !== "en") {
            await gen(file.slice(0, -5));
        }
    }
}

genAll()