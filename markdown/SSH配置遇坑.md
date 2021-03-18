## SSH配置遇坑

#### `免密码登陆出现Permission denied (publickey).`

编辑配置

```
permiRootLogin yes

StrictModes no

pubkeyAuthentication yes

PasswordAuthentication no
```



不要加：

```
allowUsers

RSAAuthentication yes
```

#### `密钥配置好后仍需输入密码`

如上编辑配置，并作如下操作

```
chmod 700 ~/.ssh

chmod 600 ~/.ssh/authorized_keys
```

#### `安装好ssh后找不到~/.ssh`

先执行密钥密钥生成命令即可


```
ssh-keygen -t rsa
```





配置好后还是出现Host key verification failed.

在are you sure to continue connecting时输入yes