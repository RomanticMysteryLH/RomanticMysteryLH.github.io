# Java学习出现问题及总结

### 基本数据类型

##### **`各种数据类型的默认值`**

1、int类型定义的数组，初始化默认是0

2、String类型定义的数组，默认值是null

3、char类型定义的数组，默认值是0对应的字符

4、double类型定义的数组，默认值是0.0

5、float类型定义的数组，默认值是0.0

### 多线程

##### **`关于线程处于sleep状态无法中断`**

**出现问题：**线程t在sleep状态中时，调用t.interrupt()不能成功将t.isInterrupted()状态标记为true，导致在while循环的判断中，不能构成false条件中断循环。

**解决方案：**在sleep抛出的异常中break，中断循环

```java
public void run() {
		// TODO Auto-generated method stub
		while(t.isAlive()&&!t.isInterrupted()) {
		jf1.setText(jf1.getText()+"1");
		try {
			t.sleep(500);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			break;//发生异常时推出循环，因为在sleep状态中使用t.interrupt时线程不会被标记为interrupted状态    //重要！！！！
			//e.printStackTrace();
		}
	}
}
```
##### **`关于线程的声明和初始化`**

1. 可以在类成员中进行声明

   ```java
   public class LoginWindow extends JFrame implements ActionListener,Runnable{
   	Thread t;
   	public LoginWindow() {
   	}
   ```

   

2. 在使用前进行初始化，需要将this作为参数传入，这里的this指的是这个窗口对象，当把Thread写在main方法或其他位置时，可以把继承了Runnable接口的对象传入。

```java
public class LoginWindow extends JFrame implements ActionListener,Runnable{
	Thread t;
	public LoginWindow() {
		this.setTitle("登录");
		this.setSize(300,200);
		this.setLocation(200, 200);
		this.setLayout(new GridLayout(3,1));
		t=new Thread(this);//this需要作为参数传入
		this.setVisible(true);
	}
```

##### `关于线程的运行`

1. 继承Runnable接口

   ```java
   public class LoginWindow extends JFrame implements ActionListener,Runnable{}
   ```

2. 声明和定义，见 `关于线程的声明和初始化`

3. 在类中重写run方法

   ```java
   @Override
   	public void run() {
   		// TODO Auto-generated method stub	
   		while(t.isAlive()&&!t.isInterrupted()) {
   		jf1.setText(jf1.getText()+"1");
   		try {
   			t.sleep(500);
   		} catch (InterruptedException e) {
   			// TODO Auto-generated catch block
   			break;//发生异常时推出循环，因为在sleep状态中使用t.interrupt时线程不会被标记为interrupted状态    //重要！！！！
   			//e.printStackTrace();
   		}
   	}
   }
   ```

4. 启动/打断，在该类的方法中进行start和interrupt，start方法能够调用线程的run方法

   ```java
   t.start();
   t.interrupt();
   ```

   

### 窗口

##### **`事件监听器的正确用法`**

1. 在类中继承ActionListener接口

   ```java
   public class LoginWindow extends JFrame implements ActionListener,Runnable{}
   ```

2. 导入java.awt.event.ActionEvent和java.awt.event.ActionListener两个包

   ```java
   import java.awt.event.ActionEvent;
   import java.awt.event.ActionListener;
   ```

3. 在addEventListener中将this作为参数传入

   ```java
   jb1.addActionListener(this);//this需要作为参数传入
   ```

4. 在类中重写actionPerformed方法，用e.getSource获得事件源

   ```java
   public void actionPerformed(ActionEvent e) {
   		// TODO Auto-generated method stub
   		if(e.getSource()==jb1) {
   			//this.jf1.setText("登录");
   			t=new Thread(this);//重新创建线程
   			t.start();
   			pw.setText(t.getState()+"");
   			jb2.setEnabled(true);
   			jb1.setEnabled(false);
   		}
   		if(e.getSource()==jb2) {
   			//this.jf1.setText("取消");
   			t.interrupt();
   			pw.setText(t.getState()+"");
   			jb2.setEnabled(false);
   			jb1.setEnabled(true);
   		}
   	}
   ```

   

##### `设置布局的方式`

​	需要在setLayout方法中new 一个新的布局方式

```java
this.setLayout(new GridLayout(3,1));
```

### 输入输出流

##### `字节文件输入流`

1. 可以创建File变量，写入文件路径

   ```java
   File file1=new File("H:\\test.txt");
   ```

2. 创建输入流/文件输入流，将文件或路径作为参数传入

   ```java
   InputStream f = null;
   f = new FileInputStream(file1);
   ```

3. 定义BufferedReader变量，将InputStreamReader(f)作为参数传入，同时将FileInputStream()作为参数传入InputStreamReader()，把文件内容一次性存入BufferedReader对象。

   ```java
   BufferedReader in=new BufferedReader(new InputStreamReader(f));
   ```

