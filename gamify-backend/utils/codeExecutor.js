const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

function executeCode(language, code, input) {
  return new Promise((resolve, reject) => {
    const fileId = uuidv4();
    let filePath, command;

    switch (language.toLowerCase()) {
      case "python":
        filePath = path.join(__dirname, `${fileId}.py`);
        fs.writeFileSync(filePath, code);
        command = `python "${filePath}"`;
        break;

      case "c":
        filePath = path.join(__dirname, `${fileId}.c`);
        fs.writeFileSync(filePath, code);
        command = `gcc "${filePath}" -o "${filePath}.out" && "${filePath}.out"`;
        break;

      case "cpp":
        filePath = path.join(__dirname, `${fileId}.cpp`);
        fs.writeFileSync(filePath, code);
        command = `g++ "${filePath}" -o "${filePath}.out" && "${filePath}.out"`;
        break;

      case "java":
        filePath = path.join(__dirname, `${fileId}.java`);
        fs.writeFileSync(filePath, code);
        command = `javac "${filePath}" && java -cp "${__dirname}" ${fileId}`;
        break;

      case "javascript":
      case "js":
        filePath = path.join(__dirname, `${fileId}.js`);
        fs.writeFileSync(filePath, code);
        command = `node "${filePath}"`;
        break;

      default:
        return reject(new Error("Unsupported language"));
    }

    const child = exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
      // Cleanup generated files
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        if (fs.existsSync(`${filePath}.out`)) fs.unlinkSync(`${filePath}.out`);
        if (fs.existsSync(path.join(__dirname, `${fileId}.class`)))
          fs.unlinkSync(path.join(__dirname, `${fileId}.class`));
      } catch (e) {
        // ignore cleanup errors
      }

      if (error) {
        return reject(new Error(stderr || error.message));
      }
      resolve(stdout);
    });

    if (input) {
      child.stdin.write(input);
      child.stdin.end();
    }
  });
}

module.exports = { executeCode };
