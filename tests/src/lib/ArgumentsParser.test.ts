import ArgumentsParser from '#root/lib/ArgumentsParser';

const argumentsParser = new ArgumentsParser([
    '--unknown-option',
    '--add-separators',
    'test1',
    '--unknown-option-2',
    'test2',
    '--full-words',
]);

argumentsParser.addOption(
    'add-separators',
    'Adds in the RegExp the possibility for each character to be separated by special characters.',
    's'
).addOption(
    'full-words',
    'Sets the RegExp to capture full words only.',
    'w'
);

describe('Testing the ArgumentsParser class', () => {
    test('Is correctly formed', () => {
        expect(typeof ArgumentsParser).toBe('function');
        expect(typeof argumentsParser).toBe('object');
        expect(typeof argumentsParser.addOption).toBe('function');
        expect(typeof argumentsParser.hasOption).toBe('function');
        expect(typeof argumentsParser.optionDefinitions).toBe('object');
        expect(typeof argumentsParser.shorthandOptionsMap).toBe('object');
    });

    test('Returns the correct values', () => {
        expect(typeof argumentsParser.words).toBe('object');
        expect(typeof argumentsParser.hasOption('test')).toBe('boolean');
    });

    test('Is correctly initialized', () => {
        expect(argumentsParser.hasOption('add-separators')).toBe(true);
        expect(argumentsParser.hasOption('unknown-option')).toBe(false);
        expect(argumentsParser.words.length).toBe(2);
        expect(argumentsParser.words.includes('test1')).toBe(true);
        expect(argumentsParser.words.includes('test2')).toBe(true);
        expect(argumentsParser.words.includes('test3')).toBe(false);
    });
});
