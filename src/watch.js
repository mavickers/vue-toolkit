const del = require("del");
const copy = require("recursive-copy");
const jsonFile = require("jsonfile");

const copyOptions = {
    filter: [ /^((?!(node_modules|package-lock\.json|watch\.js)).)*$/ ]
};

async function main() {

    try{
        await del.sync(["../dist"], { force: true });

        await copy(".", "../dist", copyOptions);

        const obj = await jsonFile.readFile("../dist/package.json");

        delete obj.devDependencies;
        delete obj.scripts.dev;
        delete obj.scripts.watchbuild;

        await jsonFile.writeFile("../dist/package.json", obj, { spaces: 4, EOL: "\r\n" });
    }
    catch(err){
        console.log(err);
    }

}

main();

