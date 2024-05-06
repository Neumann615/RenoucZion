import fs from "fs"
import path from "path"

// 指定目标目录
const targetDir = './docs/Vue/images';

// 读取目录中的所有文件
fs.readdir(targetDir, (err, files) => {
    if (err) {
        console.error('Error reading directory', err);
        return;
    }

    // 遍历文件并处理
    files.forEach((file) => {
        const oldPath = path.join(targetDir, file);
        // 仅处理.jpg文件
        if (path.extname(oldPath) === '.PNG') {
            const newPath = path.join(targetDir, path.basename(file, '.PNG') + '.png');
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.error('Error renaming file', err);
                } else {
                    console.log('File renamed:', oldPath, '->', newPath);
                }
            });
        }
    });
});