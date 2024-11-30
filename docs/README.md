---
layout: home
permalink: index.html

# Please update this with your repository name and title
repository-name: e20-co227-MONA-Dashboard
---

[comment]: # "This is the standard layout for the project, but you can clean this and use your own template"

# **MONA Dashboard**

---

<!--
This is a sample image, to show how to add images to your page. To learn more options, please refer [this](https://projects.ce.pdn.ac.lk/docs/faq/how-to-add-an-image/)
 -->

![Logo](./images/logo.png)

## Table of Contents

1. [Introduction](#introduction)
2. [Overview](#overview)
3. [Key Features](#key-features)
4. [Software Architecture](#software-architecture)
5. [Dashboard Views](#dashboard-views)
6. [User Manual](#user-manual)
7. [Team](#team)
8. [Links](#links)


---
## **Introduction**

The Mona Dashboard project addresses the production challenges of factories manufacturing plastic toys using molds. In such operations, one of the most common problems is parts getting stuck in the molds, which disrupts production and impacts efficiency. This challenge becomes even more critical when managing 24 machines producing 10 different types of products.

To address this challenge, we have developed a complete real-time production monitoring system. The system will provide live updates on machine performance, send emergency alerts in cases of issues such as stuck parts, and maintain a historical record of production data. It allows operators to quickly react to production issues, minimizing line downtime and increasing overall productivity. This dashboard is an important step in optimizing production processes for smoother operations in the factory.



## **Overview**

Our project focuses on developing an advanced real-time monitoring dashboard tailored for a production environment. This dashboard aims to enhance the efficiency and reliability of production processes by providing critical insights and timely alerts. Our system is designed with user-friendliness, ensuring that operators and managers can easily access and interpret the data they need to maintain optimal production performance.
The dashboard is a centralized interface designed to provide real-time insights into machine performance and production progress, along with tools for managing settings and reviewing historical data. It is divided into the following key tabs:

## **Key Features**

#### Real-Time Monitoring of Mold Machines:
The Machine Status tab serves as the heart of the dashboard, where users can:
+ **Monitor Real-Time Machine Performance**: It shows the current state of all 24 machines, enabling quick identification of any issues or inefficiencies.
+ **Visual Status Indicators**: Machines are color-coded (Green, Red, Blue, Gray) to reflect their operational state at a glance:
+ **Green (Active)**: Machines are running smoothly and contributing to production.
+ **Red (Emergency)**: Machines have encountered an issue, such as a blockage, and need immediate attention.
+ **Blue (Idle)**: Machines are powered on but are not actively producing.
+ **Gray (Off)**: Machines are completely powered down.
+ **Comprehensive Machine Metrics**: Key performance metrics are displayed for each machine, such as the number of slots successfully completed, failures, and the percentage of target achieved.

#### Production Progress Monitoring:
This tab focuses on visualizing production efficiency and tracking output:
+ **Production Rates**: Provides detailed metrics on the production of toy parts or complete toys over time.
+ **Performance Trends**: Graphical visualizations (e.g., line charts or bar graphs) make it easy to identify patterns or bottlenecks in the production process.
+ **Goal Monitoring**: Displays how close each machine or the entire production line is to meeting its targets.


#### Historical Production Data:
The Production History tab acts as an archive, storing and organizing data from previous production runs:
+ **Historical Insights**: Users can access data from past shifts, weeks, or months to analyze performance trends.
+ **Detailed Records**: Includes specifics such as total production, success and failure rates, and machine activity logs.
+ **Decision-Making Support**: Historical data helps identify patterns, allowing for more informed decisions about machine usage, maintenance schedules, and productivity strategies.

#### Settings:
The Settings page is a utility tab for administrative and configuration purposes:
+ **Machine Management**: Administrators can update machine names, assign production tasks, and adjust target goals for machines.
+ **User Security**: Includes options for resetting passwords to maintain system security and ensure that only authorized personnel have access to critical dashboard features.
+ **System Customization**: Users may be able to tweak preferences, such as notifications or report frequency, depending on the system's configuration.

## **Software Architecture**

![Software Architecture](./images/softwareArch.png)

## **Dashboard Views**

#### ***Machine Status Page View***
The Machine Status tab offers a comprehensive view of the live status of all 24 machines.
![Status Page](./images/status/statuspage.jpg)

#### **Expanding the Dashboard Views**

***Active Machine Status***-
Machine is working perfectly!
<p align="center">
<img src="./images/status/greenMachine.jpg" alt="active machine">
</p>

***Emergency Machine Status***-
There is a stuck particle in the machine.
<p align="center">
<img src="./images/status/redmachine.jpg" alt="emergency machine">
</p>

***Inactive Machine Status***-
Machine is OFF.
<p align="center">
<img src="./images/status/ashMachine.jpg" alt="inactive machine">

</p>

***Idle Machine Status***-
Machine is ON but not making products.
<p align="center">
<img src="./images/status/bluemachine.jpg" alt="idle machine">
</p>

<p align="center">
<img src="./images/status/description.png" alt="info">
<br>
<em>(See user manual for more details)</em>
</p>



#### ***Production Rate/Progress Page View***
The Production Progress Tab in the Mold section provides detailed monitoring of hourly slot rates across 24 machines. Below are the key elements of a machine block in this view:

<p align="center">
<img src="./images/progress/mold.png" alt="ProgressPage-machine" />
<br>
<strong>Production progress and rates by Mold</strong>
</p>

<p align="center">
<img src="./images/progress/description.png" alt="info">
<br>
<em>(See user manual for more details)</em>
</p>
The Production Progress section provides an overview of all products and their production status. Here's how it works:
<p align="center">
<img src="./images/progress/product.png" alt="ProgressPage-product" />
<br>
<strong>Production progress and rates by Products and parts</strong>
</p>
<p align="center">
<img src="./images/progress/product_des.png" alt="info">
<br>
<em>(See user manual for more details)</em>
</p>

Example Workflow:
- Select a Product: On the dashboard, click on any product card (e.g., "Product 3").
- View Details: A modal pops up with detailed information about the 12 parts of the selected product, including production time and progress for each part.
- Analyze Progress: Use this information to monitor and manage the production efficiency of specific parts within the product.


#### ***Production Summary Page View***
The Production History tab allows users to explore and analyze detailed production metrics for products, parts, and machines. By default, the Product Summary view is displayed when the tab is opened. This section provides options to navigate between Product Summary, Part Summary, and Machine Summary.


<p align="center">
<img src="./images/summary/product.png" alt="Summary Page-product" />
<br>
<strong>Product Summary View</strong>
</p>

<p align="center">
<img src="./images/summary/part.png" alt="Summary Page-part" />
<br>
<strong>Part Summary View</strong>
</p>

<p align="center">
<img src="./images/summary/machine.png" alt="Summary Page-machine" />
<br>
<strong>Machine Summary View</strong>
</p>

<p align="center">
<em>(See user manual for more details)</em>
</p>




#### ***Setting Page View***

User can change the password and machine details by verifying the password as desired.
<p align="center">
<img src="./images/setting/machine.png" alt="Setting Page-machine details" />
<br>
<strong>Changing Machnine Details</strong>
</p>
<p align="center">
<img src="./images/setting/password.png" alt="Setting Page- password" />
<br>
<strong>Changing Password</strong>
</p>

<p align="center">
<em>(See user manual for more details)</em>
</p>


## **User Manual**
- [Click Here to Download the User Manual](https://drive.google.com/file/d/1OQaTvS8Ffn3QKi3v4_H6W8KU7Qow8z3c/view)
<p align="center">
  <img src="./images/QR.png" alt="qr" width="200" />
  <br>
  <em>(Scan Here to Download the User Manual)</em>
</p>


## **Team**

- E/20/361, Yohan Senadheera, [e20361@eng.pdn.ac.lk](mailto:e20361@eng.pdn.ac.lk)
- E/20/378, Amanda Siriwardhane, [e20378@eng.pdn.ac.lk](mailto:e20378@eng.pdn.ac.lk)
- E/20/366, Bhagya Senevirathna, [e20366@eng.pdn.ac.lk](mailto:e20366@eng.pdn.ac.lk)
- E/20/024, Buddhika Ariyarathna , [e20024@engdn.ac.lk](mailto:e20024@eng.pdn.ac.lk)
- E/20/089, Yasiru Harinda, [e20089@engdn.ac.lk](mailto:e20089@eng.pdn.ac.lk)

## **Links**
- [Project Repository](https://github.com/cepdnaclk/{{ page.repository-name }}){:target="\_blank"}
- [Project Page](https://cepdnaclk.github.io/{{ page.repository-name}}){:target="\_blank"}
- [Department of Computer Engineering](http://www.ce.pdn.ac.lk/)
- [University of Peradeniya](https://eng.pdn.ac.lk/)





[//]: # "Please refer this to learn more about Markdown syntax"
[//]: # "https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
