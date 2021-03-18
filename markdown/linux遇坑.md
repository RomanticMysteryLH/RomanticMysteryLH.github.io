## linux遇坑

#### `E: 无法获得锁 /var/lib/apt/lists/lock - open (11 资源临时不可用)`

1. **查找apt相关进程，用命令杀死**

   ```
   ps afx|grep apt
   ```
   ```
   sudo kill -9 PID
   ```
2. **删除锁定文件**

   ```
   sudo rm /var/lib/dpkg/lock
   
   sudo dpkg --configure -a
   
   sudo apt update
   ```

   其中若第二步报错 dpkg frontend is locked，则执行一下步骤

   * 找出保存锁文件的进程

     lsof /var/lib/dpkg/lock-frontend

   * 终止进程

     sudo kill -9 PID

   * 移除锁定并重新配置dpkg

     ```
     sudo rm /var/lib/dpkg/lock-frontend sudo dpkg --configure -a
     
     sudo dpkg --configure -a
     
     sudo apt update
     ```


#### `idea无快捷方式（Ubuntu）`

打开idea创建项目，右上放大镜图标搜索desktop，选择creat desktop ... ，如果安装时没有选择for all users，要勾上creat for all users