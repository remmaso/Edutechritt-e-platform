// WhatsApp Chat Widget Functionality
class WhatsAppChatBot {
    constructor() {
        this.phoneNumber = '08024155919';
        this.isOpen = false;
        this.isTyping = false;
        this.userMessages = [];
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.showWelcomeMessage();
    }

    bindEvents() {
        const chatButton = document.getElementById('whatsapp-chat-button');
        const closeChat = document.getElementById('whatsapp-close-chat');
        const sendButton = document.getElementById('whatsapp-send-button');
        const inputField = document.getElementById('whatsapp-input');
        const quickReplies = document.querySelectorAll('.whatsapp-quick-reply');

        // Toggle chat
        chatButton.addEventListener('click', () => this.toggleChat());
        closeChat.addEventListener('click', () => this.closeChat());

        // Send message
        sendButton.addEventListener('click', () => this.sendMessage());
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Quick replies
        quickReplies.forEach(reply => {
            reply.addEventListener('click', () => {
                const message = reply.getAttribute('data-message');
                this.sendUserMessage(message);
            });
        });

        // Remove notification badge when chat is opened
        chatButton.addEventListener('click', () => {
            const badge = chatButton.querySelector('.whatsapp-notification-badge');
            if (badge) {
                badge.style.display = 'none';
            }
        });
    }

    toggleChat() {
        const container = document.getElementById('whatsapp-chat-container');
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            container.classList.add('active');
            this.focusInput();
        } else {
            container.classList.remove('active');
        }
    }

    closeChat() {
        const container = document.getElementById('whatsapp-chat-container');
        container.classList.remove('active');
        this.isOpen = false;
    }

    focusInput() {
        setTimeout(() => {
            document.getElementById('whatsapp-input').focus();
        }, 300);
    }

    sendMessage() {
        const input = document.getElementById('whatsapp-input');
        const message = input.value.trim();
        
        if (message && !this.isTyping) {
            this.sendUserMessage(message);
            input.value = '';
        }
    }

    sendUserMessage(message) {
        this.addMessage(message, 'user');
        this.userMessages.push(message);
        
        // Simulate bot response
        setTimeout(() => {
            this.generateBotResponse(message);
        }, 1000 + Math.random() * 1000);
    }

    generateBotResponse(userMessage) {
        const responses = {
            // Course related responses
            'ai courses': '🤖 Our AI courses include:\n• Machine Learning Fundamentals\n• Deep Learning & Neural Networks\n• Large Language Models & GPT\n• Computer Vision & AI\n\nEach course includes hands-on projects and expert instruction!',
            
            'course fees': '💰 Our course prices vary:\n• Individual courses: ₦50,000 - ₦150,000\n• Complete AI bundle: ₦300,000\n• Web Development bundle: ₦250,000\n\nWe also offer installment plans and scholarships!',
            
            'enroll': '📚 Enrollment is easy!\n1. Click "Register" on any course\n2. Fill in your details\n3. Choose payment option\n4. Start learning immediately\n\nNeed help? I can guide you through it!',
            
            'human': '👥 I\'ll connect you with our human support team. You can also call us directly at 08024155919 or email support@edutechritt.com',
            
            'hello': 'Hello! 👋 Welcome to EduTechRitt! How can I help you today?',
            
            'hi': 'Hi there! 👋 Ready to start your AI learning journey?',
            
            'thanks': 'You\'re welcome! 😊 Is there anything else I can help you with?'
        };

        let response = responses[this.getKeywordMatch(userMessage)];
        
        if (!response) {
            response = this.generateContextualResponse(userMessage);
        }

        this.addMessage(response, 'bot');
        
        // Suggest quick replies based on context
        if (this.shouldSuggestReplies(userMessage)) {
            setTimeout(() => {
                this.addSuggestedReplies();
            }, 2000);
        }
    }

    getKeywordMatch(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('ai') || lowerMessage.includes('course') || lowerMessage.includes('machine learning')) {
            return 'ai courses';
        }
        if (lowerMessage.includes('fee') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            return 'course fees';
        }
        if (lowerMessage.includes('enroll') || lowerMessage.includes('register') || lowerMessage.includes('join')) {
            return 'enroll';
        }
        if (lowerMessage.includes('human') || lowerMessage.includes('support') || lowerMessage.includes('talk')) {
            return 'human';
        }
        if (lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
            return 'hello';
        }
        if (lowerMessage.includes('hi')) {
            return 'hi';
        }
        if (lowerMessage.includes('thank')) {
            return 'thanks';
        }
        
        return null;
    }

    generateContextualResponse(message) {
        const contextualResponses = [
            'That\'s a great question! Let me help you with that. Could you provide more details about what you\'d like to know?',
            'I\'m here to help! You can explore our courses at the top of this page, or ask me about specific topics.',
            'Thanks for your message! The best way to get started is by checking out our course catalog. Would you like me to explain our most popular courses?',
            'I understand you\'re interested in learning more! Our expert instructors are ready to help you succeed. What specific technology interests you most?'
        ];

        return contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
    }

    shouldSuggestReplies(message) {
        const lowerMessage = message.toLowerCase();
        return lowerMessage.includes('course') || lowerMessage.includes('enroll') || lowerMessage.includes('help');
    }

    addSuggestedReplies() {
        const suggestions = [
            'Show me beginner courses',
            'What are the prerequisites?',
            'Do you offer certificates?',
            'Request a callback'
        ];

        const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
        this.addMessage(`💡 ${randomSuggestion}`, 'bot');
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('whatsapp-chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `whatsapp-message ${sender}`;
        
        const content = document.createElement('div');
        content.className = 'whatsapp-message-content';
        
        // Format message with line breaks
        const formattedText = text.replace(/\n/g, '<br>');
        content.innerHTML = `
            ${formattedText}
            <div class="whatsapp-message-time">${this.getCurrentTime()}</div>
        `;
        
        messageDiv.appendChild(content);
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        this.scrollToBottom();
        
        // Show typing indicator for bot responses
        if (sender === 'bot') {
            this.showTypingIndicator();
        }
    }

    showTypingIndicator() {
        this.isTyping = true;
        const sendButton = document.getElementById('whatsapp-send-button');
        sendButton.disabled = true;
        
        setTimeout(() => {
            this.isTyping = false;
            sendButton.disabled = false;
        }, 1500);
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('whatsapp-chat-messages');
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100);
    }

    getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    showWelcomeMessage() {
        // Show initial welcome message after a short delay
        setTimeout(() => {
            if (!this.isOpen) {
                const badge = document.querySelector('.whatsapp-notification-badge');
                if (badge) {
                    badge.style.display = 'flex';
                }
            }
        }, 3000);
    }

    // Method to open WhatsApp with pre-filled message
    openWhatsApp(message = '') {
        const whatsappUrl = `https://wa.me/${this.phoneNumber.replace(/^0/, '+234')}${message ? '?text=' + encodeURIComponent(message) : ''}`;
        window.open(whatsappUrl, '_blank');
    }
}

// Initialize the WhatsApp chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('whatsapp-chat-button')) {
        window.whatsappChatBot = new WhatsAppChatBot();
    }
});