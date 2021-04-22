import * as path from 'path';
import * as fs from 'fs';
import 'colors';

const isNode = () => process.argv[0].endsWith('.exe');

const options = {
  dir: process.cwd(),
  strToFind: '',
  verbose: false,
  debug: false
};

const prepareOptions = (args: Array<string>) => {
  let result: null | RegExpExecArray;
  args.forEach((arg) => {
    if (arg.startsWith('--')) {
      if ((result = /--(\w+)=(.+)/gsu.exec(arg)) !== null) {
        const key = result[1] as keyof typeof options;
        switch (key) {
          case 'dir':
            options[key] = path.resolve(
              process.cwd(),
              result[2]
            );
            break;
          case 'verbose':
            options[key] = result[2] === 'true' ? true : false;
            break;
          case 'debug':
            options[key] = result[2] === 'true' ? true : false;
            break;
          default:
            break;
        }
      }
    }
    else {
      options['strToFind'] = arg;
    }
  });
}

const findFileByContext = () => {
  let dir = options.dir;
  let files: Array<string> = [];
  let result: Array<string> = [];
  const regex = new RegExp(`^(\\d+)\\..+(${options.strToFind})`, 'miu');
  const regex1 = new RegExp(options.strToFind);

  function recursiveDirScan(dirName: string) {
    const scanned = fs.readdirSync(dirName, { withFileTypes: true });
    scanned.forEach((fsDirEnt) => {
      const file = path.resolve(dirName, fsDirEnt.name);

      if (options.verbose) {
        console.log(`Scanning ${file.grey}`);
      }

      if (fsDirEnt.isDirectory()) {
        recursiveDirScan(file);
      }
      else if (fsDirEnt.isFile()) {
        files.push(file);
      }
    });
  }
  recursiveDirScan(dir);

  if (options.verbose) {
    console.log(`Total files: ${String(files.length).bgRed.black}. Scanning their content...`);
  }

  files.forEach((fileName) => {
    const fileContent = fs.readFileSync(fileName).toString();
    let sought: null | RegExpExecArray;
    if (regex1.test(fileContent)) {
      const fc = fileContent
        .split('\n')
        .map((line, i) => `${i + 1}. ${line}`)
        .join('\n')
        ;

      sought = regex.exec(fc);

      if (options.debug) {
        console.log(sought);
      }

      if (!sought) {
        return;
      }

      const foundElement = sought[0].replace(/^\d+\./, '');
      const foundFullStr =  `${fileName.bgBlack.gray}:` +
                            `${sought[1].bgBlack.gray}\n${'|-'.red}` +
                            `${
                              (foundElement.length > 25
                                ? '...' +
                                  foundElement.substring(
                                    foundElement.indexOf(options.strToFind) - 10,
                                    foundElement.indexOf(options.strToFind) + options.strToFind.length + 10
                                  )
                                : foundElement
                              ).green
                            }`;

      result.push(foundFullStr);
      if (options.verbose) {
        console.log('\n' + foundFullStr);
      }
    }
  });

  return { result, files };  
};

const help = () =>
  console.log(
    `Quick example: ${isNode() ? '' : 'ts-'}node findFileByContext.${isNode() ? 'j' : 't'}s "Some string i wanted to be in file"\n\
    \t--dir=dirName\t- find by context in specific folder`
  );

if (process.argv.length <= 2) {
  help();
  process.exit(-1);
}

const args = process.argv.slice(2);

prepareOptions(args);

const { result, files } = findFileByContext();

if (!options.verbose) {
  console.log('\n' + result.join('\n\n'));
  console.log(
    `\nFind ${String(result.length).bgRed.black} elements affecting ${String(files.length).bgRed.black} files.`
  );
}
