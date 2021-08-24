import RegexpGenerator from '#root/lib/RegexpGenerator';
import * as fs from "fs";

const regexpGenerator = new RegexpGenerator({
    addSeparators: true,
    fullWords: true,
    words: ['eggs', 'lasagna'],
});

describe('Testing the RegexpGenerator class', () => {
    test('Is correctly formed', () => {
        expect(typeof RegexpGenerator).toBe('function');
        expect(typeof regexpGenerator).toBe('object');
        expect(typeof regexpGenerator.generate).toBe('function');
    });

    it('Generates working RegExps', async () => {
        const response = await regexpGenerator.generate();

        for (const word of Object.keys(response)) {
            const path = response[word];
            const regexp = new RegExp(fs.readFileSync(path, { encoding: 'utf-8' }), 'igu');

            expect(regexp.test(word)).toBe(true);
            fs.rmSync(path);
        }
    });
});
