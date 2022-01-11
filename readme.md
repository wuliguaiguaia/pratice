#### 子模块
      
增加子模块：

- git submodule add https://github.com/wuliguaiguaia/mini-vite.git

更新项目内子模块到最新版本：

- git submodule update --init --recursive

更新子模块为远程项目的最新版本：

- git submodule init 在已有子模块的项目中，初始化子模块，在本地生成相关的配置文件
- git submodule update --remote


克隆一个含有子模块的项目：

- git clone xxx.git --recurse-submodules

删除子模块：

- rm -rf 子模块目录 删除子模块目录及源码
- vi .gitmodules 删除项目目录下.gitmodules 文件中子模块相关条目
- vi .git/config 删除配置项中子模块相关条目
- rm .git/module/\* 删除模块下的子模块目录，每个子模块对应一个目录，注意只删除对应的子模块目录即可
- git rm --cached 子模块名称

本项目内推送子模块：

- git push --recurse-submodules=check 本项目 push 时进行 check

  1. 对所有推送都执行检查： git config push.recurseSubmodules check

- git push --recurse-submodules=on-demand
  1. 默认推送所有：git config push.recurseSubmodules on-demand

子模块遍历:

- foreach 命令，能在每一个子模块中运行任意命令

  git submodule foreach 'git stash' ；
  git submodule foreach 'git add .'
  git submodule foreach 'git checkout -b featureA'

[Git 工具 - 子模块](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)
