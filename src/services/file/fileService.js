var xlsx = require("xlsx");
const fs = require("fs");
const {Configuration, OpenAIApi} = require("openai");


async function TransFormData(){
    var workbook = xlsx.readFile("src/shared/data-set.xlsx");
    var shet_name_list = workbook.SheetNames;
    var xlData = xlsx.utils.sheet_to_json(workbook.SheetNames[shet_name_list[0]]);

    for (const item of xlData){
        var object = `{"prompt": "${item.Question} ->, "completion": "${item.Answer
        .replace("[", "").replace("]", "")} END}`;

        await fs.appendFileSync("src/shared/data-set.jsonl", object, "utf8", function(){})
        await fs.appendFileSync("src/shared/data-set.jsonl", "/r/n", "utf8", function(){})
    }
}

async function UploadFile(){
    const configuration = new Configuration({apiKey: "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"});
    const openai = new OpenAIApi(configuration);
    const response = await openai.createFile(fs.createReadStream("src/shared/data-set.jsonl"), "fine-tune");
    return response; 

}

module.exports = {
    TransFormData,
    UploadFile
}