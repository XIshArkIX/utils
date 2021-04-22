# Some utils that i use

## For now it's only one file, but i believe their count will be incremented

### Structure of code
src - root folder of code  
|---lib - main folder includes files or other directories  
| |---*.ts - files no need to be incapsulated in folders  
| |---dirs - directories of complex script logic  
|---shared - files used across all scripts (types, interfaces, constanses, etc...)  
| |---index.ts - export  
|---index.ts - main export  

### Structure of complex script

JsonLogic - example dir name
|---JsonLogic.ts - file with main logic  
|---*.ts - additional logic  
|---index.ts - export

### Merge requests

If you want to contribute:
1. Fork this repository
2. Create new branch with understandable name
3. Code some code
4. Create merge request
