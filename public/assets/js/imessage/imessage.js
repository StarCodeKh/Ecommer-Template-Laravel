class Message {
    constructor(toastId) {
        this.insertStyles();
        this.toastContainer = document.querySelector('.toast-container') || this.createContainer();
        this.toastElement = this.createToast(toastId);
        this.toastContainer.appendChild(this.toastElement);
        this.toastInstance = new bootstrap.Toast(this.toastElement);
    }

    insertStyles() {
        if (!document.getElementById('toast-styles')) {
            document.head.insertAdjacentHTML('beforeend', `
                <style id="toast-styles">
                    @keyframes slideFromTop { 
                        0% { transform: translateY(-20px); opacity: 0; } 
                        100% { transform: translateY(0); opacity: 1; } 
                    }
                </style>
            `);
        }
    }

    createContainer(position = "top-right") {
        const container = document.createElement('div');
        container.className = `toast-container position-fixed p-3 ${this.getPositionClass(position)}`;
        document.body.appendChild(container);
        return container;
    }

    createToast(id) {
        const toast = document.createElement('div');
        toast.id = id;
        toast.className = 'toast align-items-center border-0';
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'polite');
        toast.setAttribute('aria-atomic', 'true');

        toast.innerHTML = `
            <div class="d-flex toast-content rounded-3">
                <div class="toast-body"></div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;

        this.toastBody = toast.querySelector('.toast-body');
        this.toastContent = toast.querySelector('.toast-content');
        return toast;
    }

    show(message = "Message sent successfully!", type = "success", position = "top-right", timeout = 3000) {
        this.toastContainer.className = `toast-container position-fixed p-3 ${this.getPositionClass(position)}`;

        const types = {
            success: 'bg-success bg-opacity-25 border-success border-opacity-75 rounded-2',
            warning: 'bg-warning bg-opacity-25 border-warning border-opacity-75 rounded-2',
            fail: 'bg-danger bg-opacity-25 border-danger border-opacity-75 rounded-2',
            info: 'bg-info bg-opacity-25 border-info border-opacity-75 rounded-2'
        };

        this.toastBody.innerHTML = message;
        this.toastContent.className = `d-flex ${types[type] || types.success}`;
        this.addIcon(type);
        this.toastInstance.show();

        // Hover behavior
        let timeoutId;
        const element = this.toastElement;

        const hideToast = () => {
            this.hide();
            element.removeEventListener('mouseenter', pauseTimer);
            element.removeEventListener('mouseleave', resumeTimer);
        };

        const pauseTimer = () => {
            clearTimeout(timeoutId);
        };

        const resumeTimer = () => {
            timeoutId = setTimeout(hideToast, timeout);
        };

        if (timeout) {
            timeoutId = setTimeout(hideToast, timeout);
            element.addEventListener('mouseenter', pauseTimer);
            element.addEventListener('mouseleave', resumeTimer);
        }
    }

    hide() {
        this.toastInstance.hide();
    }

    addIcon(type) {
        const icons = {
            success: ['ri-check-double-line label-icon fs-16', 'text-success'],
            warning: ['ri-alert-line label-icon fs-16', 'text-warning'],
            fail: ['ri-error-warning-line me-3 align-middle fs-16', 'text-danger'],
            info: ['ri-airplay-line label-icon', 'text-info']
        };
        const [iconClass, color] = icons[type] || icons.success;
        const icon = `<i class="fa-solid ${iconClass} me-2 ${color}" style="
            border: 2px solid ${this.getBorderColor(color)}; border-radius: 50%; padding: 8px;
            font-size: 12px; height: 16px; width: 16px; display: inline-flex; align-items: center;
            justify-content: center; animation: slideFromTop 0.5s ease-out; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);"></i>`;
        this.toastBody.innerHTML = icon + this.toastBody.innerHTML;
    }

    getBorderColor(colorClass) {
        const colorMap = {
            'text-success': '#198754',
            'text-warning': '#FFC107',
            'text-danger': '#DC3545',
            'text-info': '#0DCAF0'
        };
        return colorMap[colorClass] || '#000';
    }

    getPositionClass(position) {
        const positions = {
            "top-right": "top-0 end-0",
            "top-center": "top-0 start-50 translate-middle-x",
            "top-left": "top-0 start-0",
            "bottom-right": "bottom-0 end-0",
            "bottom-center": "bottom-0 start-50 translate-middle-x",
            "bottom-left": "bottom-0 start-0",
            "center": "top-50 start-50 translate-middle"
        };
        return positions[position] || positions["top-right"];
    }
}

// Example usage
const imessage = new Message('imessage');

// Example calls
// imessage.show("Default Success!", "success");
// imessage.show("Top Center Message!", "info", "top-center");
// imessage.show("Bottom Right Warning!", "warning", "bottom-right");
// imessage.show("Bottom Left Error!", "fail", "bottom-left");
// imessage.show("Centered Notification!", "info", "center");