## hadoop配置遇坑

#### `namenode无法启动，启动时无报错`

https://blog.csdn.net/bruce_wang_janet/article/details/7251914?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control&dist_request_id=1328603.26715.16150094799361485&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control  参考

查看日志

```
root@lanh-PC:/usr/local/hadoop/hadoop-2.10.0# cd logs/
root@lanh-PC:/usr/local/hadoop/hadoop-2.10.0/logs# view hadoop-root-namenode-lanh-PC.log 
# view之后的名称根据自己的系统确定
```

发现报错:

`Directory /tmp/hadoop-hadoop/dfs/name is in an inconsistent state`

在hadoop安装目录的etc/hadoop/core-site.xml里增加两个属性

```
<property>
<name>dfs.name.dir</name>
<value>/home/hadoop/name/</value> #hadoop的name目录路径 
</property>
<property>
<name>dfs.data.dir</name>
<value>/home/hadoop/data/</value> #hadoop的data目录路径
</property> 
```

之后在hadoop安装目录的bin/下

`hadoop  namenode  -format` 这里注意先要给hadoop配置环境变量

之后重启hadoop即可

hadoop安装目录下

`sbin/start-all.sh`





#### `环境变量配置`

在/etc/profile下添加配置

注意第一行路径跟自己的一样，之后的两个hadoop版本号也要一样

```
HADOOP_HOME=/opt/hadoop-2.6.5
PATH=$HADOOP_HOME/bin:$PATH
CLASSPATH=$HADOOP_HOME/share/hadoop/common/lib/commons-cli-1.2.jar:$HADOOP_HOME/share/hadoop/common/hadoop-common-2.6.5.jar:$HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-client-core-2.6.5.jar:$CLASSPATH
export HADOOP_CLASSPATH=.:$HADOOP_HOME/javabin
```

保存后

`source /etc/profile`立即生效





#### `正确域名`

管理界面：http://localhost:8088

NameNode界面：http://localhost:50070

HDFS NameNode界面：http://localhost:8042