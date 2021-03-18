## idea maven hadoop遇坑

#### idea创建maven项目后，配置pom.xml报错找不到包

**解决方式：**左上File > settings > Build,Execution,Deployment > importing > automatically download中勾选sources和documentation

之后apply，刷新maven项目（pom文件右上应该出现一个小的刷新图标）

#### 运行java文件报错Permission denied

报错详情，在mkdir和create操作

```
permission denied : user=lanh,acess=WRITE, incode="/dataset":root :supergroup:drwxr-xr-x
```

**解决方式：**修改hdfs-site.xml，增加

```
<property>
<name>dfs.permissions</name>
<value>false</value>
```

需要重启hadoop

#### xxxxx(权限不够)

首先修改提示目录的权限chmod 777 xxx

如果还是报错

查看文件所有者，修改权限或所有者