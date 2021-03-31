## WordCountAndLen Hadoop程序改写

https://blog.csdn.net/dingqiu6346/article/details/101190943?dist_request_id=1328740.15410.16168513587054147&depth_1-

#### 单词长度记录

先写WordCountAndLen，发现Writable并没有参数，把<WordCountAndLen>删去

```java
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.*;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.Writable;
import org.apache.hadoop.io.WritableComparable;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import java.io.DataInput;
import java.io.DataOutput;
import java.io.IOException;
import java.util.StringTokenizer;

public class WordCountAndLen implements Writable {
  private IntWritable count;
  private IntWritable length;
  *//**构造方法*
  public WordCountAndLen (){
     set(new IntWritable(), new IntWritable());
  }
  *//**构造方法*
  public WordCountAndLen (IntWritable *count*, IntWritable *length*){
     set(count, length);
  }
  *//**接收**int**型数据进行构造*
  public WordCountAndLen (int *count*, int *length*){
     set(new IntWritable(count), new IntWritable(length));
  }
  *//set**方法*
  public void set(IntWritable *count*, IntWritable *length*){
     this. count = count;

    this. length = length;

  }

  *//get**方法*

  public IntWritable getCount(){
     return count;
  }
 
  *//get**方法*
  public IntWritable getLength(){
     return length;
  }
 

  *//**重载序列化方法*
  @Override
  public void write(DataOutput *out*) throws IOException{
     count.write(out);
     length.write(out);
  }

  *//**重载反序列化方法*
  @Override
  public void readFields(DataInput *in*) throws IOException{
     count.readFields(in);
     length.readFields(in);
  }
  @Override
  public String toString() {
     return count +"\t"+ length;
  }
 }
```

![image-20210331210553485](https://gitee.com/RomanticMysteryLH/pic/raw/master/img/image-20210331210553485.png)

Writable没有参数，而WritableComparable<T>有参数T

​	`Hadoop为Key的数据类型必须实现WritableComparable，而Value的数据类型只需要实现Writable即可，能用做Key值的一定可以用做Value值，但是能做Value值的未必能用来做Key值。`

**@Override注释报错**

![image-20210331210650314](https://gitee.com/RomanticMysteryLH/pic/raw/master/img/image-20210331210650314.png)

在project structure里Modules里的java版本号，让idea的纠错识别java 8的写法

![image-20210331211225257](https://gitee.com/RomanticMysteryLH/pic/raw/master/img/image-20210331211225257.png)

**改写MyMapper类**，继承Mapper的输出参数为WordCountAndLen，

增加length储存长度，用word.getLength()获取Text类的word的长度，创建WordCountAndLen实例，write到context中

![image-20210331211258069](https://gitee.com/RomanticMysteryLH/pic/raw/master/img/image-20210331211258069.png)

**改写MyReducer类**，继承Ruducer类，输入和输出参数均为WordCountAndLen类

，reduce方法的迭代器为WordCountAndLen类型，遍历时使用WordCountAndLen的getCount和getLength方法获取个数和长度，创建新的WordCountAndLen对象，写入context

**运行，发现程序执行完成时退出的code值为1**，程序执行有问题，但却没有报错，再各行代码执行处加入输出语句进行debug

![image-20210331211424954](https://gitee.com/RomanticMysteryLH/pic/raw/master/img/image-20210331211424954.png)

发现在map方法的length获取位置之后就无法输出了，应该是length获取的问题

![image-20210331211437216](https://gitee.com/RomanticMysteryLH/pic/raw/master/img/image-20210331211437216.png)

把itr.nextToken()换成word，可以成功获取，应该是因为itr.nextToken()获取的是下一个单词的长度了。

修改后，程序成功执行

![image-20210331211502567](https://gitee.com/RomanticMysteryLH/pic/raw/master/img/image-20210331211502567.png)



**删除文件，创建新文件进行测试**，上传

![image-20210331211535833](https://gitee.com/RomanticMysteryLH/pic/raw/master/img/image-20210331211535833.png)

上传时报错：

**org.apache.hadoop.fs.ChecksumException: Checksum error**

查找发现，Hadoop客户端将本地文件cheap_all上传到hdfs上时，hadoop会通过fs.FSInputChecker判断需要上传的文件是否存在.crc校验文件。如果存在.crc校验文件，则会进行校验。如果校验失败，自然不会上传该文件。

删除后成功上传

![image-20210331211610764](https://gitee.com/RomanticMysteryLH/pic/raw/master/img/image-20210331211610764.png)

执行成功

![image-20210331211641908](https://gitee.com/RomanticMysteryLH/pic/raw/master/img/image-20210331211641908.png)

测试通过

![image-20210331211655685](https://gitee.com/RomanticMysteryLH/pic/raw/master/img/image-20210331211655685.png)

参考文章https://blog.csdn.net/bitcarmanlee/article/details/50969025

