# 1.环境说明
1. jdk:openjdk 16 [下载地址](http://jdk.java.net/java-se-ri/16)
2. 开发工具IDEA
3. 项目构建工具: maven 3.6.3 [下载地址](https://maven.apache.org/download.cgi)
4. javafx: 16
# 2.pom文件
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>xyz.zhezhi</groupId>
    <artifactId>javafxDemo</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>16</maven.compiler.source>
        <maven.compiler.target>16</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <javafx.version>16</javafx.version>
        <javafx.maven.plugin.version>0.0.6</javafx.maven.plugin.version>
<!--        <exec.mainClass>xyz.zhezhi.HelloFX</exec.mainClass>-->
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.openjfx</groupId>
            <artifactId>javafx-controls</artifactId>
            <version>${javafx.version}</version>
        </dependency>
        <dependency>
            <groupId>org.openjfx</groupId>
            <artifactId>javafx-fxml</artifactId>
            <version>${javafx.version}</version>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.openjfx</groupId>
                <artifactId>javafx-maven-plugin</artifactId>
                <version>${javafx.maven.plugin.version}</version>
                <configuration>
                    <mainClass>xyz.zhezhi.HelloFX</mainClass>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```
# 3.项目结构
![Snipaste_20210505_154335.png](http://119.29.110.184/upload/2021/05/Snipaste_2021-05-05_15-43-35-c1042cf1367b4152939658b98b7f246b.png)
# 4.启动类
```java
package xyz.zhezhi;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;

/**
 * 主启动类,继承javafx.application.Application是JavaFX的开始
 *
 * @Author zhezhi
 * @Date 2021/5/5 14:49
 * @Version 1.0
 **/
public class HelloFX extends Application {
    /**
     * Stage：就是你能看到的整个软件界面（窗口）
     * Scene：就是除了窗口最上面有最大、最小化及关闭按钮那一行及窗口边框外其它的区域（场景）
     * 场景（Scene）是一个窗口（Stage）必不可少的
     */
    @Override
    public void start(Stage stage) throws Exception {
        String javaVersion = System.getProperty("java.version");
        String javafxVersion = System.getProperty("javafx.version");
        // 创建一个标签，用于存放我们的Hello World文本，并设置让它在父容器中居中
        Label label = new Label("hello,java" + javaVersion + "javafx" + javafxVersion);
        /**
         * 三步曲
         */
        // 1、初始化一个场景
        Scene scene = new Scene(new StackPane(label), 640, 480);

        // 2、将场景放入窗口
        stage.setScene(scene);

        // 3、打开窗口
        stage.show();
    }

    public static void main(String[] args) {
        // 启动软件
        launch();
    }
}
```
# 5.重点
高版本jdk 错误: 缺少 JavaFX 运行时组件, 需要使用该组件来运行此应用程序
1. 解决方法一：module-info.java
   创建module-info.java
```java
module xyz.zhezhi {
    requires javafx.controls;
    requires javafx.fxml;
    // 暴露包 xyz.zhezhi 给 javafx 的模块们，使其可以在运行时使用反射访问
    opens xyz.zhezhi to javafx.graphics, javafx.fxml;
}
```
2. 解决方法二：新建一个启动类(不推荐，项目杂乱）
```java
package xyz.zhezhi;

import javafx.application.Application;
/**
 * 
 *
 * @Author zhezhi
 * @Date 2021/5/5 14:49
 * @Version 1.0
 **/
public class Main {
    public static void main(String[] args) {
        // 启动软件
        Application.launch(HelloFX.class,args);
    }
}
参考 [原因分析](https://my.oschina.net/tridays/blog/2222909)
```
