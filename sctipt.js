/*========== menu icon navbar ==========*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// Static message storage (simulates database) - moved to top
let staticMessages = [
    {
        Message_ID: 1,
        Full_Name: 'John Doe',
        Email: 'john@example.com',
        Message_Content: 'Great portfolio! Love the design and functionality.',
        Date_posted: '2025-01-15'
    },
    {
        Message_ID: 2,
        Full_Name: 'Jane Smith',
        Email: 'jane@example.com',
        Message_Content: 'Impressive work! The message board feature is really cool.',
        Date_posted: '2025-01-14'
    }
];

let nextMessageId = 3;

if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };
}

/*========== scroll sections active link ==========*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            const activeLink = document.querySelector('header nav a[href*=' + id + ']');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });

    /*========== sticky navbar ==========*/
    let header = document.querySelector('.header');
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 100);
    }

    /*========== remove menu icon navbar when click navbar link (scroll) ==========*/
    if (menuIcon) {
        menuIcon.classList.remove('bx-x');
    }
    if (navbar) {
        navbar.classList.remove('active');
    }
};

/*========== swiper ==========*/
if (typeof Swiper !== 'undefined') {
    try {
        var swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 50,
            loop: true,
            grabCursor: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    } catch (error) {
        console.warn('Swiper initialization failed:', error);
    }
}

/*========== dark light mode ==========*/
let darkModeIcon = document.querySelector('#darkMode-icon');

if (darkModeIcon) {
    darkModeIcon.onclick = () => {
        darkModeIcon.classList.toggle('bx-sun');
        document.body.classList.toggle('dark-mode');
    };
}

/*========== Static Message Board Functionality ==========*/
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing portfolio...');
    
    // Handle form submission for static demo
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        console.log('Message form found, adding event listener...');
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted, calling submitMessageStatic...');
            submitMessageStatic();
        });
    } else {
        console.error('Message form not found!');
    }
    
    // Initialize demo messages with a small delay to ensure DOM is ready
    setTimeout(() => {
        console.log('Initializing demo messages...', staticMessages);
        displayMessagesStatic(staticMessages);
    }, 100);
});

function submitMessageStatic() {
    const form = document.getElementById('messageForm');
    const formData = new FormData(form);
    
    const fullName = formData.get('full_name');
    const email = formData.get('email');
    const messageContent = formData.get('message_content');
    
    // Validate inputs
    if (!fullName || !email || !messageContent) {
        showNotification('All fields are required', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Add new message to static storage
    const newMessage = {
        Message_ID: nextMessageId++,
        Full_Name: fullName,
        Email: email,
        Message_Content: messageContent,
        Date_posted: new Date().toISOString().split('T')[0]
    };
    
    staticMessages.unshift(newMessage);
    
    // Update display
    displayMessagesStatic(staticMessages);
    
    // Show success message
    showNotification('Message sent successfully! (Demo mode)', 'success');
    
    // Reset form
    form.reset();
}

// ========== ScrollReveal Animations ========== //
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        distance: '60px',
        duration: 1200,
        delay: 200,
        reset: false
    });
    sr.reveal('.home-content, .home-img', { origin: 'top', interval: 200 });
    sr.reveal('.about-img', { origin: 'left' });
    sr.reveal('.about-content', { origin: 'right' });
    sr.reveal('.services-container, .portfolio-container, .resume-container, .contact-container', { origin: 'bottom', interval: 200 });
    sr.reveal('.footer', { origin: 'bottom' });
}

// ========== Enhanced Message Board Animations ========== //
function displayMessagesStatic(messages) {
    console.log('displayMessagesStatic called with:', messages);
    const messagesContainer = document.getElementById('messagesContainer');
    if (!messagesContainer) {
        console.error('Messages container not found!');
        return;
    }
    
    console.log('Messages container found, updating content...');
    
    if (messages.length === 0) {
        messagesContainer.innerHTML = '<div class="no-messages">No messages yet. Be the first to leave a message!</div>';
        return;
    }
    
    let html = '';
    messages.forEach(message => {
        html += `
            <div class="message-item animate-in" data-message-id="${message.Message_ID}">
                <div class="message-header">
                    <div class="message-info">
                        <span class="message-author">${escapeHtml(message.Full_Name)}</span>
                        <span class="message-date">${formatDate(message.Date_posted)}</span>
                    </div>
                    <div class="message-actions">
                        <button class="edit-btn" onclick="editMessage(${message.Message_ID}, '${escapeHtml(message.Full_Name)}', '${escapeHtml(message.Email)}', '${escapeHtml(message.Message_Content)}')" title="Edit message">
                            <i class='bx bx-edit-alt'></i>
                        </button>
                        <button class="delete-btn" onclick="deleteMessage(${message.Message_ID})" title="Delete message">
                            <i class='bx bx-trash'></i>
                        </button>
                    </div>
                </div>
                <div class="message-content">${escapeHtml(message.Message_Content)}</div>
            </div>
        `;
    });
    
    console.log('Generated HTML:', html);
    messagesContainer.innerHTML = html;
    
    // Animate in
    setTimeout(() => {
        document.querySelectorAll('.message-item.animate-in').forEach(el => {
            el.classList.remove('animate-in');
        });
    }, 10);
}

