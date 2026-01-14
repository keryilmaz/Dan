// The Fix - Two Mode Experience
// Learn: Read the philosophy | Execute: Interactive fix

(function() {
    'use strict';

    // State
    let currentMode = 'learn';

    // Elements
    const synthesisModal = document.getElementById('synthesis-modal');
    const synthesisToggleBtn = document.getElementById('synthesis-toggle-btn');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalClose = document.getElementById('modal-close');
    const synthesisAntivision = document.getElementById('synthesis-antivision');
    const synthesisVision = document.getElementById('synthesis-vision');
    const learnMode = document.getElementById('learn-mode');
    const executeMode = document.getElementById('execute-mode');
    const modeBtns = document.querySelectorAll('.mode-btn');

    // Initialize
    function init() {
        setupTheme();
        setupModeToggle();
        setupSynthesisToggle();
        setupReset();
        loadSavedResponses();
        setupCommitment();
        setupProgressiveReveal();
        setupAutoSave();
        setupInterrupts();
        setupExport();
        restoreMode();
    }

    // Synthesis Modal
    function setupSynthesisToggle() {
        // Open modal
        synthesisToggleBtn?.addEventListener('click', () => {
            synthesisModal?.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close modal
        modalClose?.addEventListener('click', () => {
            closeModal();
        });

        modalBackdrop?.addEventListener('click', () => {
            closeModal();
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && synthesisModal?.classList.contains('active')) {
                closeModal();
            }
        });

        // Tab switching
        const tabButtons = document.querySelectorAll('.synthesis-tab');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.dataset.tab;
                
                // Update active tab button
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update active tab content
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`tab-${tabName}`)?.classList.add('active');
            });
        });
    }

    function closeModal() {
        synthesisModal?.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Theme Toggle
    function setupTheme() {
        const themeBtn = document.getElementById('theme-toggle');
        const savedTheme = localStorage.getItem('protocol-theme') || 'dark';
        
        // Apply saved theme
        if (savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        }

        // Toggle theme on click
        themeBtn?.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('protocol-theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('protocol-theme', 'light');
            }
        });
    }

    // Mode Toggle
    function setupModeToggle() {
        modeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.dataset.mode;
                switchMode(mode);
            });
        });

        // Start execute buttons in learn mode
        document.getElementById('start-execute')?.addEventListener('click', () => {
            switchMode('execute');
        });
        document.getElementById('start-execute-bottom')?.addEventListener('click', () => {
            switchMode('execute');
        });

        // Scroll down button
        document.getElementById('scroll-to-learn')?.addEventListener('click', () => {
            const firstSection = document.querySelector('#learn-mode .learn-section:nth-child(2)');
            if (firstSection) {
                firstSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    function switchMode(mode) {
        currentMode = mode;
        localStorage.setItem('protocol-mode', mode);

        // Update buttons
        modeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });

        // Update content
        if (mode === 'learn') {
            learnMode.classList.add('active');
            executeMode.classList.remove('active');
            synthesisToggleBtn?.classList.remove('visible');
            closeModal();
        } else {
            learnMode.classList.remove('active');
            executeMode.classList.add('active');
            // Show synthesis toggle button if data exists
            const savedAntivision = localStorage.getItem('protocol-antivision-statement');
            const savedVision = localStorage.getItem('protocol-vision-statement');
            if (savedAntivision || savedVision) {
                synthesisToggleBtn?.classList.add('visible');
            } else {
                synthesisToggleBtn?.classList.remove('visible');
            }
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function restoreMode() {
        const saved = localStorage.getItem('protocol-mode');
        if (saved) {
            switchMode(saved);
            // Scroll to last filled field after mode is restored
            setTimeout(() => {
                scrollToLastFilledField();
            }, 500);
        }
    }

    // Reset
    function setupReset() {
        const resetBtn = document.getElementById('reset-btn');
        if (!resetBtn) return;

        resetBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset? All your answers will be deleted.')) {
                // Clear all protocol data from localStorage
                const keysToRemove = [];
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith('protocol-')) {
                        keysToRemove.push(key);
                    }
                }
                keysToRemove.forEach(key => localStorage.removeItem(key));

                // Reset all form fields
                document.querySelectorAll('#execute-mode .response, #execute-mode .response-line').forEach(input => {
                    input.value = '';
                });

                // Hide all revealed sections and show only intro
                document.querySelectorAll('#execute-mode .block').forEach(block => {
                    if (block.id === 'block-intro') {
                        block.classList.remove('hidden');
                    } else {
                        block.classList.add('hidden');
                    }
                });

                // Hide all revealed question blocks (except first in each section)
                const firstQuestions = ['q1-block', 'q5-block', 'q9-block', 's1-block'];
                document.querySelectorAll('#execute-mode .question-block').forEach(qBlock => {
                    if (firstQuestions.includes(qBlock.id)) {
                        qBlock.classList.remove('hidden');
                    } else {
                        qBlock.classList.add('hidden');
                    }
                });

                // Hide all continue buttons in execute mode
                document.querySelectorAll('#execute-mode .continue-btn').forEach(btn => {
                    if (btn.id !== 'begin-btn') {
                        btn.classList.add('hidden');
                    }
                });

                // Reset commitment checkbox
                const commitment = document.getElementById('commitment');
                if (commitment) {
                    commitment.checked = false;
                }

                // Disable begin button
                const beginBtn = document.getElementById('begin-btn');
                if (beginBtn) {
                    beginBtn.disabled = true;
                }

                // Hide synthesis toggle and close modal
                synthesisToggleBtn?.classList.remove('visible');
                closeModal();
                synthesisAntivision.textContent = '—';
                synthesisVision.textContent = '—';

                // Switch to execute mode and scroll to top
                switchMode('execute');
                window.scrollTo(0, 0);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        });
    }

    // Commitment & Begin
    function setupCommitment() {
        const commitment = document.getElementById('commitment');
        const beginBtn = document.getElementById('begin-btn');

        if (!commitment || !beginBtn) return;

        commitment.addEventListener('change', () => {
            beginBtn.disabled = !commitment.checked;
        });

        beginBtn.addEventListener('click', () => {
            showBlock('block-excavation');
            scrollToBlock('block-excavation');
        });
    }

    // Progressive Reveal
    function setupProgressiveReveal() {
        const flows = {
            // Excavation
            'q1': { next: 'q2-block', revealBtn: null },
            'q2': { next: 'q3-block', revealBtn: null },
            'q3': { next: 'q4-block', revealBtn: null },
            'q4': { next: null, revealBtn: 'continue-antivision' },

            // Anti-vision
            'q5': { next: 'q6-block', revealBtn: null },
            'q6': { next: 'q7-block', revealBtn: null },
            'q7': { next: 'q8-block', revealBtn: null },
            'q8': { next: 'antivision-synthesis-block', revealBtn: null },
            'antivision-statement': { next: null, revealBtn: 'continue-vision', updateSynthesis: 'antivision' },

            // Vision
            'q9': { next: 'q10-block', revealBtn: null },
            'q10': { next: 'q11-block', revealBtn: null },
            'q11': { next: 'q12-block', revealBtn: null },
            'q12': { next: 'q13-block', revealBtn: null },
            'q13': { next: 'vision-synthesis-block', revealBtn: null },
            'vision-statement': { next: null, revealBtn: 'continue-interrupts', updateSynthesis: 'vision' },

            // Synthesis
            's1': { next: 's2-block', revealBtn: null },
            's2': { next: 's3-block', revealBtn: null },
            's3': { next: 's4-block', revealBtn: null },
            's4': { next: 's5-block', revealBtn: null },
            's5': { next: null, revealBtn: 'continue-final' },
        };

        // Attach listeners
        document.querySelectorAll('.response, .response-line').forEach(input => {
            const key = input.dataset.save;
            if (!key || !flows[key]) return;

            input.addEventListener('input', () => {
                const value = input.value.trim();
                if (value.length > 10) {
                    const flow = flows[key];
                    
                    if (flow.next) {
                        const nextEl = document.getElementById(flow.next);
                        if (nextEl && nextEl.classList.contains('hidden')) {
                            nextEl.classList.remove('hidden');
                            setTimeout(() => {
                                nextEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }, 100);
                        }
                    }

                    if (flow.revealBtn) {
                        const btn = document.getElementById(flow.revealBtn);
                        if (btn) btn.classList.remove('hidden');
                    }

                    if (flow.updateSynthesis) {
                        updateSynthesisBar(flow.updateSynthesis, value);
                    }
                }
            });
        });

        // Section navigation
        document.getElementById('continue-antivision')?.addEventListener('click', () => {
            showBlock('block-antivision');
            scrollToBlock('block-antivision');
        });

        document.getElementById('continue-vision')?.addEventListener('click', () => {
            showBlock('block-vision');
            scrollToBlock('block-vision');
        });

        document.getElementById('continue-interrupts')?.addEventListener('click', () => {
            showBlock('block-interrupts');
            scrollToBlock('block-interrupts');
        });

        document.getElementById('continue-synthesis')?.addEventListener('click', () => {
            showBlock('block-synthesis');
            scrollToBlock('block-synthesis');
        });

        document.getElementById('continue-final')?.addEventListener('click', () => {
            showBlock('block-final');
            populateFinalOutput();
            scrollToBlock('block-final');
        });
    }

    function showBlock(blockId) {
        const block = document.getElementById(blockId);
        if (block) {
            block.classList.remove('hidden');
        }
    }

    function scrollToBlock(blockId) {
        const block = document.getElementById(blockId);
        if (block) {
            setTimeout(() => {
                block.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }

    // Synthesis Bar
    function updateSynthesisBar(type, value) {
        if (type === 'antivision') {
            synthesisAntivision.textContent = truncate(value, 80);
        } else if (type === 'vision') {
            synthesisVision.textContent = truncate(value, 80);
        }

        const hasAntivision = synthesisAntivision.textContent !== '—';
        const hasVision = synthesisVision.textContent !== '—';
        
        if ((hasAntivision || hasVision) && currentMode === 'execute') {
            synthesisToggleBtn?.classList.add('visible');
        } else {
            synthesisToggleBtn?.classList.remove('visible');
        }
    }

    function truncate(str, max) {
        if (str.length <= max) return str;
        return str.substring(0, max).trim() + '...';
    }

    // Auto-save
    function setupAutoSave() {
        document.querySelectorAll('.response, .response-line').forEach(input => {
            const key = input.dataset.save;
            if (!key) return;

            let timeout;
            input.addEventListener('input', () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    localStorage.setItem(`protocol-${key}`, input.value);
                }, 500);
            });
        });
    }

    function loadSavedResponses() {
        // First, reveal all blocks that have saved content
        const flows = {
            'q1': { next: 'q2-block', revealBtn: null },
            'q2': { next: 'q3-block', revealBtn: null },
            'q3': { next: 'q4-block', revealBtn: null },
            'q4': { next: null, revealBtn: 'continue-antivision' },
            'q5': { next: 'q6-block', revealBtn: null },
            'q6': { next: 'q7-block', revealBtn: null },
            'q7': { next: 'q8-block', revealBtn: null },
            'q8': { next: 'antivision-synthesis-block', revealBtn: null },
            'antivision-statement': { next: null, revealBtn: 'continue-vision', updateSynthesis: 'antivision' },
            'q9': { next: 'q10-block', revealBtn: null },
            'q10': { next: 'q11-block', revealBtn: null },
            'q11': { next: 'q12-block', revealBtn: null },
            'q12': { next: 'q13-block', revealBtn: null },
            'q13': { next: 'vision-synthesis-block', revealBtn: null },
            'vision-statement': { next: null, revealBtn: 'continue-interrupts', updateSynthesis: 'vision' },
            's1': { next: 's2-block', revealBtn: null },
            's2': { next: 's3-block', revealBtn: null },
            's3': { next: 's4-block', revealBtn: null },
            's4': { next: 's5-block', revealBtn: null },
            's5': { next: null, revealBtn: 'continue-final' },
        };

        // Reveal all blocks that have saved content
        document.querySelectorAll('.response, .response-line').forEach(input => {
            const key = input.dataset.save;
            if (!key) return;

            const saved = localStorage.getItem(`protocol-${key}`);
            if (saved && saved.trim().length > 0) {
                input.value = saved;
                
                // Reveal this block's parent if hidden
                const questionBlock = input.closest('.question-block');
                if (questionBlock) {
                    questionBlock.classList.remove('hidden');
                }
                
                // Reveal the next block if this one has content
                if (flows[key] && flows[key].next && saved.trim().length > 10) {
                    const nextEl = document.getElementById(flows[key].next);
                    if (nextEl) {
                        nextEl.classList.remove('hidden');
                    }
                }
                
                // Reveal parent block if needed
                const parentBlock = input.closest('.block');
                if (parentBlock) {
                    parentBlock.classList.remove('hidden');
                }
            }
        });

        // Restore synthesis bar
        const savedAntivision = localStorage.getItem('protocol-antivision-statement');
        const savedVision = localStorage.getItem('protocol-vision-statement');
        
        if (savedAntivision) {
            updateSynthesisBar('antivision', savedAntivision);
        }
        if (savedVision) {
            updateSynthesisBar('vision', savedVision);
        }

        // Scroll to last filled field after a delay to ensure all blocks are revealed
        setTimeout(() => {
            scrollToLastFilledField();
        }, 500);
    }

    function scrollToLastFilledField() {
        // Only scroll if we're in execute mode
        if (currentMode !== 'execute') return;

        // Find all filled inputs in execute mode
        const filledInputs = Array.from(document.querySelectorAll('#execute-mode .response, #execute-mode .response-line'))
            .filter(input => {
                const value = input.value.trim();
                return value.length > 0;
            });

        if (filledInputs.length === 0) return;

        // Get the last filled input
        const lastFilled = filledInputs[filledInputs.length - 1];
        
        // Find the question block containing this input
        const questionBlock = lastFilled.closest('.question-block');
        if (questionBlock) {
            // Scroll to the question block with some offset for header
            const headerHeight = 48;
            const elementPosition = questionBlock.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerHeight - 20;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Interrupts / Reminders
    function setupInterrupts() {
        const activateBtn = document.getElementById('activate-interrupts');
        const statusEl = document.getElementById('interrupt-status');
        const continueBtn = document.getElementById('continue-synthesis');

        if (!activateBtn) return;

        // Setup time picker change handlers
        document.querySelectorAll('.custom-time-picker').forEach(picker => {
            const reminderId = picker.dataset.reminder;
            const hourSelect = picker.querySelector('.time-hour');
            const minuteSelect = picker.querySelector('.time-minute');
            
            // Load saved time or use default from data-time
            const savedTime = localStorage.getItem(`protocol-reminder-${reminderId}`);
            const defaultTime = picker.dataset.time || '11:00';
            const timeToUse = savedTime || defaultTime;
            
            const [hours, minutes] = timeToUse.split(':');
            hourSelect.value = hours.padStart(2, '0');
            // Round minutes to nearest 15, 30, or 45 (or 00)
            const min = parseInt(minutes);
            let roundedMin = '00';
            if (min <= 7) roundedMin = '00';
            else if (min <= 22) roundedMin = '15';
            else if (min <= 37) roundedMin = '30';
            else if (min <= 52) roundedMin = '45';
            else roundedMin = '00';
            minuteSelect.value = roundedMin;
            
            // Save on change
            const saveTime = () => {
                const time = `${hourSelect.value}:${minuteSelect.value}`;
                localStorage.setItem(`protocol-reminder-${reminderId}`, time);
            };
            
            hourSelect.addEventListener('change', saveTime);
            minuteSelect.addEventListener('change', saveTime);
        });

        activateBtn.addEventListener('click', async () => {
            if ('Notification' in window) {
                const permission = await Notification.requestPermission();
                
                if (permission === 'granted') {
                    scheduleReminders();
                    statusEl.textContent = 'Reminders activated. You will receive notifications.';
                    activateBtn.textContent = 'Reminders Active';
                    activateBtn.disabled = true;
                    continueBtn.classList.remove('hidden');
                } else {
                    statusEl.textContent = 'Notification permission denied. Use manual reminders.';
                    continueBtn.classList.remove('hidden');
                }
            } else {
                statusEl.textContent = 'Notifications not supported. Use manual reminders.';
                continueBtn.classList.remove('hidden');
            }
        });
    }

    function scheduleReminders() {
        const timePickers = document.querySelectorAll('.custom-time-picker');
        const questions = [
            'What am I avoiding right now?',
            'If someone filmed the last two hours, what would they conclude I want?',
            'Am I moving toward the life I hate or the life I want?',
            'What\'s the most important thing I\'m pretending isn\'t important?',
            'What did I do today out of identity protection rather than genuine desire?',
            'When did I feel most alive today? When did I feel most dead?'
        ];

        timePickers.forEach((picker, index) => {
            const hourSelect = picker.querySelector('.time-hour');
            const minuteSelect = picker.querySelector('.time-minute');
            const hours = parseInt(hourSelect.value);
            const minutes = parseInt(minuteSelect.value);
            const now = new Date();
            const reminderTime = new Date();
            reminderTime.setHours(hours, minutes, 0, 0);

            if (reminderTime <= now) return;

            const delay = reminderTime - now;

            setTimeout(() => {
                new Notification('The Fix', {
                    body: questions[index],
                    requireInteraction: true
                });
            }, delay);
        });
    }

    // Final Output
    function populateFinalOutput() {
        const mappings = {
            'final-antivision': 'protocol-antivision-statement',
            'final-vision': 'protocol-vision-statement',
            'final-enemy': 'protocol-s2',
            'final-year': 'protocol-s3',
            'final-month': 'protocol-s4',
            'final-tomorrow': 'protocol-s5'
        };

        Object.entries(mappings).forEach(([elementId, storageKey]) => {
            const el = document.getElementById(elementId);
            const value = localStorage.getItem(storageKey);
            if (el && value) {
                el.textContent = value;
            }
        });
    }

    // Export
    function setupExport() {
        const exportBtn = document.getElementById('export-btn');
        if (!exportBtn) return;

        exportBtn.addEventListener('click', () => {
            const data = gatherAllResponses();
            const markdown = formatExportMarkdown(data);
            downloadText(markdown, 'the-fix.md');
        });
    }

    function gatherAllResponses() {
        const data = {};
        
        // Gather all text responses
        document.querySelectorAll('.response, .response-line').forEach(input => {
            const key = input.dataset.save;
            if (key && input.value.trim()) {
                data[key] = input.value.trim();
            }
        });
        
        // Gather reminder times
        const reminders = [];
        document.querySelectorAll('.custom-time-picker').forEach((picker, index) => {
            const hourSelect = picker.querySelector('.time-hour');
            const minuteSelect = picker.querySelector('.time-minute');
            if (hourSelect && minuteSelect) {
                const time = `${hourSelect.value}:${minuteSelect.value}`;
                const question = picker.nextElementSibling?.textContent || `Reminder ${index + 1}`;
                reminders.push({ time, question });
            }
        });
        data.reminders = reminders;
        
        return data;
    }

    function formatExportMarkdown(data) {
        const date = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        let md = `# The Fix by Dan Koe\n\n`;
        md += `**Completed:** ${date}\n\n`;
        md += `---\n\n`;

        // Anti-Vision & Vision
        md += `## Anti-Vision & Vision\n\n`;
        md += `### Anti-Vision\n\n`;
        md += `${data['antivision-statement'] ? data['antivision-statement'] : '*Not completed*'}\n\n`;
        md += `### Vision\n\n`;
        md += `${data['vision-statement'] ? data['vision-statement'] : '*Not completed*'}\n\n`;
        md += `---\n\n`;

        // Part 1: Excavation
        if (data['q1'] || data['q2'] || data['q3'] || data['q4']) {
            md += `## Part 1: Excavation\n\n`;
            
            if (data['q1']) {
                md += `### What is the dull, persistent dissatisfaction you've learned to live with?\n\n`;
                md += `${data['q1']}\n\n`;
            }
            
            if (data['q2']) {
                md += `### What do you complain about repeatedly but never change?\n\n`;
                md += `${data['q2']}\n\n`;
            }
            
            if (data['q3']) {
                md += `### For each complaint: What would an observer conclude you actually want?\n\n`;
                md += `${data['q3']}\n\n`;
            }
            
            if (data['q4']) {
                md += `### What truth about your life would be unbearable to admit to someone you respect?\n\n`;
                md += `${data['q4']}\n\n`;
            }
            
            md += `---\n\n`;
        }

        // Part 2: Anti-Vision
        if (data['q5'] || data['q6'] || data['q7'] || data['q8']) {
            md += `## Part 2: Anti-Vision\n\n`;
            
            if (data['q5']) {
                md += `### If nothing changes for five years, describe an average Tuesday.\n\n`;
                md += `${data['q5']}\n\n`;
            }
            
            if (data['q6']) {
                md += `### Now ten years. What have you missed?\n\n`;
                md += `${data['q6']}\n\n`;
            }
            
            if (data['q7']) {
                md += `### End of life. You lived the safe version. What was the cost?\n\n`;
                md += `${data['q7']}\n\n`;
            }
            
            if (data['q8']) {
                md += `### Who is already living this future you described?\n\n`;
                md += `${data['q8']}\n\n`;
            }
            
            md += `---\n\n`;
        }

        // Part 3: Vision
        if (data['q9'] || data['q10'] || data['q11'] || data['q12'] || data['q13']) {
            md += `## Part 3: Vision\n\n`;
            
            if (data['q9']) {
                md += `### What identity would you have to give up to actually change?\n\n`;
                md += `${data['q9']}\n\n`;
            }
            
            if (data['q10']) {
                md += `### What is the most embarrassing reason you haven't changed?\n\n`;
                md += `${data['q10']}\n\n`;
            }
            
            if (data['q11']) {
                md += `### If your behavior is self-protection, what exactly are you protecting?\n\n`;
                md += `${data['q11']}\n\n`;
            }
            
            if (data['q12']) {
                md += `### Three years from now, what do you actually want?\n\n`;
                md += `${data['q12']}\n\n`;
            }
            
            if (data['q13']) {
                md += `### What would you have to believe about yourself for that life to feel natural?\n\n`;
                md += `${data['q13']}\n\n`;
            }
            
            md += `---\n\n`;
        }

        // Part 4: Interrupt Autopilot
        if (data.reminders && data.reminders.length > 0) {
            md += `## Part 4: Interrupt Autopilot\n\n`;
            md += `### Scheduled Reminders\n\n`;
            data.reminders.forEach((reminder, index) => {
                md += `**${reminder.time}** - ${reminder.question}\n\n`;
            });
            md += `---\n\n`;
        }

        if (data['day-insights']) {
            md += `### Day Insights\n\n`;
            md += `${data['day-insights']}\n\n`;
            md += `---\n\n`;
        }

        // Part 5: Synthesis
        if (data['s1'] || data['s2'] || data['s3'] || data['s4'] || data['s5']) {
            md += `## Part 5: Synthesis\n\n`;
            
            if (data['s1']) {
                md += `### After today, what feels most true about why you've been stuck?\n\n`;
                md += `${data['s1']}\n\n`;
            }
            
            if (data['s2']) {
                md += `### What is the actual enemy?\n\n`;
                md += `${data['s2']}\n\n`;
            }
            
            if (data['s3']) {
                md += `### One-year lens: What would have to be true for you to know you've broken the pattern?\n\n`;
                md += `${data['s3']}\n\n`;
            }
            
            if (data['s4']) {
                md += `### One-month lens: What would have to be true for the one-year to remain possible?\n\n`;
                md += `${data['s4']}\n\n`;
            }
            
            if (data['s5']) {
                md += `### Tomorrow: What are 2-3 actions the person you're becoming would simply do?\n\n`;
                md += `${data['s5']}\n\n`;
            }
        }

        md += `\n---\n\n`;
        md += `*This is just the beginning. Movement is what matters now.*\n\n`;
        md += `*Generated by The Fix by Dan Koe*\n`;

        return md;
    }

    function downloadText(text, filename) {
        const blob = new Blob([text], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Start
    document.addEventListener('DOMContentLoaded', init);
})();