4. 定义字符串，从bufferedReader中读行，使用while循环输出，同时判断是否读到最后一行，需要注意的是（inputLine=inlreadLine()）！=null需要整个放入while循环的判断条件

   ```java
   String inputLine;
   			while((inputLine=in.readLine())!=null) {
   				//如果把inputLine=readLine()放在while外面，则会一直输出第一行
   				System.out.println(inputLine);
   			}
   ```

5. 关闭输入流

   ```java
   in.close();
   ```

6. **总结**：还需要异常处理

   完整代码：

   ```java
   public static void main(String args[]) {
   	File file1=new File("H:\\test.txt");
   	InputStream f = null;
   	try {
   		f = new FileInputStream(file1);
   		BufferedReader in=new BufferedReader(new InputStreamReader(f));
   		String inputLine;
   		while((inputLine=in.readLine())!=null) {
   			//如果把inputLine=readLine()放在while外面，则会一直输出第一行
   			System.out.println(inputLine);
   		}
   		in.close();
   	} catch (Exception e) {
   		// TODO Auto-generated catch block
   		e.printStackTrace();
   	}
   }
   ```

##### **`字节文件输出流`**

1、2同文件输入，需要文件名、new FileOutputStream fout=FileOutputStream(File file)或(String name)或(String name, boolean append)和BufferedWriter(字符串之类的也行)

fout.write(str)或write(char数组)各种都行

最后close()

### 继承与多态

##### `上转型和下转型`

1. 上转型：将子类的引用赋值给父类，比如人的子类是学生，一个学生可以是人，但是一个人不能是学生，因此可以定义一个人=学生

   ```java
   Person p=new Student();//正确
   Student s=new Person();//错误
   ```

2. 下转型：必须是将上转型后的变量进行下转型，类似于取消上转型

   ```java
   Person p=new Student();//上转型
   Student t=Student(p);//下转型，需要强制类型转换
   ```

3. 上转型对象的特点：

   1. 上转型对象不能操作子类新增加的成员变量，**不能使用子类新增的方法**。
   2. 上转型对象可以操作子类**继承或隐藏的成员变量**，也可以使用子类**继承的或重写**的方法。
   3. 上转型对象调用方法时，就是调用子类继承和重写过的方法。
   4. 可以将对象的上转型对象再**强制转换**到一个子类对象，强制转换过的对象具有子类所有属性和功能。

##### **`对象初始化顺序`**

**在初始化时，执行顺序总结：**父类与子类相比，父类优先，静态成员与实例成员相比，静态成员优先；变量与构造方法相比，变量优先；默认值与赋初值相比，默认值优先。 

当初始化一个成员时，会**先调用其父类构造函数**，再执行自己的构造函数。

##### **`方法调用的优先顺序`**

一般的，子类对象调用子类的成员，父类对象调用父类的成员。但**对于上转型对象**，调用**成员变量和静态方法**时，调用的是**父类**的，因此叫隐藏成员变量和静态方法；调用**实例方法**时，调用的是**子类**的，因此叫覆盖实例方法。如果**直接使用成员变量**，调用的是父类的；如果**在子类对象的实例方法中使用成员变量**，调用的是子类的。

在子父类中，方法调用的优先级依次为 this.show(obj) 、super.show(obj)、this.show((super) obj)、super.show((super) obj)

有代码：

```java
class A{
    public String show(D obj){
        return ("A and D");
    }
    public String show(A obj){
        return ("A and A");
    }
    public String show(C obj){
        return ("A and C");
    }
}
class B{
    public String show(B obj){
        return ("B and B");
    }
    public String show(A obj){
        return ("B and A");
    }
    public String show(C obj){
        return ("B and C");
    }
}
public class Test{
    public static void main(String []args){
        A a1=new A();
        A a2=new B();
        B b=new B();
        System.out.println(a1.show(b));
        System.out.println(a2.show(b));
    }
}
```

**输出结果将为：**

A and A

B and A

**解释：**

对于第一个结果，由于A类中没有show(B obj)方法，而且它没有父类，故他会**调用第3个优先级**，即调用方法show(A obj)，很容易得出上面的结果。

对于第二个结果，a2.show(b)，a2是一个引用变量，类型为A，则this为a2，b是B的一个实例，于是它**到A里面找show(B obj)方法**，没有找到，于是到A的super里找，而A没有super类，因此转到**第三优先级this.show((super) obj)**，this仍然是a2，这里obj为B，(super)obj 即(super) B即A，因此它到A里面找show(A obj)方法，类A有这个方法，但是由于a2是类B的一个对象，**B覆盖了A的show(A obj)**方法，因此最终锁定到类B的show(A obj)，输出为“B and A"。

