(async function autoDetectAndScrape() {
    console.log("Starting automatic pagination scan...");
    
    let allStudentLinks = [];
    let seenUrls = new Set();
    let currentPageNum = 0;
    let hasMorePages = true;

    // Base URL theke page number alada kore niyechhi
    const baseUrl = window.location.href.split('&page=')[0];

    // 1. Loop chaliye dekha jabe koto gulo page ache ebong sob link collect kora
    while (hasMorePages) {
        let pageUrl = `${baseUrl}&page=${currentPageNum}`;
        console.log(`Scanning page: ${currentPageNum + 1} (${pageUrl})`);

        try {
            let res = await fetch(pageUrl);
            let html = await res.text();
            let doc = new DOMParser().parseFromString(html, 'text/html');

            // Oi page-er student profile links khuje ber kora
            let links = doc.querySelectorAll('a[href*="user/view.php"]');
            
            // Jodi ei page-e kono student link na thake, tar mane page shesh
            if (links.length === 0) {
                console.log("No more students found. Pagination ends.");
                hasMorePages = false;
                break;
            }

            let foundNewOnThisPage = false;
            links.forEach(l => {
                let href = l.href;
                let text = l.innerText.trim();
                // Duplicate and empty check
                if (text !== "" && !seenUrls.has(href)) {
                    seenUrls.add(href);
                    allStudentLinks.push({
                        nameAndId: text,
                        profileUrl: href
                    });
                    foundNewOnThisPage = true;
                }
            });

            // Jodi page-e link thake kintu sob ager page-er motoi repeat hoy (Moodle pagination edge-case)
            if (!foundNewOnThisPage) {
                console.log("Reached loop-back page. Stopping pagination.");
                hasMorePages = false;
                break;
            }

            currentPageNum++;
            // Server-e load kom rakhar jonno choto pause
            await new Promise(r => setTimeout(r, 500));

        } catch (err) {
            console.error(`Error fetching page ${currentPageNum}:`, err);
            hasMorePages = false;
        }
    }

    console.log(`Total unique students found across all pages: ${allStudentLinks.length}. Now fetching emails...`);

    // 2. Sob student link paoa gele ekhon prottekta profile theke email fetch kora
    let results = [];
    for (let i = 0; i < allStudentLinks.length; i++) {
        let student = allStudentLinks[i];
        try {
            let res = await fetch(student.profileUrl);
            let html = await res.text();
            let doc = new DOMParser().parseFromString(html, 'text/html');
            
            let emailEl = doc.querySelector('a[href^="mailto:"]');
            let email = emailEl ? emailEl.innerText.trim() : "Hidden / Not Visible";
            
            results.push({
                "Student Info": student.nameAndId,
                "Email": email
            });
            
            console.log(`[${i + 1}/${allStudentLinks.length}] ${student.nameAndId} -> ${email}`);
            
            // Server-er security ba rate limit avoid korar jonno 300ms delay
            await new Promise(r => setTimeout(r, 300));
            
        } catch (error) {
            console.error(`Failed for ${student.nameAndId}:`, error);
        }
    }

    // 3. CSV file-e convert kore automatic download korano
    let csvContent = "data:text/csv;charset=utf-8,Student Info,Email\n" 
        + results.map(e => `"${e["Student Info"]}","${e["Email"]}"`).join("\n");
        
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "UIU_All_Pages_Auto_Emails.csv");
    document.body.appendChild(link);
    link.click();
    
    console.log("Process Complete! All pages scraped & CSV downloaded.");
})();