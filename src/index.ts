import ArgumentsParser from '#root/lib/ArgumentsParser';
import RegexpGenerator from '#root/lib/RegexpGenerator';

const argumentParser = new ArgumentsParser();

argumentParser.addOption(
    'help',
    'Display this help dialog.',
    'h'
).addOption(
    'add-separators',
    'Adds in the RegExp the possibility for each character to be separated by special characters.',
    's'
).addOption(
    'full-words',
    'Sets the RegExp to capture full words only.',
    'w'
);

if (argumentParser.hasOption('help')) {
    const optionShorthandMap = new Map();
    const options = [...argumentParser.optionDefinitions.keys()];
    const biggestOption = options.reduce((carry, option) => option.length > carry.length ? option : carry);

    argumentParser.shorthandOptionsMap.forEach((value, key) => {
        optionShorthandMap.set(value, key);
    });

    const optionsDialog = options.reduce((carry, option) => {
        const tabs = Array(Math.ceil((biggestOption.length - option.length) / 8)).fill('\t').join('');

        carry += `\t--${option}\t${tabs}-${optionShorthandMap.get(option)}\t${argumentParser.optionDefinitions.get(option)}\n`;

        return carry;
    }, '');

    console.log(`Regenerator - Generate regular expressions to capture words\n\nUsage: npm start -- [options] word1 [word2 [etc]]\n\nOptions:\n${optionsDialog}`);
    process.exit(0);
}

const addSeparators = argumentParser.hasOption('add-separators');
const fullWords = argumentParser.hasOption('full-words');
const words = argumentParser.words;

const regexpGenerator = new RegexpGenerator({
    addSeparators,
    fullWords,
    words,
});

regexpGenerator.generate().then((response: {[key: string]: string}): void => {
    for (const word of Object.keys(response)) {
        console.log(`RegExp for word "${word}" generated into ${response[word]}`);
    }
});
