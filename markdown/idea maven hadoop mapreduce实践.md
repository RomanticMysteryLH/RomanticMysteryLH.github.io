## idea maven hadoop mapreduce实践

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

#### MapReduce 报错 "main" ExitCodeException exitCode=1: chmod

Exception in thread "main" ExitCodeException exitCode=1: chmod: 无法访问"/usr/local/hadoop/tmp/mapred/sanshanxiashi/zhj0307276773657/.sanshanxiashi/job_local276773657_0001": 没有那个文件或目录

**解决方法**：是权限问题，将hadoop安装目录权限递归改为777

![20210321192103.png](https://gitee.com/RomanticMysteryLH/pic/raw/master/img/ilMUhaYVP58qJDZ.png)