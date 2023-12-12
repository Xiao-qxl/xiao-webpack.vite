const fs = require('fs');
const path = require('path');

const ignoreExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];
const ignoreDirectory = ['node_modules', 'dist', 'test', 'images', 'JSONs', 'icon'];
const extensions = ['.js', '.vue', '.html', '.css']

function traverseDirectory(dirPath, outputFile) {
  // 遍历目录下的所有文件
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);

      // 判断是否为文件
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Error getting file stats:', err);
          return;
        }

        if (stats.isFile()) {
          const extname = path.extname(file).toLowerCase();
          if (extensions.includes(extname)) {
            // 读取文件内容并写入输出文件
            fs.readFile(filePath, 'utf8', (err, data) => {
              if (err) {
                console.error('Error reading file:', err);
                return;
              }

              fs.appendFile(outputFile, data, (err) => {
                if (err) {
                  console.error('Error writing to output file:', err);
                  return;
                }
              });
            });
          }
        } else if (stats.isDirectory() && !ignoreDirectory.includes(file)) {
          // 如果是子目录，则递归调用遍历函数
          traverseDirectory(filePath, outputFile);
        }
      });
    });
  });
}

// 示例用法:
const directoryPath = 'D:/Vue/时空可视化/geo-spatial/web';
const outputFile = 'D:/Vue_test/Xiao-GitHub/xiao-webpack.vite/export/时空可视化.txt';

traverseDirectory(directoryPath, outputFile);
