import path from 'path';
import * as fs from "fs";

interface RegexpGeneratorOptions {
    addSeparators: boolean;
    fullWords: boolean;
    words: string[];
}

type CharacterSource = {[key: string]: string};

export default class RegexpGenerator {
    private readonly options: RegexpGeneratorOptions;
    private readonly outputFolderPath: string;

    constructor(options: RegexpGeneratorOptions) {
        this.options = options;
        this.outputFolderPath = path.join(path.dirname(path.dirname(__dirname)), 'output');

        if (!fs.existsSync(this.outputFolderPath)) {
            fs.mkdirSync(this.outputFolderPath);
        }
    }

    public async generate(): Promise<{[key: string]: string}> {
        const charactersJson = await import('#source/characters.json');
        const characterSource: CharacterSource = charactersJson.default as CharacterSource;
        let output: {[key: string]: string} = {};

        characterSource.u = characterSource.v;

        for (const word of this.options.words) {
            const outputFilePath = path.join(this.outputFolderPath, `regexp-${word.replace(/\W/, '-')}.txt`);
            let regexp = '';

            for (const character of word) {
                regexp += `[${characterSource[character] ?? character}]+`;

                if (this.options.addSeparators) {
                    regexp += `[${characterSource.separators}]*`;
                }
            }

            regexp = this.options.fullWords ? `\\b${regexp}\\b` : regexp;
            fs.writeFileSync(outputFilePath, regexp);

            output[word] = outputFilePath;
        }

        return output;
    }
}