function deleteMessage(messageId) {
    console.log('deleteMessage called with ID:', messageId);
    if (confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
        // Remove from static storage
        staticMessages = staticMessages.filter(msg => msg.Message_ID !== messageId);
        // Animate out
        const messageElement = document.querySelector(`[data-message-id="${messageId}"]`);
        if (messageElement) {
            messageElement.classList.add('animate-out');
            setTimeout(() => {
                displayMessagesStatic(staticMessages);
            }, 350);
        } else {
            displayMessagesStatic(staticMessages);
        }
        // Show success message
        showNotification('Message deleted successfully! (Demo mode)', 'success');
    }
}

function editMessage(messageId, fullName, email, messageContent) {
    console.log('editMessage called with ID:', messageId, 'Name:', fullName);
    // Create modal HTML
    const modalHTML = `
        <div class="edit-modal" id="editModal">
            <div class="edit-modal-content">
                <div class="edit-modal-header">
                    <h3>Edit Message</h3>
                    <button class="close-btn" onclick="closeEditModal()">
                        <i class='bx bx-x'></i>
                    </button>
                </div>
                <form id="editMessageForm">
                    <input type="hidden" name="message_id" value="${messageId}">
                    <div class="input-box">
                        <input type="text" name="full_name" placeholder="Full Name" value="${fullName}" required>
                        <input type="email" name="email" placeholder="Email Address" value="${email}" required>
                    </div>
                    <textarea name="message_content" cols="30" rows="10" placeholder="Your Message" required>${messageContent}</textarea>
                    <div class="edit-form-actions">
                        <button type="button" class="btn cancel-btn" onclick="closeEditModal()">Cancel</button>
                        <button type="submit" class="btn">Update Message</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listener to form
    document.getElementById('editMessageForm').addEventListener('submit', function(e) {
        e.preventDefault();
        updateMessageStatic();
    });
    
    // Focus on first input
    setTimeout(() => {
        document.querySelector('#editModal input[name="full_name"]').focus();
    }, 100);
}

function updateMessageStatic() {
    const form = document.getElementById('editMessageForm');
    const formData = new FormData(form);
    
    const messageId = parseInt(formData.get('message_id'));
    const fullName = formData.get('full_name');
    const email = formData.get('email');
    const messageContent = formData.get('message_content');
    
    // Validate inputs
    if (!fullName || !email || !messageContent) {
        showNotification('All fields are required', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Update message in static storage
    const messageIndex = staticMessages.findIndex(msg => msg.Message_ID === messageId);
    if (messageIndex !== -1) {
        staticMessages[messageIndex] = {
            ...staticMessages[messageIndex],
            Full_Name: fullName,
            Email: email,
            Message_Content: messageContent
        };
        
        // Update display
        displayMessagesStatic(staticMessages);
        
        // Show success message
        showNotification('Message updated successfully! (Demo mode)', 'success');
        closeEditModal();
    } else {
        showNotification('Message not found', 'error');
    }
}

function closeEditModal() {
    const modal = document.getElementById('editModal');
    if (modal) {
        modal.remove();
    }
}

function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="notification-close">
            <i class='bx bx-x'></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

window.deleteMessage = deleteMessage;
window.editMessage = editMessage;
window.updateMessageStatic = updateMessageStatic;
window.closeEditModal = closeEditModal;
window.showNotification = showNotification;

// Debug logging to ensure functions are loaded
console.log('Portfolio functions loaded:', {
    deleteMessage: typeof deleteMessage,
    editMessage: typeof editMessage,
    updateMessageStatic: typeof updateMessageStatic,
    closeEditModal: typeof closeEditModal,
    showNotification: typeof showNotification
}); 
