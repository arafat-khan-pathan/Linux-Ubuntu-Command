# 🐧 Ubuntu Linux & DevOps Master Notes

> **Author:** Arafat Khan Pathan · CSE, United International University (UIU)
> **Repo path:** `learning-notes/linux-devops`
> **Focus:** Ubuntu first, DevOps basics second.

**How to use:** go phase by phase. Run every example in a safe folder (`~/practice`) or a VM.

---

## Phase 1: Navigation & File System

| Command | Description | Practical Example |
|---|---|---|
| `pwd` | Show current directory | `pwd` |
| `ls` | List files (`-l` details, `-a` hidden, `-h` readable sizes) | `ls -lah /var/log` |
| `cd` | Change directory | `cd ~/practice` · `cd ..` · `cd -` |
| `mkdir` | Create directory (`-p` makes parents) | `mkdir -p proj/{src,logs}` |
| `touch` | Create empty file / update timestamp | `touch app.log notes.txt` |
| `cp` | Copy (`-r` for folders) | `cp -r proj proj_backup` |
| `mv` | Move or rename | `mv notes.txt docs.txt` |
| `rm` | Delete (`-r` folders, `-i` ask first) | `rm -ri proj_backup` |

> ⚠️ `rm` has **no recycle bin**. Never run `rm -rf /` or `rm -rf *` unless you are 100% sure where you are.

---

## Phase 2: Viewing, Searching & Text Processing

| Command | Description | Practical Example |
|---|---|---|
| `cat` | Print a whole file | `cat /etc/os-release` |
| `less` | Scroll a big file (`q` quit, `/word` search) | `less /var/log/syslog` |
| `head` | First N lines | `head -n 5 app.log` |
| `tail` | Last N lines (`-f` follows live) | `tail -f /var/log/auth.log` |
| `wc` | Count lines/words/bytes | `wc -l app.log` |
| `grep` | Search text (`-i` ignore case, `-n` line no., `-r` recursive, `-v` invert) | `grep -in "error" app.log` |
| `find` | Find files by name/size/time | `find /var/log -name "*.log" -mtime -1` |
| `cut` | Pick columns | `cut -d: -f1 /etc/passwd` |
| `sort` / `uniq` | Sort lines / remove duplicates (`-c` count) | `sort names.txt \| uniq -c` |
| `awk` | Column-based processing | `awk '{print $1}' access.log` |
| `sed` | Find & replace in streams | `sed 's/ERROR/ALERT/g' app.log` |

**Pipes & redirection**

| Symbol | Meaning | Example |
|---|---|---|
| `\|` | Send output of one command into another | `ps aux \| grep nginx` |
| `>` | Write to file (overwrites) | `ls > files.txt` |
| `>>` | Append to file | `date >> report.txt` |
| `2>` | Redirect errors | `find / -name x 2> /dev/null` |

---

## Phase 3: System Info & Process Management

| Command | Description | Practical Example |
|---|---|---|
| `uname -a` | Kernel & system info | `uname -r` |
| `lsb_release -a` | Ubuntu version | `lsb_release -a` |
| `df -h` | Disk space per mount | `df -h /` |
| `du -sh` | Size of a folder | `du -sh /var/log/*` |
| `free -h` | RAM usage | `free -h` |
| `vmstat` | CPU/memory/IO snapshot | `vmstat 2 5` |
| `ps` | List processes | `ps aux \| grep ssh` |
| `top` / `htop` | Live process monitor (`htop`: `sudo apt install htop`) | `htop` |
| `kill` | Stop process (`-15` polite, `-9` force) | `kill -15 1234` |
| `systemctl` | Manage services | `sudo systemctl status ssh` |
| `journalctl` | Read systemd logs | `journalctl -u ssh --since "1 hour ago"` |

**systemctl cheat sheet**

| Action | Command |
|---|---|
| Start / Stop / Restart | `sudo systemctl start\|stop\|restart nginx` |
| Reload config | `sudo systemctl reload nginx` |
| Enable on boot | `sudo systemctl enable nginx` |
| Check running | `systemctl is-active nginx` |
| List failed | `systemctl --failed` |

