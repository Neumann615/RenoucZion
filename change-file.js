import fs from "fs"
import path from "path"
import process from "process"

// // 获取当前目录下所有.txt文件
// fs.readdir('./docs/Vue/images/', (err, files) => {
//     if (err) throw err;
//     console.log(files)
//     files.forEach(file => {
//         console.log(file)
//         // 读取文件内容
//         file = "./docs/Vue/images/"+file
//         fs.readFile(file, 'utf8', (err, data) => {
//             if (err) throw err;
//             //console.log(data)
//             // // 修改文件后缀名为.md
//             const newPath = file.replace('.PNG', '.jpg');
//
//             // 写入新文件
//             fs.writeFile(newPath, data, 'utf8', err => {
//                 if (err) throw err;
//
//                 // 删除原文件
//                 fs.unlink(file, err => {
//                     if (err) throw err;
//                     console.log(`Converted ${file} to ${newPath}`);
//                 });
//             });
//         });
//     });
// });

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