# 🐧 Ubuntu Linux & DevOps Master Learning Notes

> **About This Guide:** A complete, step-by-step reference manual for **Ubuntu Linux & DevOps Engineering**. Synthesized from classroom lectures, lab assignments, and production server workflows—designed as a progressive learning roadmap from basic navigation to automated log forensics and server administration.

---

## 🗺️ Step-by-Step Learning Roadmap

| Phase | Module | Focus Area |
| :--- | :--- | :--- |
| **Phase 1: Foundations** | [1. Navigation & Workspace Setup](#1-navigation--workspace-setup) | Moving through the Linux filesystem & inspecting directory trees |
| | [2. File, Directory & Link Operations](#2-file-directory--link-operations) | Creating, copying, moving, deleting, and linking files |
| | [3. File Viewing & Terminal Editors](#3-file-viewing--terminal-editors) | Reading logs, I/O redirection (`>`, `>>`), and editing with `vim`/`nano` |
| **Phase 2: Data & Log Forensics** | [4. Text Processing, Regex & Pipelines](#4-text-processing-regex--pipelines) | Filtering, counting, sorting, and transforming data (`grep`, `cut`, `awk`, `sed`) |
| | [5. DevOps Log Detective Cookbook](#5-devops-log-detective-cookbook) | Real-world multi-command pipelines for server & security incident investigation |
| **Phase 3: System Administration** | [6. Users & Group Management](#6-users--group-management) | Account lifecycle, `sudo` privileges, and group policies |
| | [7. Permissions, Ownership & ACL](#7-permissions-ownership--acl) | Read/Write/Execute modes (`chmod`), ownership (`chown`), and ACLs |
| | [8. Software & Package Management (`apt`)](#8-software--package-management-apt) | Installing, updating, and purging Ubuntu packages |
| **Phase 4: Operations & Monitoring** | [9. Process & Resource Monitoring](#9-process--resource-monitoring) | CPU, RAM, disk health, and process signals (`ps`, `top`, `kill`, `df`) |
| | [10. System Services (`systemd`) & Cron](#10-system-services-systemd--cron) | Managing background daemons (`systemctl`), journal logs, and scheduled jobs |
| | [11. Environment & Shell Configuration](#11-environment--shell-configuration) | `$PATH`, `.bashrc`, session recording, and manual lookups |
| **Phase 5: Networking & Automation** | [12. Networking, SSH & Remote Transfer](#12-networking-ssh--remote-transfer) | Remote server access (`ssh`), secure copy (`scp`/`rsync`), APIs (`curl`), and firewall |
| | [13. Archiving & Compression](#13-archiving--compression) | Packaging and extracting `.tar.gz` and `.zip` archives |
| | [14. Bash Scripting Essentials](#14-bash-scripting-essentials) | Variables, conditionals, loops, functions, and CLI arguments |
| | [15. WSL (Windows Subsystem for Linux)](#15-wsl-windows-subsystem-for-linux) | Running and managing Ubuntu on Windows |

---

## Phase 1: Foundations

### 1. Navigation & Workspace Setup

| Command | Description | Example |
| :--- | :--- | :--- |
| `pwd` | Print working directory (displays your exact current path). | `pwd` |
| `cd <dir>` | Change directory to a relative or absolute path. | `cd /var/www/html` |
| `cd ..` | Move up one parent directory. | `cd ..` |
| `cd ../..` | Move up two parent directories. | `cd ../..` |
| `cd ~` or `cd` | Return immediately to the current user's home directory (`/home/<user>`). | `cd ~` |
| `cd -` | Toggle back to the previous working directory. | `cd -` |
| `ls` | List visible files and folders in the current directory. | `ls` |
| `ls -l` | Long listing format (permissions, owner, group, size, timestamp). | `ls -l` |
| `ls -a` | List all entries including hidden dotfiles (starting with `.`). | `ls -a` |
| `ls -la` | Detailed long listing of all files including hidden ones. | `ls -la` |
| `ls -lh` | Long listing with human-readable file sizes (`KB`, `MB`, `GB`). | `ls -lh` |
| `ls -lt` | List files sorted by modification time (newest first). | `ls -lt` |
| `ls -R` | Recursively list all subdirectories and their contents. | `ls -R` |
| `ls -ld <dir>` | Inspect permissions and metadata of a directory itself, not its contents. | `ls -ld /home/pathan` |
| `tree` *(Extra)* | Visualize directory hierarchy in a clean tree layout. | `tree -L 2` |

---

### 2. File, Directory & Link Operations

| Command | Description | Example |
| :--- | :--- | :--- |
| `mkdir <dir>` | Create a single new directory. | `mkdir projects` |
| `mkdir <dir1> <dir2>` | Create multiple directories at once in the current path. | `mkdir logs reports` |
| `mkdir -p <path>` | Create nested parent directories automatically if they do not exist. | `mkdir -p projects/app/src` |
| `mkdir -v <dir>` | Create a directory with verbose output confirming each step. | `mkdir -v logs` |
| `touch <file>` | Create an empty file or update the timestamp of an existing file. | `touch notes.txt` |
| `cp <src> <dest>` | Copy a file from source to destination. | `cp ~/Downloads/server.log ./logs/` |
| `cp -r <src> <dest>` | Recursively copy an entire directory and all its contents. | `cp -r app/ app_backup/` |
| `mv <src> <dest>` | Move a file/directory to a new path or rename it in place. | `mv old.txt new.txt` |
| `rm <file>` | Remove (permanently delete) a file. | `rm file.txt` |
| `rm -r <dir>` | Recursively delete a directory and everything inside it. | `rm -r old_folder/` |
| `rm -rf <dir>` | Forcefully and recursively delete without prompts *(use with extreme caution)*. | `rm -rf temp_build/` |
| `rmdir <dir>` | Remove an empty directory only (fails if files exist inside). | `rmdir empty_folder` |
| `ln <target> <link>` | Create a **hard link** pointing directly to the same file inode/data. | `ln a.txt hard_a.txt` |
| `ln -s <target> <link>` | Create a **soft (symbolic) link** acting as a shortcut pointer. | `ln -s /var/log/nginx log_link` |
| `diff <file1> <file2>` | Compare two files line by line and highlight differences. | `diff a.txt b.txt` |

---

### 3. File Viewing & Terminal Editors

| Command | Description | Example |
| :--- | :--- | :--- |
| `cat <file>` | Print entire file contents directly to the terminal. | `cat reports/modules.txt` |
| `cat -n <file>` | Print file contents prefixed with line numbers. | `cat -n app.log` |
| `zcat <file.gz>` | Read a compressed `.gz` log file without extracting it first. | `zcat syslog.2.gz` |
| `less <file>` | Paginate through large files (`Space` next page, `/word` search, `q` quit). | `less logs/server.log` |
| `more <file>` | View file contents one screen at a time. | `more notes.txt` |
| `head <file>` | Display the first 10 lines of a file (default). | `head logs/server.log` |
| `head -n <N> <file>` | Display the first `N` lines of a file. | `head -n 5 logs/server.log` |
| `tail <file>` | Display the last 10 lines of a file (default). | `tail logs/server.log` |
| `tail -n <N> <file>` | Display the last `N` lines of a file. | `tail -n 5 logs/server.log` |
| `tail -f <file>` | Stream live log entries in real time as they are written. | `tail -f /var/log/nginx/access.log` |
| `echo "text" > <file>` | Redirect output into a file (**overwrites** existing file content). | `echo "Hello World" > a.txt` |
| `echo "text" >> <file>` | Append output to the end of a file (**preserves** existing content). | `echo "New entry" >> a.txt` |
| `echo -e "text"` | Enable backslash escape sequences (e.g., `\n` for newline, `\t` for tab). | `echo -e "api 246\nauth 155" > modules.txt` |
| `tee <file>` | Print output to the terminal AND write it to a file simultaneously. | `ls -l | tee output.txt` |
| `tee -a <file>` | Print output to the terminal AND append it to a file. | `echo "Log" | tee -a app.log` |
| `vim <file>` | Edit files in Vim (`i` insert mode, `Esc` command mode, `:wq` save & quit, `:q!` quit without saving). | `vim index.html` |
| `nano <file>` | Edit files in Nano (`Ctrl+O` save, `Enter` confirm, `Ctrl+X` exit). | `nano config.env` |
| `gedit <file>` | Open file in Ubuntu Desktop's GUI text editor. | `gedit notes.txt` |

---

## Phase 2: Data & Log Forensics

### 4. Text Processing, Regex & Pipelines

| Command | Description | Example |
| :--- | :--- | :--- |
| `grep '<pattern>' <file>` | Search for lines matching a specific text or regex pattern. | `grep 'ERROR' server.log` |
| `grep -i '<pattern>' <file>` | Perform a case-insensitive search. | `grep -i 'info' app.log` |
| `grep -n '<pattern>' <file>` | Prefix each matching line with its exact line number in the file. | `grep -n 'ERROR' server.log` |
| `grep -c '<pattern>' <file>` | Count the total number of lines matching the pattern. | `grep -c 'ERROR' server.log` |
| `grep -v '<pattern>' <file>` | Invert match (output lines that do **not** match the pattern). | `grep -v 'DEBUG' app.log` |
| `grep -o '<pattern>' <file>` | Print only the exact matched substring rather than the full line. | `grep -o 'error' server.log` |
| `grep -E '<regex>' <file>` | Search using Extended Regular Expressions (alternation `|`, grouping, etc.). | `grep -E 'ERROR|FATAL' server.log` |
| `grep -R '<pattern>' <dir>` | Recursively search all files inside a directory tree. | `grep -R 'DB_HOST' /etc/` |
| `grep '^<pattern>' <file>` | **Start-of-line anchor (`^`)**: match lines beginning with `<pattern>`. | `grep '^2026-03-03 08:' server.log` |
| `grep '<pattern>$' <file>` | **End-of-line anchor (`$`)**: match lines ending with `<pattern>`. | `grep 'timeout$' server.log` |
| `grep '\[text\]' <file>` | **Escaping special regex characters (`\`)**: match literal brackets `[ ]`. | `grep '\[database\]' server.log` |
| `find <path> -name '<glob>'` | Locate files or directories matching a name pattern. | `find . -name '*.log'` |
| `find <path> -type f -size +100M` *(Extra)* | Find files larger than 100MB to troubleshoot full disks. | `find /var -type f -size +100M` |
| `wc <file>` | Print line count, word count, and byte count of a file. | `wc logs/server.log` |
| `wc -l <file>` | Count total lines (frequently piped after `grep` to count matches). | `wc -l logs/server.log` |
| `wc -w <file>` | Count total words in a file. | `wc -w logs/server.log` |
| `wc -m <file>` | Count total characters in a file. | `wc -m logs/server.log` |
| `cut -d '<delim>' -f <N>` | Split each line by delimiter `<delim>` and extract field(s) `<N>`. | `cut -d ' ' -f3 server.log` |
| `cut -d '<delim>' -f <N-M>` | Extract a range of fields (e.g., fields 1 through 2). | `cut -d ' ' -f1-2 server.log` |
| `sort <file>` | Sort lines alphabetically (A–Z). | `sort names.txt` |
| `sort -r <file>` | Sort lines in reverse order (Z–A). | `sort -r names.txt` |
| `sort -n <file>` | Sort lines numerically (by numeric value, not string order). | `sort -n counts.txt` |
| `sort -nr <file>` | Sort lines numerically in descending order (highest first). | `sort -nr counts.txt` |
| `sort -k<N>,<N>nr <file>` | Sort numerically descending using column `<N>` as the sort key. | `sort -k2,2nr reports/modules.txt` |
| `uniq` | Filter out adjacent duplicate lines *(must be sorted first)*. | `sort a.txt | uniq` |
| `uniq -c` | Collapse adjacent duplicates and prefix each line with its frequency count. | `sort a.txt | uniq -c` |
| `awk '{print $1, $3}' <file>` | Extract and format specific whitespace-delimited columns. | `awk '{print $1, $3}' app.log` |
| `awk '/INFO/ {print $1, $2}' <file>` | Filter rows matching `/INFO/` and print columns 1 and 2. | `awk '/INFO/ {print $1, $2}' app.log` |
| `awk '/INFO/ {c++} END {print c}'` | Accumulate pattern matches and print the total summary at EOF. | `awk '/INFO/ {c++} END {print c}' app.log` |
| `awk 'NR>=10 && NR<=20'` | Print records strictly between line numbers 10 and 20. | `awk 'NR>=10 && NR<=20' app.log` |
| `sed 's/old/new/g' <file>` | Stream-replace all occurrences of `old` with `new` (non-destructive preview). | `sed 's/ERROR/OK/g' server.log` |
| `sed -i 's/old/new/g' <file>` | Replace text **in-place** (permanently modifies the target file). | `sed -i 's/ERROR/CRITICAL/g' errors.log` |
| `sed -i.bak 's/old/new/g' <file>` | Modify file in-place while saving a `.bak` backup of the original. | `sed -i.bak 's/80/8080/g' nginx.conf` |
| `sed -n '11,20p' <file>` | Suppress default output (`-n`) and print only lines 11 through 20. | `sed -n '11,20p' server.log` |

---

### 5. DevOps Log Detective Cookbook

Real-world command pipelines (`|`) used to diagnose production server incidents and security breaches:

| Investigation Goal | Pipeline Command | How It Works |
| :--- | :--- | :--- |
| **1. Log Time Span** | `head -n 1 server.log \| cut -d' ' -f1-2` | Extracts the exact date and timestamp of the very first (or `tail -n 1` for last) event. |
| **2. Log Level Frequency** | `cut -d' ' -f3 server.log \| sort \| uniq -c \| sort -nr` | Extracts column 3 (log level), sorts, counts unique occurrences, and ranks highest to lowest. |
| **3. First & Last Error Line** | `grep -n 'ERROR' server.log \| head -n 1` | Finds the first error with its line number (swap `head` for `tail` to find the last error). |
| **4. Safe Error Extraction** | `grep 'ERROR' server.log > reports/errors.log` | Exports error events into a separate report file before running `sed -i` modifications. |
| **5. Hourly Traffic & Errors** | `grep '^2026-03-03 14:' server.log \| grep 'ERROR' \| wc -l` | Anchors on a specific date + hour (`14:`), filters for `ERROR`, and counts incidents. |
| **6. Top Active Modules** | `cut -d' ' -f4 server.log \| sort \| uniq -c \| sort -nr` | Ranks microservices (`[api]`, `[database]`, etc.) by total log volume. |
| **7. Brute-Force IP Detection** | `grep 'Failed login' server.log \| cut -d' ' -f5 \| sort \| uniq -c \| sort -nr` | Isolates failed authentication attempts, extracts source IPs (field 5), and ranks attackers. |
| **8. Module-Specific Errors** | `grep '\[database\]' server.log \| grep 'ERROR' \| wc -l` | Escapes square brackets to count errors isolated to a single service module. |

---

## Phase 3: System Administration

### 6. Users & Group Management

| Command | Description | Example |
| :--- | :--- | :--- |
| `whoami` | Print the effective username of the current session. | `whoami` |
| `id <user>` | Display numeric UID, primary GID, and all group memberships. | `id pathan` |
| `who` / `w` | Show users currently logged into the server and their active processes. | `who` |
| `sudo adduser <user>` | High-level interactive wizard to create a user, home folder, and password. | `sudo adduser pathan` |
| `sudo useradd -m <user>` | Low-level user creation; `-m` ensures `/home/<user>` is created from `/etc/skel`. | `sudo useradd -m rohan` |
| `sudo useradd -m -s /bin/bash <user>` | Create a user with a home directory and Bash as the default shell. | `sudo useradd -m -s /bin/bash ali` |
| `sudo mkhomedir_helper <user>` | Generate a missing `/home/<user>` directory if `useradd` was run without `-m`. | `sudo mkhomedir_helper rohan` |
| `sudo passwd <user>` | Set or reset a user's login password. | `sudo passwd pathan` |
| `sudo passwd -S <user>` | Inspect password lock/set status for an account. | `sudo passwd -S pathan` |
| `sudo chage -l <user>` | View password expiration dates and aging rules. | `sudo chage -l pathan` |
| `sudo usermod -aG <group> <user>` | **Append (`-aG`)** a user to a supplementary group without removing existing ones. | `sudo usermod -aG sudo pathan` |
| `sudo usermod -G <group> <user>` | Replace all supplementary groups with `<group>` *(removes from other groups)*. | `sudo usermod -G developers ali` |
| `sudo usermod -G "" <user>` | Strip a user from all supplementary groups. | `sudo usermod -G "" ali` |
| `sudo usermod -s <shell> <user>` | Modify a user's login shell (e.g., `/bin/bash` or `/sbin/nologin` for service accounts). | `sudo usermod -s /bin/bash rohan` |
| `sudo usermod -m -d <path> <user>` | Relocate and update a user's home directory path. | `sudo usermod -m -d /home/new ali` |
| `sudo userdel <user>` | Delete a user account while preserving their `/home/<user>` directory. | `sudo userdel pathan` |
| `sudo userdel -r <user>` | Completely delete a user account along with their home directory and mail spool. | `sudo userdel -r pathan` |
| `sudo groupadd <group>` | Create a new user group. | `sudo groupadd developers` |
| `sudo groupdel <group>` | Delete an existing group. | `sudo groupdel developers` |
| `sudo gpasswd -d <user> <group>` | Remove a specific user from a specific group. | `sudo gpasswd -d ali developers` |
| `groups <user>` | Display all groups a user belongs to. | `groups rohan` |
| `getent passwd <user>` | Query `/etc/passwd` for a user's account record. | `getent passwd pathan` |
| `getent group <group>` | Query `/etc/group` for a group's GID and member list. | `getent group developers` |
| `su - <user>` | Switch user with a clean login shell and environment reset. | `su - pathan` |
| `sudo -i` / `sudo su` | Escalate to an interactive `root` superuser shell. | `sudo -i` |

---

### 7. Permissions, Ownership & ACL

> **Octal Permission Reference:** `r` (Read) = `4` | `w` (Write) = `2` | `x` (Execute) = `1`
>
> **Permission Triplet:** `User/Owner (u)` · `Group (g)` · `Others (o)` — Example: `755` = `rwxr-xr-x` (`4+2+1` | `4+0+1` | `4+0+1`)

| Command | Description | Example |
| :--- | :--- | :--- |
| `chmod 755 <file>` | Owner: `rwx`, Group: `r-x`, Others: `r-x` (standard for scripts & web directories). | `chmod 755 deploy.sh` |
| `chmod 750 <file>` | Owner: `rwx`, Group: `r-x`, Others: `---` (restricts access from outside users). | `chmod 750 internal.sh` |
| `chmod 644 <file>` | Owner: `rw-`, Group: `r--`, Others: `r--` (standard for config & static files). | `chmod 644 index.html` |
| `chmod +x <file>` | Grant execute (`x`) permission to all users. | `chmod +x script.sh` |
| `chmod u+x <file>` | Grant execute (`x`) permission exclusively to the file owner (`u`). | `chmod u+x script.sh` |
| `chmod g+w <dir>` | Grant write (`w`) permission to group members (`g`). | `chmod g+w shared_dir/` |
| `chmod -R 755 <dir>` | Recursively apply permissions to a folder and everything inside it. | `chmod -R 755 /var/www/html` |
| `sudo chown <user> <file>` | Transfer ownership of a file or directory to `<user>`. | `sudo chown lovish app.py` |
| `sudo chown -R <user>:<group> <dir>` | Recursively change both owner and group ownership. | `sudo chown -R www-data:www-data /var/www` |
| `sudo chgrp <group> <file>` | Change only the group ownership of a file or directory. | `sudo chgrp developers project/` |
| `getfacl <file>` | View fine-grained Access Control List (ACL) permissions. | `getfacl a.txt` |
| `sudo setfacl -m u:<user>:rw <file>` | Grant custom ACL permissions to an individual user without changing group rules. | `sudo setfacl -m u:rahim:rw a.txt` |
| `sudo setfacl -x u:<user> <file>` | Revoke custom ACL permissions for a specific user. | `sudo setfacl -x u:rahim a.txt` |

---

### 8. Software & Package Management (`apt`)

| Command | Description | Example |
| :--- | :--- | :--- |
| `sudo apt update` | Refresh local package metadata index from configured Ubuntu repositories. | `sudo apt update` |
| `sudo apt upgrade` | Upgrade all installed packages to their latest available versions. | `sudo apt upgrade -y` |
| `sudo apt install <pkg>` | Download and install a package along with its dependencies. | `sudo apt install nginx` |
| `sudo apt remove <pkg>` | Uninstall a package while keeping its configuration files intact. | `sudo apt remove apache2` |
| `sudo apt purge <pkg>` | Completely remove a package **and** delete all its configuration files. | `sudo apt purge apache2` |
| `sudo apt autoremove` *(Extra)* | Clean up orphaned library dependencies no longer required by any package. | `sudo apt autoremove` |
| `apt show <pkg>` | Inspect package metadata (version, maintainer, size, dependencies). | `apt show nginx` |
| `apt list --installed` | List all software packages currently installed on the machine. | `apt list --installed` |
| `apt search <keyword>` *(Extra)* | Search Ubuntu repositories for packages matching a keyword. | `apt search docker` |

---

## Phase 4: Operations & Monitoring

### 9. Process & Resource Monitoring

| Command | Description | Example |
| :--- | :--- | :--- |
| `ps` | List active processes attached to the current terminal session. | `ps` |
| `ps aux` | Snapshot of all running system processes across all users with CPU/MEM stats. | `ps aux` |
| `ps aux \| grep <name>` | Search running processes to locate a service's Process ID (`PID`). | `ps aux | grep nginx` |
| `top` | Real-time interactive process and system load monitor (`q` to exit). | `top` |
| `htop` | Color-coded, mouse-friendly interactive process manager (`F10` or `q` to exit). | `htop` |
| `kill <PID>` | Send `SIGTERM` (`15`) to gracefully shut down a process by PID. | `kill 1234` |
| `kill -9 <PID>` | Send `SIGKILL` (`9`) to forcefully terminate a frozen process immediately. | `kill -9 1234` |
| `pkill <name>` | Terminate matching processes by executable name rather than PID. | `pkill python` |
| `fuser <file/port>` | Identify which PID is actively holding a lock on a file, folder, or socket. | `fuser -v /var/log/syslog` |
| `<command> &` | Launch a job asynchronously in the background. | `python3 worker.py &` |
| `jobs` / `fg` / `bg` *(Extra)* | List background jobs (`jobs`), bring to foreground (`fg`), or resume (`bg`). | `fg %1` |
| `nohup <cmd> &` | Run a background process immune to SSH/terminal disconnects (`nohup.out`). | `nohup ./backup.sh &` |
| `df -h` | Check available and used disk space across all mounted filesystems. | `df -h` |
| `du -sh <dir>` | Calculate total summarized disk usage of a directory. | `du -sh /var/log/` |
| `du -la <dir>` | Show disk consumption for every individual file and subfolder. | `du -la project/` |
| `free -h` | Display total, used, free, and cached RAM and Swap memory. | `free -h` |
| `vmstat` / `vmstat -a` | Report virtual memory, paging, CPU load, and active/inactive memory. | `vmstat -a` |
| `uptime` | Show system uptime, logged-in users, and 1/5/15-minute load averages. | `uptime` |
| `uname -a` | Print Linux kernel version, hostname, and CPU architecture. | `uname -a` |
| `lsblk` / `lscpu` *(Extra)* | Inspect attached storage disks/partitions (`lsblk`) and CPU topology (`lscpu`). | `lsblk` |
| `date` | Display current system date, time, and timezone. | `date` |
| `sudo reboot` | Gracefully restart the Ubuntu server. | `sudo reboot` |
| `sudo shutdown -h now` | Halt and power off the server immediately. | `sudo shutdown -h now` |

---

### 10. System Services (`systemd`) & Cron

| Command | Description | Example |
| :--- | :--- | :--- |
| `sudo systemctl status <svc>` | Check runtime status, PID, memory usage, and recent logs of a service. | `sudo systemctl status nginx` |
| `sudo systemctl start <svc>` | Start a stopped daemon/service immediately. | `sudo systemctl start nginx` |
| `sudo systemctl stop <svc>` | Stop a running service. | `sudo systemctl stop nginx` |
| `sudo systemctl restart <svc>` | Stop and restart a service completely. | `sudo systemctl restart nginx` |
| `sudo systemctl reload <svc>` | Reload config files gracefully without dropping active user connections. | `sudo systemctl reload nginx` |
| `sudo systemctl enable <svc>` | Configure a service to launch automatically on server boot. | `sudo systemctl enable docker` |
| `sudo systemctl disable <svc>` | Prevent a service from auto-starting at boot. | `sudo systemctl disable apache2` |
| `sudo journalctl -u <svc> -f` *(Extra)* | Tail live `systemd` journal logs for a specific service. | `sudo journalctl -u nginx -f` |
| `crontab -e` / `crontab -l` *(Extra)* | Edit (`-e`) or view (`-l`) scheduled recurring cron tasks. | `crontab -l` |

---

### 11. Environment & Shell Configuration

| Command | Description | Example |
| :--- | :--- | :--- |
| `echo $HOME` | Print current user's home directory path. | `echo $HOME` |
| `echo $SHELL` | Print path of the active login shell (e.g., `/bin/bash`). | `echo $SHELL` |
| `echo $PATH` | Print colon-separated directories searched when executing commands. | `echo $PATH` |
| `printenv` / `env` | List all exported environment variables in the current session. | `printenv` |
| `var="value"` | Define a local shell variable (exists only in current shell process). | `name="pathan"` |
| `export VAR="value"` | Export a variable so child processes and scripts inherit it. | `export ENV="production"` |
| `export PATH="$PATH:<dir>"` | Add a custom directory of scripts/binaries to the system `PATH`. | `export PATH="$PATH:/home/harry/bin"` |
| `source ~/.bashrc` | Apply changes made to `~/.bashrc` immediately without logging out. | `source ~/.bashrc` |
| `which <cmd>` | Locate the full executable binary path for a command. | `which python3` |
| `man <cmd>` | Open the built-in manual documentation page for a command. | `man grep` |
| `<cmd> --help` | Print concise CLI flag and syntax help directly in the terminal. | `uniq --help` |
| `history` | Display numbered list of previously executed commands. | `history` |
| `clear` or `Ctrl + L` | Clear terminal screen clutter. | `clear` |
| `script <file>` | Record an entire terminal session (commands + output) to a file (`exit` stops). | `script -a session.log` |
| `exit` | Terminate the current shell session or log out of `su`/`ssh`. | `exit` |

---

## Phase 5: Networking & Automation

### 12. Networking, SSH & Remote Transfer

| Command | Description | Example |
| :--- | :--- | :--- |
| `ssh <user>@<ip>` | Open an encrypted remote terminal session to a Linux server. | `ssh ali@192.168.1.10` |
| `ssh -i <key.pem> <user>@<ip>` *(Extra)* | Authenticate to cloud instances (AWS EC2, GCP, etc.) using an SSH key pair. | `ssh -i prod.pem ubuntu@3.110.45.12` |
| `scp <file> <user>@<ip>:<path>` *(Extra)* | Securely transfer files between local machine and remote server over SSH. | `scp app.zip ubuntu@10.0.0.5:/tmp/` |
| `rsync -avz <src> <dest>` *(Extra)* | Fast delta-sync transfer for backups and deployments (transfers only changed bytes). | `rsync -avz ./build/ ubuntu@10.0.0.5:/var/www/` |
| `curl <url>` | Send HTTP requests and print response bodies (ideal for testing REST APIs). | `curl https://api.github.com` |
| `curl -I <url>` | Fetch HTTP response headers only (verify status codes like `200 OK` or `502`). | `curl -I https://example.com` |
| `curl -o <file> <url>` | Download a remote file/payload and save it to a specified filename. | `curl -o users.json https://api.example.com/users` |
| `wget <url>` | Download files directly from HTTP/HTTPS/FTP URLs. | `wget https://example.com/main.zip` |
| `ip a` *(Extra)* | Display network interfaces (`eth0`, `lo`) and assigned IPv4/IPv6 addresses. | `ip a` |
| `ss -tulpn` *(Extra)* | Inspect all active listening TCP/UDP ports and the processes bound to them. | `ss -tulpn` |
| `ping -c 4 <host>` *(Extra)* | Send 4 ICMP packets to verify network reachability and latency. | `ping -c 4 google.com` |
| `sudo ufw status` / `allow` *(Extra)* | Manage Ubuntu Uncomplicated Firewall rules to allow/block ports. | `sudo ufw allow 80/tcp` |

---

### 13. Archiving & Compression

| Command | Description | Example |
| :--- | :--- | :--- |
| `unzip <file.zip>` | Extract a `.zip` archive *(requires `sudo apt install unzip`)*. | `unzip main.zip` |
| `zip -r <out.zip> <dir>` *(Extra)* | Compress a directory recursively into a `.zip` archive. | `zip -r backup.zip project/` |
| `tar -czvf <out.tar.gz> <dir>` *(Extra)* | Create a gzip-compressed tarball (`c`reate, `z`ip, `v`erbose, `f`ile). | `tar -czvf logs.tar.gz /var/log/nginx/` |
| `tar -xzvf <file.tar.gz>` *(Extra)* | Extract a `.tar.gz` archive (`x`tract, `z`ip, `v`erbose, `f`ile). | `tar -xzvf logs.tar.gz` |

---

### 14. Bash Scripting Essentials

| Concept / Syntax | Description | Example |
| :--- | :--- | :--- |
| `#!/bin/bash` | **Shebang**: first line in a `.sh` script instructing the OS to execute with Bash. | `#!/bin/bash` |
| `declare -i <var>=<num>` | Explicitly type a variable as an integer (Bash defaults to strings). | `declare -i count=100` |
| `readonly <var>=<val>` | Declare an immutable constant variable that cannot be overwritten or unset. | `readonly MAX_RETRIES=3` |
| `unset <var>` | Remove a variable from memory. | `unset temp_var` |
| `var=$(command)` | **Command Substitution**: capture the stdout of a command into a variable. | `today=$(date +%F)` |
| `read -p "Prompt: " var` | Prompt the user and store interactive keyboard input into `var`. | `read -p "Enter username: " user` |
| `(( arithmetic ))` | Evaluate C-style integer math and numeric comparisons. | `sum=$((a + b))` |
| `if [ -e <file> ]; then ... fi` | File test conditionals (`-e` exists, `-f` regular file, `-d` directory, `-r/-w/-x`). | `if [ -f server.log ]; then echo "Found"; fi` |
| `if (( ... )); then ... elif ... else ... fi` | Multi-branch numeric conditional logic. | `if (( errors > 50 )); then echo "Critical"; fi` |
| `for ((i=0; i<10; i++)); do ... done` | Standard C-style counted `for` loop. | `for ((i=1; i<=5; i++)); do echo "Try $i"; done` |
| `funcName() { ... }` | Define modular, reusable functions inside a Bash script. | `log_msg() { echo "[INFO] $1"; }` |
| `$0`, `$1`, `$2`, `$#`, `$@` | Positional script parameters: `$0` script name, `$1` 1st arg, `$#` arg count, `$@` all args. | `./deploy.sh staging v2.0` |

---

### 15. WSL (Windows Subsystem for Linux)

| Command | Description | Example |
| :--- | :--- | :--- |
| `wsl --list --online` | List all official Linux distributions available to install via WSL. | `wsl --list --online` |
| `wsl --install -d Ubuntu` | Download and install Ubuntu on Windows using WSL. | `wsl --install -d Ubuntu` |
| `wsl -l -v` *(Extra)* | Check installed WSL distros, running state, and WSL engine version (1 or 2). | `wsl -l -v` |