---

## Phase 4: Users, Groups & Permissions

| Command | Description | Practical Example |
|---|---|---|
| `useradd` | Create user | `sudo useradd -m -s /bin/bash devops` |
| `passwd` | Set password | `sudo passwd devops` |
| `usermod` | Modify user (`-aG` add to group) | `sudo usermod -aG sudo devops` |
| `userdel` | Delete user (`-r` removes home) | `sudo userdel -r devops` |
| `groupadd` | Create group | `sudo groupadd team` |
| `groupdel` | Delete group | `sudo groupdel team` |
| `id` / `groups` | Show user's IDs & groups | `id devops` |
| `chmod` | Change permissions | `chmod 755 script.sh` · `chmod u+x script.sh` |
| `chown` | Change owner (`user:group`) | `sudo chown devops:team app/` |
| `chgrp` | Change group | `sudo chgrp team app/` |
| `setfacl` | Give extra per-user permission (ACL) | `setfacl -m u:devops:rw file.txt` |
| `getfacl` | View ACLs | `getfacl file.txt` |

**Permission numbers**

| Number | Meaning | | Octal | Typical use |
|---|---|---|---|---|
| `r` = 4 | read | | `755` | scripts, folders (owner full, others read/run) |
| `w` = 2 | write | | `644` | normal files |
| `x` = 1 | execute | | `600` | private keys, secrets |

Example: `rwxr-xr--` = 7 5 4 → `chmod 754 file`

---

## Phase 5: Package Management & Services

| Command | Description | Practical Example |
|---|---|---|
| `apt update` | Refresh package list | `sudo apt update` |
| `apt upgrade` | Upgrade installed packages | `sudo apt upgrade -y` |
| `apt install` | Install | `sudo apt install nginx -y` |
| `apt remove` | Remove (keeps config) | `sudo apt remove nginx` |
| `apt purge` | Remove + delete config | `sudo apt purge nginx` |
| `apt autoremove` | Clean unused deps | `sudo apt autoremove` |
| `apt search` / `apt show` | Find / inspect package | `apt search htop` |
| `dpkg -i` | Install local `.deb` | `sudo dpkg -i app.deb` |
| `dpkg -l` | List installed | `dpkg -l \| grep nginx` |
| `dpkg -L` | Files a package installed | `dpkg -L nginx` |

**Mini workflow: install and run a web server**

```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl enable --now nginx
systemctl status nginx
curl -I http://localhost        # should return HTTP/1.1 200 OK
```

---

## Phase 6: Bash Scripting & Automation

| Concept | Description | Practical Example |
|---|---|---|
| Shebang | First line, picks interpreter | `#!/bin/bash` |
| Variables | No spaces around `=` | `name="Pathan"; echo "Hi $name"` |
| Arguments | `$1`, `$2`, `$#`, `$@` | `echo "File: $1"` |
| Conditionals | `if / elif / else` | `if [ -f "$1" ]; then echo "exists"; fi` |
| Loops | `for`, `while` | `for f in *.log; do wc -l "$f"; done` |
| Functions | Reusable blocks | `greet() { echo "Hi $1"; }` |
| Arithmetic | `$(( ))` | `echo $((5 + 3))` |
| Exit code | `0` = success | `echo $?` |

**Common test flags:** `-f` file exists · `-d` dir exists · `-z` empty string · `-eq -ne -gt -lt` numbers

**Example script: `disk_check.sh`**

```bash
#!/bin/bash
# Warn if root disk usage is above a limit

LIMIT=80
USAGE=$(df / | awk 'NR==2 {print $5}' | tr -d '%')   # get % used as a number

check_disk() {
    if [ "$USAGE" -gt "$LIMIT" ]; then
        echo "WARNING: disk at ${USAGE}%"
    else
        echo "OK: disk at ${USAGE}%"
    fi
}

check_disk
```

Run it:

