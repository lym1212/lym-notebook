# Git命令
## 配置用户名和邮箱

```shell
git config --global user.name "lym1212"
git config --global user.email "1026910224@qq.com"
```

## 初始化

```shell
git init
```

## 连接

```shell
git remote add origin git@github.com:lym1212/lym-notebook.git
```

## 提交

```shell
# 添加所有修改文件到暂存区
git add .

# 提交到本地仓库
git commit -m 'xxxxxxxxxxxxxxx'

# 提交到远程仓库
# 第一次提交 -u 后面可以直接 git push
# -u 是 set-upstream 缩写命名. 第一次是设置远程上游关联
git push -u origin master

# 查看本地仓库状态
git status

# 查看所有分支
git branch -a

# 切换分支
git checkout xxx

# 强制提交
git push -f
```

