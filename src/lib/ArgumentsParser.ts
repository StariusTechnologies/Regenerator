import path from "path";

export default class ArgumentsParser {
    private static readonly filteredOutArguments = [
        'node',
        __dirname,
        path.dirname(__dirname),
        path.dirname(path.dirname(__dirname)),
        'npm',
        'start',
        'index.ts'
    ];

    public readonly optionDefinitions: Map<string, string> = new Map();
    public readonly shorthandOptionsMap: Map<string, string> = new Map();

    private args: string[];

    constructor(argumentSource = process.argv) {
        this.args = argumentSource.filter(argument => {
            return !ArgumentsParser.filteredOutArguments.some(
                filteredOutArgument => argument.includes(filteredOutArgument)
            );
        });
    }

    public addOption(name: string, description: string, shortName: string | null = null): ArgumentsParser {
        this.optionDefinitions.set(name, description);

        if (shortName) {
            this.shorthandOptionsMap.set(shortName, name);
        }

        return this;
    }

    public hasOption(name: string) {
        return this.args.filter(argument => argument.startsWith('-')).map(option => {
            let optionName = option.slice(2);

            if (!option.startsWith('--')) {
                optionName = this.shorthandOptionsMap.get(option.slice(1)) ?? '';
            }

            return this.optionDefinitions.has(optionName) ? optionName : '';
        }).includes(name);
    }

    public get words() {
        return this.args.filter(argument => !argument.startsWith('-'));
    }
}
