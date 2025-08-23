pnpm i
运行lib2 pnpm build

保留lib1的 dist 文件 实在是打包复现不出来 把原来的包复制了一部分过来

目前不知道什么原因 查到了大概位置
把`lib1/dist/api/editorApi.js` `EditorApi`的`insertImage`去掉打包就是正常的可以注射了打包看看
然后保留这个导致引入了imageNode 然后在lib2 中引入lib1打包 就会出现`external_react_["default"]`


