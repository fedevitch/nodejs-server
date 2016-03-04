# **Syntax system definition**

## **Structure:**

Structure of test definition is divided into blocks. [Blocks](#blocks) **starts with #**.

Blocks **[#Settings](#settings)** and **[#Given](#given)** are optional.

If **[#Test](#test)** block is not explicitly defined the whole input text would be processed as **[#Test](#test)** block.

Smallest building block of test definition is **command**.

Commands are defined as **one line** of text written in human language.

All commands have to come under strict rules defined by command template.

## **Blocks:**

### **#Settings**

*is used to define some general behavior for whole test*

##### commands list

* [Wait](#wait)



##### example
```
#Settings
Wait between operations for 0.5 s
```
### **#Given**

*is used for defining variables*

##### commands list

* [is](#is)

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



##### commands list

* [Click on](#click-on)

* [Double click on](#double-click-on)

* [Fill with](#fill-with)

* [should be](#should-be)

* [Wait for](#wait-for)

* [Move mouse to](#move-mouse-to)

* [Focus on](#focus-on)

* [Submit](#submit)

* [Press key](#press-key)

* [RadioGroup select](#radiogroup-select)

* [Dropdown select](#dropdown-select)

* [Property should be](#property-should-be)

* [Wait on response](#wait-on-response)

* [Check regex](#check-regex)

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
Click on element having id "signup-button"
```
## **Commands:**

### 	**#Settings commands list**

### 	**Wait**

##### 		usage
```
Wait <condition> for <number> [ms | s | min]
```
#####  		example
```
Wait between operations for 0.5 s
```
### **#Given commands list**

#### **is**

##### 	usage
```
<var> is <value>
```
##### example
```
a is 1
b is 1.02
s is "abcdefg"
email is "[root@mail.com](mailto:root@mail.com)"
```
### **#Test commands list**

#### **Click on**

*simulates click event on given* \<element\>

##### usage
```
Click on <element>
```
##### example
```
Click on "Sign Up" button
```
#### **Double click on**

*simulates double click event on given* \<element\>

##### usage
```
Double click on <element>
```
##### example
```
Double click on "About" link
```
#### **Fill with**

*sets value of input field to given* \<value\>

##### usage
```
Fill <element> with <value>
```
##### example
```
Fill placeholder "Username" with “John”
Fill input having id "email" with email
```
#### **should be**

*asserts that two values are equal*

##### usage
```
<value> should be <value>
```
##### example
```
a should be 5
b should be 1.2
Title should be "Splat"
```

#### **Wait for**

*pause for given* \<number\> *of milliseconds / second / minutes*

##### usage

```
Wait for <number> [ ms | s | min ]
```

##### example

```
Wait for 1
```

#### **Move mouse to**

##### usage

```
Move mouse to <element>
```

##### example

```
Move mouse to link having id "menu-option-about"
```

#### **Focus on**

*sets focus on* \<element\>
##### usage

```
Focus on <element>
```

##### example

```
Focus on input having id "username-field"
```

#### **Submit**

*submits given* \<element\>
##### usage

```
Submit <element>
```

##### example

```
Submit form having id “user-login”
```

#### **Press key**
*simulates key press event*
##### usage
```
Press key <key>
```
##### example
```
Press key “Ctrl”
Press key “A”
```

#### **RadioGroup select**
*selects an option from radio-button group*
##### usage
```
RadioGroup <name> select <value>
```
##### example
```
RadioGroup "switch" select "on"
RadioGroup "switch" select "off"
```

### **Dropdown select**
*selects value from dropdown list*
##### usage
```
Dropdown <name> select <value>
```
##### example
```
Dropdown "fruits" select "apple"
Dropdown "fruits" select "lemon"
```

### **Property should be**
*check if property of element has expected value*
##### usage
```
 <element> <property> Property should be <value>
```
##### example
```
"button1" "value" Property should be "Click me!"
"placeholder-image" "style" Property should be "width:220px;height:280px;"
```

### **Wait on response**
*waits a* \<number\> *of milliseconds / second / minutes while all ajax requests return response*
##### usage
```
 Wait on response <number> [ ms | s | min ]
```
##### example
```
 Wait on response 500
```

### **Check regex**
*Check if value in* \<element\> *matches given* \<regex\>
##### usage
```
<element> Check regex <regex>
```
##### example
```
"textBox1" Check regex ":^[A-Z0-9+_.-]+@[A-Z0-9.-]+$"
```




### **General commands list**

#### **Element selectors**

##### **having id**

**usage**

```
[<tag>|element] having id <value>
```

##### example

```
element having id "add-button"
input having id "username-field"
```

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
