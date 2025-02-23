# 🔐 IoT Cybersecurity Scanner

## 🚀 Overview

The **IoT Cybersecurity Scanner** is a powerful tool designed to identify vulnerabilities in IoT devices. With the increasing number of connected devices, security is a major concern. This scanner helps secure IoT networks by detecting weaknesses before attackers exploit them.

## 📊 Sequence diagram

In order to explain the way that components are interacting between them, we create a sequence diagram:
![Sequence diagram](./Diagrama%20de%20secventa.svg)

## 🎯 Features

- 🔍 **Vulnerability Detection** – Scan IoT devices for known security flaws.
- 📡 **Network Monitoring** – Identify unauthorized devices on your network.
- ⚡ **Real-Time Alerts** – Get notified about potential security risks.
- 📊 **Detailed Reports** – Generate comprehensive security analysis.
- 🌐 **Scanning the Home Network** – Identify IoT devices connected to your home network.
- 🔎 **Running Security Scanners** – Utilize tools like OpenVAS and ZAP to assess vulnerabilities.
- 🧠 **Enriching Data with LLM** – Enhance collected information using large language models.
- ❌ **Device Management** – Offer the ability to disconnect devices from WLAN.
- 📱 **User-Friendly Interfaces** – Develop web interface for accessibility.

## 📖 Explanations

What we aim to achieve:

- ✅ **Security Assessment:** Identify and fix vulnerabilities before they are exploited.
- 🏗 **Better IoT Defense:** Improve security measures for connected devices.
- 🔗 **Network Integrity:** Ensure only authorized devices are operating.
- 📡 **Threat Intelligence:** Detect suspicious behavior and prevent attacks.
- 🤖 **Automated Scanning:** Run periodic security checks with minimal effort.

## Keycloak usage

### Only if you want to test locally - you need to do it only once because I added *.db files in GitIgnore
In order to deploy locally Keycloak for test, use the following command in the keycloak directory:
- for Linux:
```
bin/kc.sh start-dev
```
- for Windows:
```
bin\kc.bat start-dev
```

After this, access localhost:8080, create an admin account and when you are logged in, create another realm from the up-right corner. 
After its creation, use **Realm Settings** in Login tab, permit all from **Login screen customization** and **Email as username** from 
Email settings.

Also in **Realm Settings**, modify Display Name like this 
```
<div class="kc-logo-text"></div>
```

This will render in auth pages our logo.

After this the application

## 💻 How to Contribute

Follow these steps to contribute to the project:

1. **Clone the repository** 🛠️

   ```bash
   git clone <repository_url>
   ```

2. **Create a new branch for your task** 🌱

   ```bash
   git checkout -b <task_number_partOfTheProject_new_branch>
   ```
   **Example:**
   ```bash
   git checkout -b 101-frontend-addScanList
   ```
   **⚠️ Note:** Use hyphens (`-`) instead of underscores (`_`) in branch names. This ensures better compatibility with GitHub and other tools.

3. **Add modified files** 📂

   ```bash
   git add .
   ```

4. **Commit changes with a descriptive message** 📝

   ```bash
   git commit -m "<describe_the_task_resolved>"
   ```

5. **Push the branch to the repository** 🚀

   ```bash
   git push -u origin <task_number_partOfTheProject_new_branch>
   ```
