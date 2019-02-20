const del = require("del");
const copy = require("recursive-copy");
const jsonFile = require("jsonfile");

// change this to your liking
const distFolder = "../../dist";

const copyOptions = {
    filter: [ /^((?!(node_modules|\.idea|package-lock\.json|build-package\.js)).)*$/ ]
};

async function main() {

    try{
        await del.sync([distFolder], { force: true });

        await copy(".", distFolder, copyOptions);

        const obj = await jsonFile.readFile(distFolder + "/package.json");

        delete obj.devDependencies;
        delete obj.scripts.dev;
        delete obj.scripts.watchbuild;

        await jsonFile.writeFile(distFolder + "/package.json", obj, { spaces: 4, EOL: "\r\n" });

        console.log("build complete\r\n");
    }
    catch(err){
        console.log(err);
    }
}

main();

