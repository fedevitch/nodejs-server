# **Syntax system definition**

## **Structure:**

Structure of test definition is divided into blocks. [Blocks](#heading=h.ta8dfme4yoob) **starts with #**.

Blocks **[#Settings](#heading=h.gdavooh39jdi)** and **[#Given](#heading=h.5j4fbmvqp5g)** are optional.

If **[#Test](#heading=h.at8gtq7j57j3)** block is not explicitly defined the whole input text would be processed as **[#Test](#heading=h.at8gtq7j57j3)** block.

Smallest building block of test definition is **command**.

Commands are defined as **one line** of text written in human language.

All commands have to come under strict rules defined by command template.

## **Blocks:**

### **#Settings**

*is used to define some general behavior for whole test*

##### [commands list](#heading=h.u8kry6sd3afe)

* [Wait](#heading=h.7k36js21gq2g)



##### example
```
#Settings
Wait between operations for 0.5 s
```
### **#Given**

*is used for defining variables*

##### [commands list](#heading=h.quq37h8z84ja)

* [is](#heading=h.qfwcw4pam045)

##### example
```
#Given

a is 1

b is 1.02

s is "abcdefg"

email is "[root@mail.com](mailto:root@mail.com)"
```
### **#Test**

*defines step instructions to be run as test*

Instructions have to be defined as list of steps written in the same order they have to be executed.



##### [commands list](#heading=h.82d1ktcis78t)

* [Click on](#heading=h.us77652zmkp3)

* [Double click on](#heading=h.deqc9qg8kais)

* [Fill with](#heading=h.cr5x8fwwykiu)

* [should be](#heading=h.zdh5qadnep3a)

* [Wait for](#heading=h.23ihasia5q2y)

* [Move mouse to](#heading=Movemouseto)

* [Focus on](#heading=Focuson)

* [Submit](#heading=Submit)

	example
```
#Test

Title should be "Splat"

Click on "Sign Up" button

Fill placeholder "Username" with username

Fill input having id "email" with email

Fill placeholder "Password" with password

Fill placeholder "Enter Password Again" with password

Wait for 1 min

Click on element having id "singup-button"
```
## **Commands:**

### 	**#Settings commands list**

#### **Wait**

##### usage

Wait <condition> for <number> [ms | s | min]

##### example

	Wait between operations for 0.5 s

### **#Given commands list**

#### **is**

##### usage

<var> is <value>

##### example

	a is 1

b is 1.02

s is "abcdefg"

email is "[root@mail.com](mailto:root@mail.com)"

### **#Test commands list**

#### **Click on**

##### usage

Click on <element>

##### example

	Click on "Sign Up" button

#### **Double click on**

##### usage

Double click on <element>

##### example

	Double click on "About" link

#### **Fill with**

##### usage

Fill <element> with <value>

##### example

	Fill placeholder "Username" with “John”

	Fill input having id "email" with email

#### **should be**

##### usage

<value> should be <value>

##### example

	a should be 5

	b should be 1.2

	Title should be "Splat"

#### **Wait for**

##### usage

Wait for <number> [ ms | s | min ]

##### example

	Wait for 1

#### **Move mouse to**

##### usage

Move mouse to <element>

##### example

	Move mouse to link having id "menu-option-about"

	**Focus on**

##### usage

Focus on <element>

##### example

	Focus on input having id "username-field"

### **General commands list**

#### **Element selectors**

**	having id**

usage

[<tag>|element] having id <value>

##### example

	element having id "add-button"

	input having id "username-field"
	
# **Example of test written in human language**
```
#Settings
Wait between operations for 0.5 s

#Given
username is "root"
email is "[root@mail.com](mailto:root@mail.com)"
password is "Testroot1"

#Test
Title should be "Splat"
Click on "Sign Up" button
Fill placeholder "Username" with username
Fill input having id "email" with email
Fill placeholder "Password" with password
Fill placeholder "Enter Password Again" with password
Wait for 1 min
Click on element having id "singup-button"
```
