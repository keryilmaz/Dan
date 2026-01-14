// ============================================================================
// THE PROTOCOL - Interactive Journey
// ============================================================================

class ProtocolApp {
    constructor() {
        this.currentSection = 'intro';
        this.reminders = [];
        this.reminderIntervals = [];
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupCommitmentCheck();
        this.setupConceptCards();
        this.setupProtocolTabs();
        this.setupTextareas();
        this.setupReminders();
        this.setupExport();
        this.loadSavedData();
        this.updateProgress();
    }

    // ========================================================================
    // NAVIGATION
    // ========================================================================

    setupNavigation() {
        // Nav links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.navigateTo(section);
            });
        });

        // Begin button
        const beginBtn = document.getElementById('begin-btn');
        if (beginBtn) {
            beginBtn.addEventListener('click', () => {
                this.navigateTo('concepts');
            });
        }

        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const next = btn.dataset.next;
                this.navigateTo(next);
            });
        });

        // Setup reminders button
        const setupRemindersBtn = document.getElementById('setup-reminders-btn');
        if (setupRemindersBtn) {
            setupRemindersBtn.addEventListener('click', () => {
                this.navigateTo('protocol');
                // Switch to day tab
                const dayTab = document.querySelector('[data-tab="day"]');
                if (dayTab) dayTab.click();
            });
        }
    }

    navigateTo(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
            window.scrollTo(0, 0);
            this.updateProgress();
        }
    }

    updateProgress() {
        const sections = ['intro', 'concepts', 'protocol', 'gameplan'];
        const currentIndex = sections.indexOf(this.currentSection);
        const progress = ((currentIndex + 1) / sections.length) * 100;

        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
    }

    // ========================================================================
    // COMMITMENT CHECK
    // ========================================================================

    setupCommitmentCheck() {
        const checkbox = document.getElementById('commitment');
        const beginBtn = document.getElementById('begin-btn');

        if (checkbox && beginBtn) {
            checkbox.addEventListener('change', () => {
                beginBtn.disabled = !checkbox.checked;
            });
        }
    }

    // ========================================================================
    // CONCEPT CARDS
    // ========================================================================

    setupConceptCards() {
        document.querySelectorAll('.concept-card').forEach(card => {
            const expandBtn = card.querySelector('.expand-btn');
            const content = card.querySelector('.concept-content');

            if (expandBtn && content) {
                expandBtn.addEventListener('click', () => {
                    const isActive = content.classList.contains('active');

                    if (isActive) {
                        content.classList.remove('active');
                        expandBtn.textContent = 'Explore ↓';
                    } else {
                        content.classList.add('active');
                        expandBtn.textContent = 'Collapse ↑';
                    }
                });
            }
        });
    }

    // ========================================================================
    // PROTOCOL TABS
    // ========================================================================

    setupProtocolTabs() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;

                // Remove active from all tabs
                document.querySelectorAll('.tab-btn').forEach(b => {
                    b.classList.remove('active');
                });

                // Remove active from all content
                document.querySelectorAll('.protocol-content').forEach(content => {
                    content.classList.remove('active');
                });

                // Add active to clicked tab
                btn.classList.add('active');

                // Show corresponding content
                const content = document.querySelector(`[data-content="${tab}"]`);
                if (content) {
                    content.classList.add('active');
                }
            });
        });
    }

    // ========================================================================
    // TEXTAREAS & AUTO-SAVE
    // ========================================================================

    setupTextareas() {
        document.querySelectorAll('.response-area').forEach(textarea => {
            // Update word count
            const updateWordCount = () => {
                const text = textarea.value.trim();
                const words = text ? text.split(/\s+/).length : 0;
                const wordCountEl = textarea.nextElementSibling;
                if (wordCountEl && wordCountEl.classList.contains('word-count')) {
                    wordCountEl.textContent = `${words} words`;
                }
            };

            // Auto-save to localStorage
            const saveData = () => {
                const key = textarea.dataset.save;
                if (key) {
                    localStorage.setItem(`protocol_${key}`, textarea.value);
                }
            };

            textarea.addEventListener('input', () => {
                updateWordCount();
                saveData();
            });

            // Initial word count
            updateWordCount();
        });
    }

    loadSavedData() {
        document.querySelectorAll('.response-area').forEach(textarea => {
            const key = textarea.dataset.save;
            if (key) {
                const saved = localStorage.getItem(`protocol_${key}`);
                if (saved) {
                    textarea.value = saved;
                    // Trigger input event to update word count
                    textarea.dispatchEvent(new Event('input'));
                }
            }
        });
    }

    // ========================================================================
    // REMINDERS & NOTIFICATIONS
    // ========================================================================

    setupReminders() {
        const activateBtn = document.getElementById('activate-reminders-btn');
        const statusEl = document.getElementById('reminder-status');

        if (activateBtn) {
            activateBtn.addEventListener('click', () => {
                this.activateReminders(statusEl);
            });
        }
    }

    async activateReminders(statusEl) {
        // Request notification permission
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();

            if (permission !== 'granted') {
                statusEl.textContent = '⚠ Notification permission denied. Please enable notifications for this site.';
                statusEl.style.borderColor = '#000';
                return;
            }
        } else {
            statusEl.textContent = '⚠ Notifications not supported in this browser.';
            return;
        }

        // Clear existing reminders
        this.clearReminders();

        // Get reminder times
        const timeInputs = document.querySelectorAll('.time-input');
        const reminderQuestions = [
            'What am I avoiding right now by doing what I\'m doing?',
            'If someone filmed the last two hours, what would they conclude I want from my life?',
            'Am I moving toward the life I hate or the life I want?',
            'What\'s the most important thing I\'m pretending isn\'t important?',
            'What did I do today out of identity protection rather than genuine desire?',
            'When did I feel most alive today? When did I feel most dead?'
        ];

        let scheduledCount = 0;

        timeInputs.forEach((input, index) => {
            const time = input.value;
            if (time) {
                const [hours, minutes] = time.split(':').map(Number);
                const now = new Date();
                const reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

                // If time has passed today, schedule for tomorrow
                if (reminderTime < now) {
                    reminderTime.setDate(reminderTime.getDate() + 1);
                }

                const timeUntilReminder = reminderTime - now;

                // Schedule reminder
                const timeoutId = setTimeout(() => {
                    this.showNotification(reminderQuestions[index]);
                }, timeUntilReminder);

                this.reminders.push(timeoutId);
                scheduledCount++;

                // Also check every minute if we've reached the time
                const intervalId = setInterval(() => {
                    const currentTime = new Date();
                    if (currentTime.getHours() === hours && currentTime.getMinutes() === minutes) {
                        this.showNotification(reminderQuestions[index]);
                    }
                }, 60000); // Check every minute

                this.reminderIntervals.push(intervalId);
            }
        });

        if (scheduledCount > 0) {
            statusEl.textContent = `✓ ${scheduledCount} reminders activated! You'll receive notifications at the scheduled times.`;
            statusEl.style.borderColor = '#000';
            statusEl.style.background = '#000';
            statusEl.style.color = '#fff';
        } else {
            statusEl.textContent = '⚠ No valid times entered. Please set times for your reminders.';
        }
    }

    showNotification(question) {
        if ('Notification' in window && Notification.permission === 'granted') {
            const notification = new Notification('THE PROTOCOL - Time to Reflect', {
                body: question,
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="black"/><text x="50" y="55" font-family="monospace" font-size="40" fill="white" text-anchor="middle">!</text></svg>',
                requireInteraction: true
            });

            notification.onclick = () => {
                window.focus();
                this.navigateTo('protocol');
                notification.close();
            };
        }
    }

    clearReminders() {
        this.reminders.forEach(id => clearTimeout(id));
        this.reminderIntervals.forEach(id => clearInterval(id));
        this.reminders = [];
        this.reminderIntervals = [];
    }

    // ========================================================================
    // EXPORT FUNCTIONALITY
    // ========================================================================

    setupExport() {
        const exportTextBtn = document.getElementById('export-text-btn');
        const exportPdfBtn = document.getElementById('export-pdf-btn');

        if (exportTextBtn) {
            exportTextBtn.addEventListener('click', () => {
                this.exportAsText();
            });
        }

        if (exportPdfBtn) {
            exportPdfBtn.addEventListener('click', () => {
                this.exportAsPDF();
            });
        }
    }

    getAllResponses() {
        const responses = {
            morning: {},
            day: {},
            evening: {},
            gameplan: {}
        };

        // Collect all responses
        document.querySelectorAll('.response-area').forEach(textarea => {
            const key = textarea.dataset.save;
            if (key && textarea.value.trim()) {
                if (key.startsWith('morning-')) {
                    responses.morning[key] = textarea.value;
                } else if (key.startsWith('day-')) {
                    responses.day[key] = textarea.value;
                } else if (key.startsWith('evening-')) {
                    responses.evening[key] = textarea.value;
                } else if (key.startsWith('gameplan-')) {
                    responses.gameplan[key] = textarea.value;
                }
            }
        });

        return responses;
    }

    exportAsText() {
        const responses = this.getAllResponses();
        const date = new Date().toLocaleDateString();

        let text = '================================================================================\n';
        text += '                          THE PROTOCOL - YOUR JOURNEY\n';
        text += `                              ${date}\n`;
        text += '================================================================================\n\n';

        // Morning Session
        if (Object.keys(responses.morning).length > 0) {
            text += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
            text += 'PART 1: MORNING SESSION - PSYCHOLOGICAL EXCAVATION\n';
            text += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

            const morningQuestions = [
                'What is the dull and persistent dissatisfaction you\'ve learned to live with?',
                'What do you complain about repeatedly but never actually change?',
                'For each complaint: What would someone watching your behavior conclude you want?',
                'What truth about your current life would be unbearable to admit?',
                'If nothing changes for five years, describe an average Tuesday.',
                'Now ten years. What have you missed? What opportunities closed?',
                'You\'re at the end of your life. You lived the safe version. What was the cost?',
                'Who in your life is already living this future?',
                'What identity would you have to give up to actually change?',
                'What is the most embarrassing reason you haven\'t changed?',
                'If your current behavior is self-protection, what are you protecting?',
                'Forget practicality. What do you actually want in three years?',
                'What would you have to believe about yourself for that life to feel natural?',
                'What is one thing you would do this week if you were already that person?'
            ];

            Object.keys(responses.morning).sort().forEach((key, index) => {
                text += `Q${index + 1}: ${morningQuestions[index]}\n\n`;
                text += `${responses.morning[key]}\n\n`;
                text += '────────────────────────────────────────────────────────────────────────────\n\n';
            });
        }

        // Day Insights
        if (Object.keys(responses.day).length > 0) {
            text += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
            text += 'PART 2: THROUGHOUT THE DAY - INSIGHTS\n';
            text += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

            Object.keys(responses.day).forEach(key => {
                text += `${responses.day[key]}\n\n`;
            });
        }

        // Evening Session
        if (Object.keys(responses.evening).length > 0) {
            text += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
            text += 'PART 3: EVENING SESSION - SYNTHESIS\n';
            text += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

            const eveningQuestions = [
                'After today, what feels most true about why you\'ve been stuck?',
                'What is the actual enemy?',
                'Your anti-vision in one sentence:',
                'Your vision in one sentence:',
                'One-year lens:',
                'One-month lens:',
                'Daily lens:'
            ];

            Object.keys(responses.evening).sort().forEach((key, index) => {
                text += `${eveningQuestions[index]}\n\n`;
                text += `${responses.evening[key]}\n\n`;
                text += '────────────────────────────────────────────────────────────────────────────\n\n';
            });
        }

        // Game Plan
        if (Object.keys(responses.gameplan).length > 0) {
            text += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
            text += 'YOUR GAME PLAN\n';
            text += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

            const gameplanLabels = {
                'gameplan-antivision': 'ANTI-VISION (What\'s at stake)',
                'gameplan-vision': 'VISION (How you win)',
                'gameplan-year': '1 YEAR GOAL (The mission)',
                'gameplan-month': '1 MONTH PROJECT (Boss fight)',
                'gameplan-daily': 'DAILY LEVERS (Quests)',
                'gameplan-constraints': 'CONSTRAINTS (Rules)'
            };

            Object.keys(gameplanLabels).forEach(key => {
                if (responses.gameplan[key]) {
                    text += `${gameplanLabels[key]}\n\n`;
                    text += `${responses.gameplan[key]}\n\n`;
                    text += '────────────────────────────────────────────────────────────────────────────\n\n';
                }
            });
        }

        text += '================================================================================\n';
        text += '"Trust only movement. Life happens at the level of events, not of words."\n';
        text += '                                                            - Alfred Adler\n';
        text += '================================================================================\n';

        // Download
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `the-protocol-${date.replace(/\//g, '-')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    exportAsPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const responses = this.getAllResponses();
        const date = new Date().toLocaleDateString();

        const margin = 20;
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const maxWidth = pageWidth - (margin * 2);
        let y = margin;

        // Helper function to add text with wrapping
        const addText = (text, size = 10, isBold = false) => {
            doc.setFontSize(size);
            if (isBold) {
                doc.setFont('courier', 'bold');
            } else {
                doc.setFont('courier', 'normal');
            }

            const lines = doc.splitTextToSize(text, maxWidth);
            lines.forEach(line => {
                if (y + 10 > pageHeight - margin) {
                    doc.addPage();
                    y = margin;
                }
                doc.text(line, margin, y);
                y += 6;
            });
            y += 4;
        };

        // Title
        addText('THE PROTOCOL - YOUR JOURNEY', 16, true);
        addText(date, 10);
        y += 10;

        // Morning Session
        if (Object.keys(responses.morning).length > 0) {
            addText('PART 1: MORNING SESSION', 14, true);
            y += 5;

            const morningQuestions = [
                'Q1: What is the dull and persistent dissatisfaction?',
                'Q2: What do you complain about but never change?',
                'Q3: What would someone watching your behavior conclude?',
                'Q4: What truth would be unbearable to admit?',
                'Q5: Five years, same life - describe Tuesday.',
                'Q6: Ten years - what did you miss?',
                'Q7: End of life, safe version - what was the cost?',
                'Q8: Who is living this future now?',
                'Q9: What identity must you give up?',
                'Q10: Most embarrassing reason you haven\'t changed?',
                'Q11: What are you protecting?',
                'Q12: What do you actually want in three years?',
                'Q13: What would you need to believe?',
                'Q14: One thing you\'d do this week if you were that person?'
            ];

            Object.keys(responses.morning).sort().forEach((key, index) => {
                addText(morningQuestions[index], 10, true);
                addText(responses.morning[key], 10);
                y += 5;
            });
        }

        // Day Insights
        if (Object.keys(responses.day).length > 0) {
            if (y > pageHeight - 50) {
                doc.addPage();
                y = margin;
            }
            addText('PART 2: DAY INSIGHTS', 14, true);
            y += 5;
            Object.keys(responses.day).forEach(key => {
                addText(responses.day[key], 10);
            });
        }

        // Evening Session
        if (Object.keys(responses.evening).length > 0) {
            if (y > pageHeight - 50) {
                doc.addPage();
                y = margin;
            }
            addText('PART 3: EVENING SESSION', 14, true);
            y += 5;

            const eveningQuestions = [
                'Why you\'ve been stuck:',
                'The actual enemy:',
                'Anti-vision (one sentence):',
                'Vision (one sentence):',
                'One-year lens:',
                'One-month lens:',
                'Daily lens:'
            ];

            Object.keys(responses.evening).sort().forEach((key, index) => {
                addText(eveningQuestions[index], 10, true);
                addText(responses.evening[key], 10);
                y += 5;
            });
        }

        // Game Plan
        if (Object.keys(responses.gameplan).length > 0) {
            if (y > pageHeight - 50) {
                doc.addPage();
                y = margin;
            }
            addText('YOUR GAME PLAN', 14, true);
            y += 5;

            const gameplanLabels = {
                'gameplan-antivision': 'ANTI-VISION',
                'gameplan-vision': 'VISION',
                'gameplan-year': '1 YEAR GOAL',
                'gameplan-month': '1 MONTH PROJECT',
                'gameplan-daily': 'DAILY LEVERS',
                'gameplan-constraints': 'CONSTRAINTS'
            };

            Object.keys(gameplanLabels).forEach(key => {
                if (responses.gameplan[key]) {
                    addText(gameplanLabels[key], 10, true);
                    addText(responses.gameplan[key], 10);
                    y += 5;
                }
            });
        }

        // Save
        doc.save(`the-protocol-${date.replace(/\//g, '-')}.pdf`);
    }
}

// ============================================================================
// INITIALIZE APP
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    new ProtocolApp();
});
