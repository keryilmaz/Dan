// The Protocol - Two Mode Experience
// Learn: Read the philosophy | Execute: Interactive protocol

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
        document.querySelectorAll('.response, .response-line').forEach(input => {
            const key = input.dataset.save;
            if (!key) return;

            const saved = localStorage.getItem(`protocol-${key}`);
            if (saved) {
                input.value = saved;
                input.dispatchEvent(new Event('input'));
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
    }

    // Interrupts / Reminders
    function setupInterrupts() {
        const activateBtn = document.getElementById('activate-interrupts');
        const statusEl = document.getElementById('interrupt-status');
        const continueBtn = document.getElementById('continue-synthesis');

        if (!activateBtn) return;

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
        const timeInputs = document.querySelectorAll('.time-input');
        const questions = [
            'What am I avoiding right now?',
            'If someone filmed the last two hours, what would they conclude I want?',
            'Am I moving toward the life I hate or the life I want?',
            'What\'s the most important thing I\'m pretending isn\'t important?',
            'What did I do today out of identity protection rather than genuine desire?',
            'When did I feel most alive today? When did I feel most dead?'
        ];

        timeInputs.forEach((input, index) => {
            const [hours, minutes] = input.value.split(':').map(Number);
            const now = new Date();
            const reminderTime = new Date();
            reminderTime.setHours(hours, minutes, 0, 0);

            if (reminderTime <= now) return;

            const delay = reminderTime - now;

            setTimeout(() => {
                new Notification('The Protocol', {
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
            const text = formatExport(data);
            downloadText(text, 'the-protocol.txt');
        });
    }

    function gatherAllResponses() {
        const data = {};
        document.querySelectorAll('.response, .response-line').forEach(input => {
            const key = input.dataset.save;
            if (key) {
                data[key] = input.value;
            }
        });
        return data;
    }

    function formatExport(data) {
        const date = new Date().toLocaleDateString();
        let text = `THE PROTOCOL\n`;
        text += `Completed: ${date}\n`;
        text += `${'='.repeat(50)}\n\n`;

        text += `ANTI-VISION\n${data['antivision-statement'] || '—'}\n\n`;
        text += `VISION\n${data['vision-statement'] || '—'}\n\n`;

        text += `${'='.repeat(50)}\n\n`;

        const labels = {
            'q1': 'Dull dissatisfaction',
            'q2': 'Repeated complaints',
            'q3': 'What behavior reveals',
            'q4': 'Unbearable truth',
            'q5': 'Five years unchanged',
            'q6': 'Ten years missed',
            'q7': 'End of life cost',
            'q8': 'Who lives this future',
            'q9': 'Identity to give up',
            'q10': 'Embarrassing reason',
            'q11': 'Self-protection',
            'q12': 'Three year vision',
            'q13': 'Identity statement',
            'day-insights': 'Day insights',
            's1': 'Why stuck',
            's2': 'The enemy',
            's3': 'One year lens',
            's4': 'One month lens',
            's5': 'Tomorrow actions'
        };

        Object.entries(labels).forEach(([key, label]) => {
            if (data[key]) {
                text += `${label.toUpperCase()}\n${data[key]}\n\n`;
            }
        });

        return text;
    }

    function downloadText(text, filename) {
        const blob = new Blob([text], { type: 'text/plain' });
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
