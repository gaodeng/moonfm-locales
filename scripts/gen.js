import _ from "lodash";
import fs from "fs";
import path from "path";
import en from "../locales/en.json" assert {type: "json"};

async function gen(locale) {
    let { default: localeData } = await import(`../locales/${locale}.json`, { assert: { type: 'json' } });
    let data = _.merge({}, en, localeData);
    fs.writeFileSync(path.resolve(`locales/${locale}.json`), JSON.stringify(data, null, 2));
    console.log(Object.keys(data).length, Object.keys(en).length);
}

async function genAll() {
    let files = fs.readdirSync(path.resolve("locales"));
    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        if (file.endsWith(".json") && file.slice(0, -5) !== "en") {
            await gen(file.slice(0, -5));
        }
    }
}

genAll()


