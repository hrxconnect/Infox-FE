

    // Function to format the bot message
export const formatBotMessage = (message) => {
    return message
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text
        .replace(/(Question \d+:)/g, '<span class="question">$1</span>') // Style questions
        .replace(/(Options:)/g, '<span class="options">$1</span>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text
        .replace(/(http[s]?:\/\/[^\s]+)/g, (url) => {
            return `<button class="link-button" onclick="window.open('${url}', '_blank')">${url}</button>`;
        }) // Convert URLs to links
        .replace(/### (.*?)\n/g, '<h3>$1</h3>') // Convert ### to <h3>
        .replace(/## (.*?)\n/g, '<h2>$1</h2>') // Convert ## to <h2>
        .replace(/# (.*?)\n/g, '<h1>$1</h1>') // Convert # to <h1>
        .replace(/\n/g, '<br/>')
        .replace(/\\n/g, '<br/>');  // Style options
};