# 🐧 Ubuntu Linux & DevOps Command Master Guide

> **Note:** Compiled from personal class/YouTube learning notes and expanded with essential production commands for **Ubuntu Linux & DevOps**.

---

## 📑 Table of Contents
1. [Navigation & Directory Listing](#1-navigation--directory-listing)
2. [Files, Directories & Links](#2-files-directories--links)
3. [File Viewing & Text Editors](#3-file-viewing--text-editors)
4. [Search, Filtering & Log Analysis (DevOps Core)](#4-search-filtering--log-analysis-devops-core)
5. [Users & Group Management](#5-users--group-management)
6. [Permissions, Ownership & ACL](#6-permissions-ownership--acl)
7. [Package Management (`apt`)](#7-package-management-apt)
8. [Process & Resource Monitoring](#8-process--resource-monitoring)
9. [System Services (`systemd`) & Logs](#9-system-services-systemd--logs)
10. [Environment Variables & Shell Utilities](#10-environment-variables--shell-utilities)
11. [Networking, SSH & File Transfer (DevOps Core)](#11-networking-ssh--file-transfer-devops-core)
12. [Archiving & Compression](#12-archiving--compression)
13. [Bash Scripting Essentials](#13-bash-scripting-essentials)
14. [WSL (Windows Subsystem for Linux)](#14-wsl-windows-subsystem-for-linux)

---

## 1. Navigation & Directory Listing

| Command | Description | Example |
| :--- | :--- | :--- |
| `pwd` | Print working directory (shows current path). | `pwd` |
| `cd <dir>` | Change directory to the specified path. | `cd /var/www/html` |
| `cd ..` | Go up one parent directory. | `cd ..` |
| `cd ../..` | Go up two parent directories. | `cd ../..` |
| `cd ~` or `cd` | Go directly to the current user's home directory. | `cd ~` |
| `cd -` | Switch back to the previous directory. | `cd -` |
| `ls` | List files and folders in the current directory. | `ls` |
| `ls -l` | Long listing format (permissions, owner, size, date). | `ls -l` |
| `ls -a` | List all files including hidden files (starting with `.`). | `ls -a` |
| `ls -la` | Detailed list of all files including hidden ones. | `ls -la` |
| `ls -lh` | Long listing with human-readable file sizes (KB, MB, GB). | `ls -lh` |
| `ls -lt` | List files sorted by modification time (newest first). | `ls -lt` |
| `ls -R` | Recursively list all subdirectories and their contents. | `ls -R` |
| `ls -ld <dir>` | Show details/permissions of the directory itself, not its contents. | `ls -ld /home/pathan` |
| `tree` *(Extra)* | Display directory structure in a tree format. | `tree -L 2` |

---

## 2. Files, Directories & Links

| Command | Description | Example |
| :--- | :--- | :--- |
| `mkdir <dir>` | Create a new directory. | `mkdir projects` |
| `mkdir -p <path>` | Create nested parent directories if they don't exist. | `mkdir -p projects/app/src` |
| `mkdir -v <dir>` | Create directory with verbose output (prints action). | `mkdir -v logs` |
| `touch <file>` | Create an empty file or update file timestamp. | `touch notes.txt` |
| `cp <src> <dest>` | Copy a file from source to destination. | `cp file.txt backup.txt` |
| `cp -r <src> <dest>` | Recursively copy an entire directory and its contents. | `cp -r app/ app_backup/` |
| `mv <src> <dest>` | Move a file/folder or rename it. | `mv old.txt new.txt` |
| `rm <file>` | Remove (delete) a file. | `rm file.txt` |
| `rm -r <dir>` | Recursively delete a directory and its contents. | `rm -r old_folder/` |
| `rm -rf <dir>` | Forcefully and recursively delete without confirmation (use carefully). | `rm -rf temp_build/` |
| `rmdir <dir>` | Remove an empty directory only. | `rmdir empty_folder` |
| `ln <target> <link>` | Create a **hard link** (shares same inode/data). | `ln a.txt hard_a.txt` |
| `ln -s <target> <link>` | Create a **soft (symbolic) link** (shortcut pointer). | `ln -s /var/log/nginx log_link` |
| `diff <file1> <file2>` | Compare two files line by line and show differences. | `diff a.txt b.txt` |

---

## 3. File Viewing & Text Editors

| Command | Description | Example |
| :--- | :--- | :--- |
| `cat <file>` | Print entire file contents to the terminal. | `cat notes.txt` |
| `cat -n <file>` | Print file contents with line numbers. | `cat -n app.log` |
| `zcat <file.gz>` | View contents of a compressed `.gz` file without extracting. | `zcat syslog.2.gz` |
| `less <file>` | View large files page by page (press `q` to quit, `/` to search). | `less server.log` |
| `more <file>` | View file contents one screen at a time. | `more notes.txt` |
| `head <file>` | Show the first 10 lines of a file (default). | `head app.log` |
| `head -n <N> <file>` | Show the first `N` lines of a file. | `head -n 20 app.log` |
| `tail <file>` | Show the last 10 lines of a file (default). | `tail app.log` |
| `tail -n <N> <file>` | Show the last `N` lines of a file. | `tail -n 50 app.log` |
| `tail -f <file>` | Follow live log updates in real time. | `tail -f /var/log/nginx/access.log` |
| `echo "text" > <file>` | Write text to a file (**overwrites** existing content). | `echo "Hello World" > a.txt` |
| `echo "text" >> <file>` | Append text to the end of a file (**preserves** existing content). | `echo "New line" >> a.txt` |
| `tee <file>` | Print output to terminal AND save to a file simultaneously. | `ls -l \| tee output.txt` |
| `tee -a <file>` | Print output to terminal AND append to a file. | `echo "Log" \| tee -a app.log` |
| `vim <file>` | Open file in Vim terminal editor (`i` to insert, `Esc` then `:wq` to save & quit, `:q!` to force quit). | `vim index.html` |
| `nano <file>` | Open file in beginner-friendly terminal editor (`Ctrl+O` save, `Ctrl+X` exit). | `nano config.env` |
| `gedit <file>` | Open file in Ubuntu GUI text editor (Desktop only). | `gedit notes.txt` |

---

## 4. Search, Filtering & Log Analysis (DevOps Core)

| Command | Description | Example |
| :--- | :--- | :--- |
| `grep '<pattern>' <file>` | Search for a matching text pattern in a file. | `grep 'ERROR' server.log` |
| `grep -i '<pattern>' <file>` | Case-insensitive search. | `grep -i 'info' app.log` |
| `grep -n '<pattern>' <file>` | Show matching lines along with their line numbers. | `grep -n 'error' app.log` |
| `grep -c '<pattern>' <file>` | Count the number of matching lines. | `grep -c 'ERROR' app.log` |
| `grep -v '<pattern>' <file>` | Invert match (show lines that do **not** match). | `grep -v 'DEBUG' app.log` |
| `grep -o '<pattern>' <file>` | Print only the matched part of a line, not the whole line. | `grep -o 'error' server.log` |
| `grep -E '<regex>' <file>` | Search using Extended Regular Expressions (multiple patterns). | `grep -E 'ERROR\|WARN' app.log` |
| `grep -R '<pattern>' <dir>` | Recursively search for text inside all files in a directory. | `grep -R 'DB_HOST' /etc/` |
| `find <path> -name '<name>'` | Find files/directories by name. | `find . -name '*.txt'` |
| `find <path> -type f -size +100M` *(Extra)* | Find files larger than 100MB (great for disk cleanup). | `find /var -type f -size +100M` |
| `wc <file>` | Count lines, words, and bytes in a file. | `wc a.txt` |
| `wc -l <file>` | Count total number of lines in a file. | `wc -l server.log` |
| `sort <file>` | Sort lines alphabetically. | `sort names.txt` |
| `sort -r <file>` | Sort lines in reverse order. | `sort -r names.txt` |
| `sort -n <file>` | Sort numerically. | `sort -n numbers.txt` |
| `sort -k2 -n <file>` | Sort numerically based on the 2nd column. | `sort -k2 -n data.txt` |
| `uniq` | Remove adjacent duplicate lines (usually used after `sort`). | `sort a.txt \| uniq` |
| `uniq -c` | Count occurrences of each unique line. | `sort a.txt \| uniq -c` |
| `cut -d '<delim>' -f <col>` | Extract specific columns using a delimiter. | `cut -d ':' -f 1 /etc/passwd` |
| `awk '{print $1, $3}' <file>` | Print specific space-separated columns from structured text/logs. | `awk '{print $1, $3}' app.log` |
| `awk '/INFO/ {print $1, $2}' <file>` | Filter lines matching `/INFO/` and print columns 1 & 2. | `awk '/INFO/ {print $1, $2}' app.log` |
| `awk '/INFO/ {count++} END {print count}'` | Count pattern occurrences and print summary at the end. | `awk '/INFO/ {c++} END {print c}' app.log` |
| `awk 'NR>=10 && NR<=20'` | Print lines between line number 10 and 20. | `awk 'NR>=10 && NR<=20' app.log` |
| `sed 's/old/new/g' <file>` | Replace all occurrences of `old` with `new` (preview in terminal). | `sed 's/ERROR/OK/g' server.log` |
| `sed -i 's/old/new/g' <file>` | Replace text **in-place** (permanently modifies the file). | `sed -i 's/foo/bar/g' config.txt` |
| `sed -i.bak 's/old/new/g' <file>` | Modify file in-place while creating a `.bak` backup file. | `sed -i.bak 's/80/8080/g' app.conf` |
| `sed -n '11,20p' <file>` | Print only lines 11 to 20 from a file. | `sed -n '11,20p' server.log` |

---

## 5. Users & Group Management

| Command | Description | Example |
| :--- | :--- | :--- |
| `whoami` | Display the currently logged-in username. | `whoami` |
| `id <user>` | Show User ID (UID), Primary Group ID (GID), and all groups. | `id pathan` |
| `who` / `w` | Show who is currently logged into the system and what they are doing. | `who` |
| `sudo adduser <user>` | Interactive command to create a user with home directory & password. | `sudo adduser pathan` |
| `sudo useradd -m <user>` | Low-level command to create a user and their `/home/<user>` directory (`-m`). | `sudo useradd -m rohan` |
| `sudo useradd -m -s /bin/bash <user>` | Create user with home directory and default Bash shell. | `sudo useradd -m -s /bin/bash ali` |
| `sudo mkhomedir_helper <user>` | Create a home directory later if `useradd` was run without `-m`. | `sudo mkhomedir_helper rohan` |
| `sudo passwd <user>` | Set or change password for a user. | `sudo passwd pathan` |
| `sudo passwd -S <user>` | Check password status of a user (Locked/Password set). | `sudo passwd -S pathan` |
| `sudo chage -l <user>` | View password expiration and aging information. | `sudo chage -l pathan` |
| `sudo usermod -aG <group> <user>` | **Append** user to a supplementary group (`-aG` keeps existing groups). | `sudo usermod -aG sudo pathan` |
| `sudo usermod -G <group> <user>` | Overwrite user's supplementary groups (removes from other groups!). | `sudo usermod -G developers ali` |
| `sudo usermod -G "" <user>` | Remove user from all supplementary groups. | `sudo usermod -G "" ali` |
| `sudo usermod -s <shell> <user>` | Change user's default login shell (e.g., `/bin/bash` or `/sbin/nologin`). | `sudo usermod -s /bin/bash rohan` |
| `sudo usermod -m -d <new_home> <user>` | Move and update a user's home directory path. | `sudo usermod -m -d /home/new ali` |
| `sudo userdel <user>` | Delete user account (keeps `/home/<user>` files). | `sudo userdel pathan` |
| `sudo userdel -r <user>` | Delete user account AND remove their home directory & mail spool. | `sudo userdel -r pathan` |
| `sudo groupadd <group>` | Create a new user group. | `sudo groupadd developers` |
| `sudo groupdel <group>` | Delete an existing group. | `sudo groupdel developers` |
| `sudo gpasswd -d <user> <group>` | Remove a specific user from a specific group. | `sudo gpasswd -d ali developers` |
| `groups <user>` | List all groups a user belongs to. | `groups rohan` |
| `getent passwd <user>` | Fetch user account details from `/etc/passwd`. | `getent passwd pathan` |
| `getent group <group>` | Fetch group details and members from `/etc/group`. | `getent group developers` |
| `su - <user>` | Switch user with a clean login environment. | `su - pathan` |
| `sudo -i` / `sudo su` | Switch to the `root` superuser shell. | `sudo -i` |

---

## 6. Permissions, Ownership & ACL

> **Permission Values:** `r` (Read) = `4`, `w` (Write) = `2`, `x` (Execute) = `1`  
> **Positions:** `Owner (u)` | `Group (g)` | `Others (o)` — e.g., `755` = `rwxr-xr-x`

| Command | Description | Example |
| :--- | :--- | :--- |
| `chmod 755 <file>` | Set `rwx` for owner, `r-x` for group & others (standard for scripts/dirs). | `chmod 755 script.sh` |
| `chmod 750 <file>` | Set `rwx` for owner, `r-x` for group, and `---` (no access) for others. | `chmod 750 app.sh` |
| `chmod 644 <file>` | Set `rw-` for owner, `r--` for group & others (standard for text/config files). | `chmod 644 index.html` |
| `chmod +x <file>` | Add execute (`x`) permission for everyone. | `chmod +x deploy.sh` |
| `chmod u+x <file>` | Add execute (`x`) permission for the owner (`u`) only. | `chmod u+x script.sh` |
| `chmod g+w <dir>` | Add write (`w`) permission for the group (`g`). | `chmod g+w shared_folder/` |
| `chmod -R 755 <dir>` | Recursively change permissions for a directory and all contents. | `chmod -R 755 /var/www/html` |
| `sudo chown <user> <file>` | Change the file/directory owner. | `sudo chown lovish app.py` |
| `sudo chown <user>:<group> <dir>` | Change both owner and group simultaneously. | `sudo chown -R www-data:www-data /var/www` |
| `sudo chgrp <group> <file>` | Change the group ownership of a file or directory. | `sudo chgrp developers project/` |
| `getfacl <file>` | View Access Control List (ACL) permissions of a file/folder. | `getfacl a.txt` |
| `sudo setfacl -m u:<user>:rwx <file>` | Grant custom permissions to a specific user using ACL. | `sudo setfacl -m u:rahim:rw a.txt` |
| `sudo setfacl -x u:<user> <file>` | Remove ACL permission for a specific user. | `sudo setfacl -x u:rahim a.txt` |

---

## 7. Package Management (`apt`)

| Command | Description | Example |
| :--- | :--- | :--- |
| `sudo apt update` | Refresh local package index list from Ubuntu repositories. | `sudo apt update` |
| `sudo apt upgrade` | Install available updates for all installed packages. | `sudo apt upgrade -y` |
| `sudo apt install <pkg>` | Install a new software package. | `sudo apt install nginx` |
| `sudo apt remove <pkg>` | Uninstall a package (keeps configuration files). | `sudo apt remove apache2` |
| `sudo apt purge <pkg>` | Completely remove a package **including** all configuration files. | `sudo apt purge apache2` |
| `sudo apt autoremove` *(Extra)* | Remove unused dependencies left behind by uninstalled packages. | `sudo apt autoremove` |
| `apt show <pkg>` | Display detailed information (version, size, dependencies) of a package. | `apt show nginx` |
| `apt list --installed` | List all packages currently installed on the system. | `apt list --installed` |
| `apt search <keyword>` *(Extra)* | Search repositories for a package by name or description. | `apt search docker` |

---

## 8. Process & Resource Monitoring

| Command | Description | Example |
| :--- | :--- | :--- |
| `ps` | Show processes running in the current terminal session. | `ps` |
| `ps aux` | List all running processes across all users with CPU/RAM usage. | `ps aux` |
| `ps aux \| grep <name>` | Filter running processes to find a specific app and its PID. | `ps aux \| grep nginx` |
| `top` | Interactive real-time process and resource monitor (`q` to quit). | `top` |
| `htop` | Enhanced, colorful interactive process viewer (`F10` or `q` to quit). | `htop` |
| `kill <PID>` | Gracefully terminate a process by its Process ID (SIGTERM `15`). | `kill 1234` |
| `kill -9 <PID>` | Forcefully kill an unresponsive process immediately (SIGKILL `9`). | `kill -9 1234` |
| `pkill <name>` | Kill processes by name instead of PID. | `pkill python` |
| `fuser <file/port>` | Identify which process ID is using a file, directory, or port. | `fuser -v /var/log/syslog` |
| `<command> &` | Run a command in the background. | `python3 server.py &` |
| `jobs` / `fg` / `bg` *(Extra)* | List background jobs (`jobs`), bring to foreground (`fg`), or resume in background (`bg`). | `fg %1` |
| `nohup <cmd> &` | Run a process immune to terminal hangups/logout (writes to `nohup.out`). | `nohup ./backup.sh &` |
| `df -h` | Show disk space usage of mounted filesystems in human-readable format. | `df -h` |
| `du -sh <dir>` | Show total disk size of a specific folder. | `du -sh /var/log/` |
| `du -la <dir>` | Show disk usage of all individual files and subdirectories. | `du -la project/` |
| `free -h` | Display system RAM and Swap memory usage. | `free -h` |
| `vmstat` / `vmstat -a` | Report virtual memory, CPU, and active/inactive memory statistics. | `vmstat -a` |
| `uptime` | Show how long the system has been running and load averages. | `uptime` |
| `uname -a` | Display Linux kernel version, hostname, and architecture info. | `uname -a` |
| `lsblk` / `lscpu` *(Extra)* | List block storage devices/partitions (`lsblk`) and CPU info (`lscpu`). | `lsblk` |
| `date` | Show or set the system date and time. | `date` |
| `sudo reboot` | Restart the Ubuntu server/machine immediately. | `sudo reboot` |
| `sudo shutdown -h now` | Power off the system immediately. | `sudo shutdown -h now` |

---

## 9. System Services (`systemd`) & Logs

| Command | Description | Example |
| :--- | :--- | :--- |
| `sudo systemctl status <svc>` | Check if a service is active, running, or failed. | `sudo systemctl status nginx` |
| `sudo systemctl start <svc>` | Start a stopped service. | `sudo systemctl start nginx` |
| `sudo systemctl stop <svc>` | Stop a running service. | `sudo systemctl stop nginx` |
| `sudo systemctl restart <svc>` | Restart a service (stops then starts). | `sudo systemctl restart nginx` |
| `sudo systemctl reload <svc>` | Reload configuration files without dropping active connections. | `sudo systemctl reload nginx` |
| `sudo systemctl enable <svc>` | Enable a service to start automatically at system boot. | `sudo systemctl enable docker` |
| `sudo systemctl disable <svc>` | Disable a service from starting at boot. | `sudo systemctl disable apache2` |
| `sudo journalctl -u <svc>` *(Extra)* | View systemd logs for a specific service. | `sudo journalctl -u nginx -f` |
| `crontab -e` / `crontab -l` *(Extra)* | Edit (`-e`) or list (`-l`) scheduled cron jobs for automation. | `crontab -l` |

---

## 10. Environment Variables & Shell Utilities

| Command | Description | Example |
| :--- | :--- | :--- |
| `echo $HOME` | Print current user's home directory path. | `echo $HOME` |
| `echo $SHELL` | Print current default shell path (e.g., `/bin/bash`). | `echo $SHELL` |
| `echo $PATH` | Print directories where the shell searches for executable commands. | `echo $PATH` |
| `printenv` / `env` | Display all active environment variables. | `printenv` |
| `var="value"` | Create a local shell variable (lost when session ends). | `name="pathan"` |
| `export VAR="value"` | Set an environment variable available to child processes. | `export FRIEND="arafat"` |
| `export PATH="$PATH:<dir>"` | Append a custom script folder to the system `PATH`. | `export PATH="$PATH:/home/harry/bin"` |
| `source ~/.bashrc` | Reload `.bashrc` changes immediately without logging out. | `source ~/.bashrc` |
| `which <cmd>` | Show the exact binary path of a command. | `which python3` |
| `man <cmd>` | Open the official manual page for a command. | `man ls` |
| `<cmd> --help` | Display a quick summary of flags and usage options. | `uniq --help` |
| `history` | View previously executed terminal commands. | `history` |
| `clear` or `Ctrl + L` | Clear the terminal screen. | `clear` |
| `script <file>` | Record all terminal commands and output into a log file (`exit` to stop). | `script -a session.log` |
| `exit` | Close the current shell or log out of a switched/SSH session. | `exit` |

---

## 11. Networking, SSH & File Transfer (DevOps Core)

| Command | Description | Example |
| :--- | :--- | :--- |
| `ssh <user>@<ip>` | Securely connect to a remote Linux server. | `ssh ali@192.168.1.10` |
| `ssh -i <key.pem> <user>@<ip>` *(Extra)* | Connect to cloud servers (AWS EC2, etc.) using a private key. | `ssh -i mykey.pem ubuntu@3.110.45.12` |
| `scp <file> <user>@<ip>:<path>` *(Extra)* | Securely copy files between local machine and remote server over SSH. | `scp app.zip ubuntu@10.0.0.5:/tmp/` |
| `rsync -avz <src> <dest>` *(Extra)* | Fast incremental file/folder synchronization (local or remote). | `rsync -avz ./dist/ ubuntu@10.0.0.5:/var/www/` |
| `curl <url>` | Fetch data from a URL or test REST APIs in the terminal. | `curl https://api.github.com` |
| `curl -I <url>` | Fetch only the HTTP response headers (check status codes like `200 OK`). | `curl -I https://example.com` |
| `curl -o <file> <url>` | Download a file/JSON from a URL and save it with a custom name. | `curl -o data.json https://api.example.com/users` |
| `wget <url>` | Download files directly from the web via CLI. | `wget https://example.com/main.zip` |
| `ip a` *(Extra)* | Show network interfaces and assigned IP addresses. | `ip a` |
| `ss -tulpn` *(Extra)* | Show all active listening TCP/UDP ports and associated processes. | `ss -tulpn` |
| `ping -c 4 <host>` *(Extra)* | Test network connectivity and latency to a host. | `ping -c 4 google.com` |
| `sudo ufw status` / `allow` *(Extra)* | Check Ubuntu firewall status or open a port. | `sudo ufw allow 80/tcp` |

---

## 12. Archiving & Compression

| Command | Description | Example |
| :--- | :--- | :--- |
| `unzip <file.zip>` | Extract a `.zip` archive (install via `sudo apt install unzip`). | `unzip main.zip` |
| `zip -r <out.zip> <dir>` *(Extra)* | Compress a folder into a `.zip` archive. | `zip -r backup.zip project/` |
| `tar -czvf <out.tar.gz> <dir>` *(Extra)* | Create a compressed `.tar.gz` archive (Linux standard). | `tar -czvf logs.tar.gz /var/log/nginx/` |
| `tar -xzvf <file.tar.gz>` *(Extra)* | Extract a `.tar.gz` archive. | `tar -xzvf logs.tar.gz` |

---

## 13. Bash Scripting Essentials

| Concept / Syntax | Description | Example |
| :--- | :--- | :--- |
| `#!/bin/bash` | **Shebang** line at the top of a `.sh` script specifying the interpreter. | `#!/bin/bash` |
| `declare -i <var>=<num>` | Declare an integer variable (by default Bash treats variables as strings). | `declare -i age=25` |
| `readonly <var>=<val>` | Create a constant variable that cannot be modified or unset. | `readonly PI=3.14` |
| `unset <var>` | Delete/clear a shell variable. | `unset name` |
| `x=$(command)` | **Command Substitution**: capture command output into a variable. | `files=$(ls)` |
| `read -p "Prompt: " var` | Take interactive user input from the terminal. | `read -p "Enter name: " name` |
| `(( arithmetic ))` | Perform integer arithmetic comparisons and calculations. | `sum=$((a + b))` |
| `if [ -e <file> ]; then ... fi` | Conditional check (e.g., `-e` exists, `-f` file, `-d` directory). | `if [ -e app.log ]; then echo "Exists"; fi` |
| `if (( ... )); then ... elif ... else ... fi` | Numeric conditional branching in Bash. | `if (( val > 100 )); then echo "Big"; fi` |
| `for ((i=0; i<10; i++)); do ... done` | C-style `for` loop in Bash. | `for ((i=0; i<5; i++)); do echo $i; done` |
| `myFunc() { ... }` | Define and call a reusable Bash function. | `greet() { echo "Hi $1"; }; greet Ali` |
| `$0`, `$1`, `$2`, `$#`, `$@` | Positional arguments: `$0` = script name, `$1` = 1st arg, `$#` = arg count. | `./deploy.sh prod v1.2` |

---

## 14. WSL (Windows Subsystem for Linux)

| Command | Description | Example |
| :--- | :--- | :--- |
| `wsl --list --online` | List available Linux distributions that can be installed on Windows. | `wsl --list --online` |
| `wsl --install -d Ubuntu` | Install Ubuntu on Windows via WSL. | `wsl --install -d Ubuntu` |
| `wsl -l -v` *(Extra)* | Check installed WSL distributions and their WSL version (1 or 2). | `wsl -l -v` |