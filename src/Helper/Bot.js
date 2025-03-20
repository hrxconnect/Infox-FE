

    // Function to format the bot message
export const formatBotMessage = (message) => {
    return message
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text
        .replace(/(Question \d+:)/g, '<span class="question">$1</span>') // Style questions
        .replace(/(Options:)/g, '<span class="options">$1</span>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text
        // .replace(/(http[s]?:\/\/[^\s]+)/g, (url) => {
        //     return `<button class="link-button" onclick="window.open('${url}', '_blank')">${url}</button>`;
        // }) // Convert URLs to links
        .replace(/### (.*?)\n/g, '<h3>$1</h3>') // Convert ### to <h3>
        .replace(/## (.*?)\n/g, '<h2>$1</h2>') // Convert ## to <h2>
        .replace(/# (.*?)\n/g, '<h1>$1</h1>') // Convert # to <h1>
        .replace(/\n/g, '<br/>')
        .replace(/\t/g, "    ")
        .replace(/\\n/g, '<br/>')// Style options
        // .replace(/http[s]?:\s*\/\/\s*([\w.-]+\/?[\w-]*)/g, (url) => {   
        //     let cleanUrl = url.replace(/\s+/g, ''); // Remove spaces within URLs
        //     return `<button class="link-button" onclick="window.open('${cleanUrl}', '_blank')">${cleanUrl}</button>`;
        // }); // Convert URLs to links
        .replace(/\bhttps?:\/\/[^\s<]+[^\s.,!?;:<>)]/g, (url) => {
            // Only match valid URLs, ignore numbered lists
            const cleanedUrl = url.trim().replace(/\.+$/, ''); // Trim spaces and trailing dots
            return `<a href="${cleanedUrl}" target="_blank">${cleanedUrl}</a>`;
        })
        .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, (match, text, url) => {
            const cleanedUrl = url.trim().replace(/\.+$/, ''); // Trim spaces and trailing dots
            return `<a href="${cleanedUrl}" target="_blank">${text}</a>`;
        })

        // .replace(/(\w)\s+([a-zA-Z])/g, "$1$2");

        
};