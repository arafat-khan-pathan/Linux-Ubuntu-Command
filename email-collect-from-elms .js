(async function scrapeStudentEmails() {
    // 1. Page theke sob student profile link khuje ber kora
    const links = Array.from(document.querySelectorAll('a[href*="user/view.php"]'));
    
    // Duplicate link thakle remove kora
    const uniqueStudents = [];
    const seenUrls = new Set();
    
    links.forEach(link => {
        if (!seenUrls.has(link.href) && link.innerText.trim() !== "") {
            seenUrls.add(link.href);
            uniqueStudents.push({
                nameAndId: link.innerText.trim(),
                profileUrl: link.href
            });
        }
    });

    console.log(`Total ${uniqueStudents.length} students found. Fetching emails... Please wait.`);
    const results = [];

    // 2. Prottekta profile URL background-e fetch kora
    for (let i = 0; i < uniqueStudents.length; i++) {
        const student = uniqueStudents[i];
        try {
            const response = await fetch(student.profileUrl);
            const htmlText = await response.text();
            
            // HTML text ke DOM-e convert kora
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');
            
            // Email link (mailto:) khuje ber kora
            const emailElement = doc.querySelector('a[href^="mailto:"]');
            const email = emailElement ? emailElement.innerText.trim() : "Not Visible / Hidden";
            
            results.push({
                "Student Info": student.nameAndId,
                "Email": email
            });
            
            console.log(`[${i + 1}/${uniqueStudents.length}] Done: ${student.nameAndId} -> ${email}`);
            
            // Server-e jate beshi pressure na pore tai 300ms delay dewa
            await new Promise(resolve => setTimeout(resolve, 300));
            
        } catch (error) {
            console.error(`Failed for ${student.nameAndId}`, error);
        }
    }

    // 3. Console-e sundor table dekhano ebong CSV download korano
    console.table(results);
    
    let csvContent = "data:text/csv;charset=utf-8,Student Info,Email\n" 
        + results.map(e => `"${e["Student Info"]}","${e["Email"]}"`).join("\n");
        
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "UIU_Course_Emails.csv");
    document.body.appendChild(link);
    link.click();
    
    console.log("Process Complete! CSV file downloaded.");
})();