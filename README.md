# Regenerator

Generate regular expressions to capture words. Used for automod systems on Discord.

# Installation

1. Clone this repository
```bash
git clone git@github.com:StariusTechnologies/Regenerator.git
```
2. Go to the newly created folder and install the dependencies with NPM
```bash
cd Regenerator
npm i
```
3. Build the project
```bash
npm run build
```

# Usage

The script should be ran using the `npm start` instruction. It does require arguments to function, though. A list of those arguments can be found by running `npm start -- -h`.

Once ran, the script will take the input you give it and generate a regular expression to match the word you gave it. The particularity of the generated RegExp is that it will match the word even if strange Unicode characters are used to write or obfuscate it. The RegExp in question will be placed in a file in the `output` folder.

# Examples

This will create a RegExp that matches the word "lasagna" no matter how it's written, except if it has extra characters between the letters.
```bash
npm start -- lasagna
```

This will create two RegExps to match the words "lasagna" and "eggs" no matter how they are written, **even** if they have extra characters between the letters.
```bash
npm start -- --add-separators lasagna eggs
```