```bash
chmod +x disk_check.sh
./disk_check.sh
```

**Automate with cron**

| Command | Description | Practical Example |
|---|---|---|
| `crontab -e` | Edit your schedules | `0 2 * * * /home/pathan/backup.sh` (daily 2 AM) |
| `crontab -l` | List schedules | `crontab -l` |

---

## Phase 7: DevOps Log Detective Cookbook

**Regex anchors:** `^` = line starts with · `$` = line ends with · `.` = any char · `.*` = anything

Sample files: `/var/log/auth.log` (SSH logins), `/var/log/nginx/access.log` (web traffic), `/var/log/syslog` (system).

| Goal | Practical Example |
|---|---|
| Lines starting with a date | `grep "^Nov 17" /var/log/syslog` |
| Lines ending with a word | `grep "failed$" app.log` |
| Failed SSH logins | `grep "Failed password" /var/log/auth.log` |
| Count errors | `grep -c "ERROR" app.log` |
| Top IPs hitting web server | `awk '{print $1}' access.log \| sort \| uniq -c \| sort -nr \| head -5` |
| Top attacker IPs (SSH) | `grep "Failed password" /var/log/auth.log \| awk '{print $(NF-3)}' \| sort \| uniq -c \| sort -nr \| head` |
| Most requested URLs | `awk '{print $7}' access.log \| sort \| uniq -c \| sort -nr \| head` |
| HTTP status code counts | `awk '{print $9}' access.log \| sort \| uniq -c \| sort -nr` |
| Only 5xx server errors | `awk '$9 ~ /^5/' access.log` |
| Usernames tried | `grep "Invalid user" /var/log/auth.log \| awk '{print $8}' \| sort \| uniq -c \| sort -nr` |
| Live watch for errors | `tail -f app.log \| grep --line-buffered "ERROR"` |

**The golden pipeline** (memorize this):

```bash
# extract column → sort → count duplicates → sort by count (big first) → top 10
awk '{print $1}' access.log | sort | uniq -c | sort -nr | head -10
```

**Report generation script: `log_report.sh`**

```bash
#!/bin/bash
# Build a daily security/traffic report

LOG="/var/log/auth.log"
REPORT="report_$(date +%F).txt"

echo "=== Log Report: $(date) ===" > "$REPORT"          # > creates new file

echo -e "\n[Failed SSH logins]" >> "$REPORT"             # >> appends
grep -c "Failed password" "$LOG" >> "$REPORT"

echo -e "\n[Top 5 attacker IPs]" >> "$REPORT"
grep "Failed password" "$LOG" \
  | awk '{print $(NF-3)}' | sort | uniq -c | sort -nr | head -5 >> "$REPORT"

echo -e "\n[Disk usage]" >> "$REPORT"
df -h / >> "$REPORT"

echo "Report saved: $REPORT"
```

> Reading `/var/log/auth.log` needs `sudo`: `sudo ./log_report.sh`

---

## 🔥 Troubleshooting Workflow (Server is slow or down)

| Step | Check | Command |
|---|---|---|
| 1 | Is the service running? | `systemctl status nginx` |
| 2 | Read its recent logs | `journalctl -u nginx -n 50 --no-pager` |
| 3 | Disk full? | `df -h` |
| 4 | Out of memory? | `free -h` |
| 5 | What is eating CPU? | `top` / `htop` |
| 6 | Port listening? | `ss -tulpn \| grep :80` |
| 7 | Reachable? | `curl -I http://localhost` |
| 8 | Recent errors | `grep -i error /var/log/syslog \| tail -20` |

---

## 📌 Quick Reference

- Use `sudo` only when needed.
- `man <command>` or `<command> --help` explains anything.
- Test destructive commands with `ls` first (e.g. check `ls *.log` before `rm *.log`).
- Script habit: `chmod +x`, comment your code, keep scripts in Git.

> **Next steps:** Git basics → SSH & `ufw` firewall → Docker → Nginx → CI/CD (GitHub Actions).
