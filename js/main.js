/* ===== elements.js ===== */
﻿// Inline icon SVGs (replaces Font Awesome to avoid a large blocking CSS request)
const ICONS = {
    copy: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    times: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    trash: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    chevronDown: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>',
    chevronUp: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"/></svg>'
};

// Element Definitions
const ELEMENT_CATEGORIES = {
    'Date & Time': [
        { id: 'date', name: 'Date', code: '\\D{%Y-%m-%d}', preview: '2026-03-08', icon: 'DATE' },
        { id: 'custom_date', name: 'Custom date / time', code: '\\D{%Y-%m-%d %H:%M:%S}', preview: '2026-03-08 14:30:45', icon: 'DT' },
        { id: 'time24h', name: 'Time (24-hour)', code: '\\t', preview: '\\t', icon: 'T24' },
        { id: 'time12h', name: 'Time (12-hour)', code: '\\D{%I:%M %p}', preview: '02:30 PM', icon: 'T12' },
        { id: 'time_ampm', name: 'Time (AM/PM)', code: '\\D{%p}', preview: 'PM', icon: 'AMPM' },
        { id: 'time_no_sec', name: 'Time (24h no seconds)', code: '\\D{%H:%M}', preview: '14:30', icon: 'HM' },
        { id: 'unix_time', name: 'Unix timestamp', code: '\\D{%s}', preview: '1741414245', icon: 'UNIX' },
        { id: 'timezone', name: 'Time zone', code: '\\D{%Z}', preview: 'CET', icon: 'TZ' }
    ],
    'User': [
        { id: 'username', name: 'Username', code: '\\u', preview: 'neiki', icon: 'USR' },
        { id: 'user_root', name: 'User / Root indicator', code: '\\#', preview: '$', icon: 'ROOT' },
        { id: 'uid', name: 'User ID', code: '\\$(id -u)', preview: '1000', icon: 'UID' }
    ],
    'Host & System': [
        { id: 'hostname_short', name: 'Hostname (short)', code: '\\h', preview: 'mypc', icon: 'HOST' },
        { id: 'hostname_full', name: 'Hostname (full)', code: '\\H', preview: 'mypc.example.com', icon: 'HOSTF' },
        { id: 'shell_name', name: 'Shell name', code: '\\l', preview: 'pts/0', icon: 'TTY' },
        { id: 'bash_version', name: 'Bash version', code: '\\${BASH_VERSION%.*}', preview: '5.2', icon: 'BASH' },
        { id: 'bash_full', name: 'Bash version (full)', code: '\\${BASH_VERSION}', preview: '5.2.21', icon: 'BASHF' },
        { id: 'terminal', name: 'Terminal device', code: '\\l', preview: 'pts/1', icon: 'TERM' },
        { id: 'shell_level', name: 'Shell level', code: '\\${SHLVL}', preview: '1', icon: 'SHLVL' }
    ],
    'Directory': [
        { id: 'pwd_full', name: 'Current directory (full path)', code: '\\w', preview: '/home/neiki/projects', icon: 'PWD' },
        { id: 'pwd_name', name: 'Current directory (folder name)', code: '\\W', preview: 'projects', icon: 'DIR' },
        { id: 'pwd_home', name: 'Path with home shortcut', code: '\\${PWD/#$HOME/~}', preview: '~/projects', icon: 'HOME' },
        { id: 'pwd_prev', name: 'Previous directory', code: '\\${OLDPWD/#$HOME/~}', preview: '~/documents', icon: 'OLDPWD' },
        { id: 'pwd_depth', name: 'Directory depth', code: '\\$(pwd | tr -cd / | wc -c)', preview: '3', icon: 'DEPTH' }
    ],
    'Commands & History': [
        { id: 'history_num', name: 'Command history number', code: '\\!', preview: '245', icon: 'HIST' },
        { id: 'cmd_num', name: 'Command number in session', code: '\\#', preview: '42', icon: 'CMD' },
        { id: 'exit_status', name: 'Last command exit status', code: '\\$?', preview: '0', icon: 'STS' },
        { id: 'success_indicator', name: 'Success indicator', code: '\\$([ $? -eq 0 ] && echo "OK" || echo "ERR")', preview: 'OK', icon: 'OK' },
        { id: 'error_indicator', name: 'Error indicator', code: '\\$([ $? -ne 0 ] && echo "ERR" || echo "OK")', preview: 'ERR', icon: 'ERR' }
    ],
    'Processes': [
        { id: 'bg_jobs', name: 'Background jobs count', code: '\\$(jobs -r | wc -l)', preview: '0', icon: 'JOB' },
        { id: 'shell_pid', name: 'Shell process ID', code: '\\$$', preview: '12545', icon: 'PID' },
        { id: 'parent_pid', name: 'Parent process ID', code: '\\${PPID}', preview: '12544', icon: 'PPID' },
        { id: 'running_procs', name: 'Running processes count', code: '\\$(ps -e --no-headers | wc -l)', preview: '145', icon: 'PROC' }
    ],
    'Version Control': [
        { id: 'git_branch', name: 'Git branch', code: '\\$(git branch --show-current 2>/dev/null)', preview: 'main', icon: 'GIT' },
        { id: 'git_commit', name: 'Git commit hash', code: '\\$(git rev-parse --short HEAD 2>/dev/null)', preview: 'a1b2c3d', icon: 'COMMIT' },
        { id: 'git_repo', name: 'Git repository name', code: '\\$(basename $(git rev-parse --show-toplevel) 2>/dev/null)', preview: 'bash-generator', icon: 'REPO' },
        { id: 'git_status', name: 'Git status (clean / dirty)', code: '\\$([ -z "$(git status -s 2>/dev/null)" ] && echo "OK" || echo "DIRTY")', preview: 'OK', icon: 'STATUS' },
        { id: 'git_staged', name: 'Git staged files count', code: '\\$(git diff --cached --name-only 2>/dev/null | wc -l)', preview: '2', icon: 'STAGED' }
    ],
    'Development Environments': [
        { id: 'python_venv', name: 'Python virtual environment', code: '\\${VIRTUAL_ENV##*/}', preview: 'venv', icon: 'PY' },
        { id: 'node_version', name: 'Node.js version', code: '\\$(node -v 2>/dev/null)', preview: 'v18.12.0', icon: 'NODE' },
        { id: 'ruby_version', name: 'Ruby version', code: '\\$(ruby -v 2>/dev/null | cut -d" " -f2)', preview: '3.1.2', icon: 'RUBY' },
        { id: 'go_version', name: 'Go version', code: '\\$(go version 2>/dev/null | cut -d" " -f3)', preview: 'go1.19', icon: 'GO' },
        { id: 'docker_context', name: 'Docker context', code: '\\$(docker context show 2>/dev/null)', preview: 'default', icon: 'DOCKER' },
        { id: 'k8s_context', name: 'Kubernetes context', code: '\\$(kubectl config current-context 2>/dev/null)', preview: 'minikube', icon: 'K8S' }
    ],
    'Network': [
        { id: 'local_ip', name: 'Local IP address', code: '\\$(hostname -I 2>/dev/null | awk "{print $1}")', preview: '192.168.1.100', icon: 'IP' },
        { id: 'public_ip', name: 'Public IP address', code: '\\$(curl -s https://ifconfig.me)', preview: '203.0.113.42', icon: 'PUBIP' },
        { id: 'ssh_indicator', name: 'SSH session indicator', code: '\\${SSH_CONNECTION:+ssh}', preview: 'ssh', icon: 'SSH' },
        { id: 'network_iface', name: 'Current network interface', code: '\\$(ip route show default 2>/dev/null | awk "NR==1{print $5}")', preview: 'eth0', icon: 'IFACE' }
    ],
    'Layout': [
        { id: 'newline', name: 'New line', code: '\\n', preview: '[NL]', icon: 'NL' },
        { id: 'carriage_return', name: 'Carriage return', code: '\\r', preview: '[CR]', icon: 'CR' },
        { id: 'space', name: 'Space', code: ' ', preview: ' ', icon: 'SP' },
        { id: 'tab', name: 'Tab', code: '\\t', preview: '[TAB]', icon: 'TAB' }
    ],
    'Characters': [
        { id: 'bell', name: 'Bell / beep', code: '\\a', preview: '[BELL]', icon: 'BELL' },
        { id: 'escape', name: 'Escape character', code: '\\e', preview: 'ESC', icon: 'ESC' },
        { id: 'backslash', name: 'Backslash character', code: '\\\\', preview: '\\\\', icon: 'BS' },
        { id: 'pipe', name: 'Pipe character', code: '|', preview: '|', icon: 'PIPE' }
    ],
    'Formatting': [
        { id: 'non_print_start', name: 'Start non-printing', code: '\\[', preview: '[', icon: 'NP1' },
        { id: 'non_print_end', name: 'End non-printing', code: '\\]', preview: ']', icon: 'NP2' },
        { id: 'text_color', name: 'Text color', code: '\\e[35m', preview: 'Color', icon: 'FG' },
        { id: 'bg_color', name: 'Background color', code: '\\e[45m', preview: 'BG', icon: 'BG' },
        { id: 'bold', name: 'Bold text', code: '\\e[1m', preview: 'Bold', icon: 'B' },
        { id: 'dim', name: 'Dim text', code: '\\e[2m', preview: 'Dim', icon: 'D' },
        { id: 'underline', name: 'Underline', code: '\\e[4m', preview: 'Under', icon: 'U' },
        { id: 'blink', name: 'Blink', code: '\\e[5m', preview: 'Blink', icon: 'BLK' },
        { id: 'reset', name: 'Reset formatting', code: '\\e[0m', preview: 'Reset', icon: 'RST' }
    ],
    'Icons / Symbols': [
        { id: 'git_icon', name: 'Git icon', code: '[GIT]', preview: '[GIT]', icon: 'GIT' },
        { id: 'folder_icon', name: 'Folder icon', code: '[DIR]', preview: '[DIR]', icon: 'DIR' },
        { id: 'user_icon', name: 'User icon', code: '[USR]', preview: '[USR]', icon: 'USR' },
        { id: 'host_icon', name: 'Host icon', code: '[HOST]', preview: '[HOST]', icon: 'HOST' },
        { id: 'time_icon', name: 'Time icon', code: '[TIME]', preview: '[TIME]', icon: 'TIME' },
        { id: 'error_icon', name: 'Error icon', code: '[ERR]', preview: '[ERR]', icon: 'ERR' },
        { id: 'success_icon', name: 'Success icon', code: '[OK]', preview: '[OK]', icon: 'OK' }
    ]
};

const SPECIAL_CHARS = [
    { char: 'Space', code: ' ', priority: 1 },
    { char: '~', code: '~', priority: 2 },
    { char: '!', code: '!', priority: 3 },
    { char: '?', code: '?', priority: 4 },
    { char: '@', code: '@', priority: 5 },
    { char: '#', code: '#', priority: 6 },
    { char: '$', code: '$', priority: 7 },
    { char: '%', code: '%', priority: 8 },
    { char: '^', code: '^', priority: 9 },
    { char: '&', code: '&', priority: 10 },
    { char: '*', code: '*', priority: 11 },
    { char: '(', code: '(', priority: 12 },
    { char: ')', code: ')', priority: 13 },
    { char: '{', code: '{', priority: 14 },
    { char: '}', code: '}', priority: 15 },
    { char: '[', code: '[', priority: 16 },
    { char: ']', code: ']', priority: 17 },
    { char: '-', code: '-', priority: 18 },
    { char: '_', code: '_', priority: 19 },
    { char: '+', code: '+', priority: 20 },
    { char: '=', code: '=', priority: 21 },
    { char: '/', code: '/', priority: 22 },
    { char: '\\', code: '\\', priority: 23 },
    { char: '|', code: '|', priority: 24 },
    { char: ',', code: ',', priority: 25 },
    { char: '.', code: '.', priority: 26 },
    { char: ':', code: ':', priority: 27 },
    { char: ';', code: ';', priority: 28 },
    { char: '"', code: '"', priority: 29 },
    { char: "'", code: "'", priority: 30 },
    { char: '<', code: '<', priority: 31 },
    { char: '>', code: '>', priority: 32 }
];

// Sample preview data
const PREVIEW_DATA = {
    date: '2026-03-08',
    time24h: '14:30:45',
    time12h: '02:30 PM',
    username: 'neiki',
    hostname: 'mypc',
    pwd: '/home/neiki/projects',
    git_branch: 'main',
    exit_status: '0'
};

/* ===== state.js ===== */
﻿// Global State
        let elements = [];
        let selectedElements = new Set();
        let elementIdCounter = 0;

        function isMobileViewport() {
            return window.innerWidth <= 768;
        }

        let lastMobileState = isMobileViewport();


/* ===== ui.js ===== */
﻿function openPropertiesDrawer() {
            if (!isMobileViewport()) return;
            const panel = document.querySelector('.right-panel');
            if (panel) panel.classList.add('mobile-open');
        }

        function closePropertiesDrawer() {
            const panel = document.querySelector('.right-panel');
            if (panel) panel.classList.remove('mobile-open');
        }

        // Render Elements Panel
        function renderElementsPanel() {
            const panel = document.getElementById('elementsPanel');
            panel.innerHTML = '';

            for (const [category, items] of Object.entries(ELEMENT_CATEGORIES)) {
                if (category === 'Formatting' || category === 'Icons / Symbols') continue;
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'category';

                const titleDiv = document.createElement('div');
                titleDiv.className = 'category-title';
                titleDiv.textContent = category;
                categoryDiv.appendChild(titleDiv);

                const gridDiv = document.createElement('div');
                gridDiv.className = 'elements-grid';

                for (const item of items) {
                    const btn = document.createElement('button');
                    btn.className = 'element-btn';
                    btn.textContent = item.name;
                    btn.title = item.name;
                    btn.onclick = () => addElement(item);
                    if (!isMobileViewport()) {
                        btn.draggable = true;
                        btn.setAttribute('data-element', JSON.stringify({ id: item.id, name: item.name, code: item.code, preview: item.preview }));
                        btn.ondragstart = (e) => {
                            e.dataTransfer.setData('application/json', e.target.getAttribute('data-element'));
                            e.dataTransfer.effectAllowed = 'copy';
                        };
                    }
                    gridDiv.appendChild(btn);
                }

                categoryDiv.appendChild(gridDiv);
                panel.appendChild(categoryDiv);
            }
        }

        // Render Special Characters
        function renderSpecialChars() {
            const container = document.getElementById('specialChars');
            container.innerHTML = '';

            SPECIAL_CHARS.forEach(spec => {
                const btn = document.createElement('button');
                btn.className = 'char-btn';
                btn.textContent = spec.char;
                btn.title = spec.char;
                const def = { id: 'char_' + Math.random(), name: spec.char, code: spec.code, preview: spec.char === 'Space' ? ' ' : spec.code };
                btn.onclick = () => addElement(def);
                if (!isMobileViewport()) {
                    btn.draggable = true;
                    btn.setAttribute('data-element', JSON.stringify(def));
                    btn.ondragstart = (e) => {
                        e.dataTransfer.setData('application/json', e.target.getAttribute('data-element'));
                        e.dataTransfer.effectAllowed = 'copy';
                    };
                }
                container.appendChild(btn);
            });
        }

        // Render Canvas
        function renderCanvas() {
            const canvas = document.getElementById('canvas');
            canvas.innerHTML = '';

            if (elements.length === 0) {
                const empty = document.createElement('div');
                empty.className = 'canvas-empty';
                if (isMobileViewport()) {
                    empty.innerHTML = `
                        <div class="canvas-empty-text">Add elements by tapping them in Prompt Elements above</div>
                    `;
                } else {
                    empty.innerHTML = `
                        <div class="canvas-empty-text">Drop elements here</div>
                        <div class="canvas-hint">or click on elements in the left panel to add</div>
                    `;
                }
                canvas.appendChild(empty);
                return;
            }

            const sortableList = document.createElement('div');
            sortableList.id = 'sortable-list';

            elements.forEach((elem, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'element-item' + (selectedElements.has(elem.id) ? ' selected' : '');
                itemDiv.draggable = true;
                itemDiv.dataset.elemId = elem.id;

                const styles = generateElementStyles(elem);

                itemDiv.innerHTML = `
                    <div class="element-content">
                        <span class="element-label">${elem.name}</span>
                        <span class="element-preview" style="${styles}">${elem.preview}</span>
                    </div>
                    <div class="element-actions">
                        <button class="btn-icon" title="Duplicate" onclick="event.stopPropagation(); duplicateElement('${elem.id}')">
                            ${ICONS.copy}
                        </button>
                        <button class="btn-icon" title="Delete" onclick="event.stopPropagation(); deleteElement('${elem.id}')">
                            ${ICONS.times}
                        </button>
                    </div>
                `;

                itemDiv.onclick = (e) => {
                    if (e.target.closest('.element-actions') || e.target.closest('.btn-icon')) {
                        return;
                    }

                    if (isMobileViewport()) {
                        selectedElements.clear();
                        selectedElements.add(elem.id);
                    } else {
                        if (selectedElements.has(elem.id)) {
                            selectedElements.delete(elem.id);
                        } else {
                            selectedElements.add(elem.id);
                        }
                    }
                    renderCanvas();
                    renderPropertiesPanel();
                    if (selectedElements.size > 0) openPropertiesDrawer();
                };

                sortableList.appendChild(itemDiv);
            });

            canvas.appendChild(sortableList);

            // Initialize Sortable
            Sortable.create(sortableList, {
                animation: 150,
                ghostClass: 'sortable-ghost',
                onEnd: () => {
                    const newOrder = Array.from(sortableList.children)
                        .map(div => elements.find(e => e.id === div.dataset.elemId))
                        .filter(Boolean);

                    if (newOrder.length === elements.length) {
                        elements = newOrder;
                    }

                    // Force a full re-render so mobile canvas order visually matches preview/state.
                    renderCanvas();
                    updatePreview();
                }
            });
        }

        // Render Properties Panel
        function renderPropertiesPanel() {
            const panel = document.getElementById('propertiesPanel');

            if (selectedElements.size === 0) {
                panel.innerHTML = '<div class="no-selection">Select an element to edit properties</div>';
                closePropertiesDrawer();
                return;
            }

            const selectedArray = Array.from(selectedElements).map(id => elements.find(e => e.id === id));
            panel.innerHTML = '';

            // Foreground Color
            const fgGroup = document.createElement('div');
            fgGroup.className = 'property-group';
            fgGroup.innerHTML = `
                <div class="property-label">Foreground Color</div>
                <div class="color-mode-tabs">
                    <button class="color-mode-tabs button active" onclick="switchColorMode('fg', 'hex')">Hex</button>
                    <button class="color-mode-tabs button" onclick="switchColorMode('fg', 'ansi')">ANSI</button>
                    <button class="color-mode-tabs button" onclick="switchColorMode('fg', 'truecolor')">True</button>
                </div>
                <div class="color-picker-group">
                    <input type="color" class="color-input" id="fgColorInput" 
                        value="${selectedArray[0]?.fgColor || '#00ff00'}"
                        onchange="updateSelectedElements('fgColor', this.value)">
                    <input type="text" class="color-value" id="fgValue" 
                        value="${selectedArray[0]?.fgColor || '#00ff00'}"
                        onchange="updateSelectedElements('fgColor', this.value)">
                </div>
                <div class="color-palette" id="fgPalette"></div>
            `;
            panel.appendChild(fgGroup);

            // Background Color
            const bgGroup = document.createElement('div');
            bgGroup.className = 'property-group';
            bgGroup.innerHTML = `
                <div class="property-label">Background Color</div>
                <div class="color-picker-group">
                    <input type="color" class="color-input" id="bgColorInput" 
                        value="${selectedArray[0]?.bgColor || '#000000'}"
                        onchange="updateSelectedElements('bgColor', this.value)">
                    <input type="text" class="color-value" id="bgValue" 
                        value="${selectedArray[0]?.bgColor || '#000000'}"
                        onchange="updateSelectedElements('bgColor', this.value)">
                </div>
                <div class="color-palette" id="bgPalette"></div>
            `;
            panel.appendChild(bgGroup);

            // Text Attributes
            const attrsGroup = document.createElement('div');
            attrsGroup.className = 'property-group';
            attrsGroup.innerHTML = `
                <div class="property-label">Text Attributes</div>
                <div class="attributes-grid">
                    <div class="attr-checkbox">
                        <input type="checkbox" id="boldAttr" 
                            ${selectedArray[0]?.bold ? 'checked' : ''} 
                            onchange="updateSelectedElements('bold', this.checked)">
                        <label for="boldAttr"><strong>Bold</strong></label>
                    </div>
                    <div class="attr-checkbox">
                        <input type="checkbox" id="dimAttr" 
                            ${selectedArray[0]?.dim ? 'checked' : ''} 
                            onchange="updateSelectedElements('dim', this.checked)">
                        <label for="dimAttr"><em>Dim</em></label>
                    </div>
                    <div class="attr-checkbox">
                        <input type="checkbox" id="italicAttr" 
                            ${selectedArray[0]?.italic ? 'checked' : ''} 
                            onchange="updateSelectedElements('italic', this.checked)">
                        <label for="italicAttr"><i>Italic</i></label>
                    </div>
                    <div class="attr-checkbox">
                        <input type="checkbox" id="underlineAttr" 
                            ${selectedArray[0]?.underline ? 'checked' : ''} 
                            onchange="updateSelectedElements('underline', this.checked)">
                        <label for="underlineAttr"><u>Underline</u></label>
                    </div>
                    <div class="attr-checkbox">
                        <input type="checkbox" id="blinkAttr" 
                            ${selectedArray[0]?.blink ? 'checked' : ''} 
                            onchange="updateSelectedElements('blink', this.checked)">
                        <label for="blinkAttr">Blink</label>
                    </div>
                    <div class="attr-checkbox">
                        <input type="checkbox" id="invertedAttr" 
                            ${selectedArray[0]?.inverted ? 'checked' : ''} 
                            onchange="updateSelectedElements('inverted', this.checked)">
                        <label for="invertedAttr">Inverted</label>
                    </div>
                </div>
            `;
            panel.appendChild(attrsGroup);

            // Action Buttons (side by side)
            const actionsGroup = document.createElement('div');
            actionsGroup.className = 'property-group';
            actionsGroup.innerHTML = `
                <div class="property-actions-row">
                    <button class="btn-primary" onclick="duplicateSelectedElements()" title="Duplicate Selected">
                        ${ICONS.copy} Duplicate
                    </button>
                    <button class="btn-danger" onclick="deleteSelectedElements()" title="Delete Selected">
                        ${ICONS.trash} Delete
                    </button>
                </div>
            `;
            panel.appendChild(actionsGroup);

            renderColorPalette('fgPalette', 'fgColor');
            renderColorPalette('bgPalette', 'bgColor');
        }

        // Render Color Palette
        function renderColorPalette(paletteId, property) {
            const palette = document.getElementById(paletteId);
            const colors = [
                '#000000', '#ff0000', '#00ff00', '#ffff00',
                '#0000ff', '#ff00ff', '#00ffff', '#ffffff',
                '#808080', '#ff6b6b', '#51cf66', '#ffd43b'
            ];

            colors.forEach(color => {
                const swatch = document.createElement('div');
                swatch.className = 'color-swatch';
                swatch.style.backgroundColor = color;
                swatch.onclick = () => {
                    updateSelectedElements(property, color);
                    renderPropertiesPanel();
                };
                palette.appendChild(swatch);
            });
        }

        function togglePanel(panelType) {
            if (panelType === 'right' && isMobileViewport()) {
                const rightPanel = document.querySelector('.right-panel');
                if (rightPanel) rightPanel.classList.toggle('mobile-open');
                return;
            }

            if (panelType === 'left' && isMobileViewport()) {
                const leftPanel = document.querySelector('.left-panel');
                if (!leftPanel) return;

                leftPanel.classList.toggle('collapsed');
                const leftToggle = document.querySelectorAll('.panel-toggle')[0];
                if (leftToggle) {
                    const isCollapsed = leftPanel.classList.contains('collapsed');
                    leftToggle.innerHTML = `${isCollapsed ? ICONS.chevronDown : ICONS.chevronUp} Prompt Elements`;
                }
                return;
            }

            const panel = panelType === 'left' ? document.querySelector('.left-panel') : document.querySelector('.right-panel');
            const toggle = panelType === 'left' ? document.querySelectorAll('.panel-toggle')[0] : document.querySelectorAll('.panel-toggle')[1];

            panel.classList.toggle('active');

            if (toggle) {
                if (panel.classList.contains('active')) {
                    toggle.innerHTML = `${ICONS.chevronUp} ${panelType === 'left' ? 'Prompt Elements' : 'Element Properties'}`;
                } else {
                    toggle.innerHTML = `${ICONS.chevronDown} ${panelType === 'left' ? 'Prompt Elements' : 'Element Properties'}`;
                }
            }
        }




/* ===== logic.js ===== */
﻿// Add Element to Canvas (insertIndex = undefined means append at end)
        // Each instance gets unique id; templateId preserves type for preview/code.
        function addElement(elementDef, insertIndex) {
            const templateId = elementDef.id;
            const element = {
                ...elementDef,
                id: 'elem_' + (elementIdCounter++),
                templateId: templateId,
                fgColor: '#00ff00',
                bgColor: 'transparent',
                bold: false,
                dim: false,
                italic: false,
                underline: false,
                blink: false,
                inverted: false
            };

            if (insertIndex !== undefined && insertIndex >= 0 && insertIndex <= elements.length) {
                elements.splice(insertIndex, 0, element);
            } else {
                elements.push(element);
            }
            renderCanvas();
            updatePreview();
        }

        // Generate Element Styles
        function generateElementStyles(elem) {
            let style = 'padding-top: 10px; ';
            
            if (elem.bold) style += 'font-weight: bold; ';
            if (elem.dim) style += 'opacity: 0.6; ';
            if (elem.italic) style += 'font-style: italic; ';
            if (elem.underline) style += 'text-decoration: underline; ';
            if (elem.fgColor !== '#00ff00') style += `color: ${elem.fgColor}; `;
            if (elem.bgColor !== 'transparent') style += `background-color: ${elem.bgColor}; padding: 2px 4px; border-radius: 2px; `;

            return style;
        }

        // Generate ANSI code from element
        function generateAnsiCode(elem) {
            let code = '';

            // Color codes
            if (elem.fgColor && elem.fgColor !== '#00ff00') {
                const rgb = hexToRgb(elem.fgColor);
                code += `\\e[38;2;${rgb.r};${rgb.g};${rgb.b}m`;
            }

            if (elem.bgColor && elem.bgColor !== 'transparent') {
                const rgb = hexToRgb(elem.bgColor);
                code += `\\e[48;2;${rgb.r};${rgb.g};${rgb.b}m`;
            }

            // Text attributes
            if (elem.bold) code += '\\e[1m';
            if (elem.dim) code += '\\e[2m';
            if (elem.italic) code += '\\e[3m';
            if (elem.underline) code += '\\e[4m';
            if (elem.blink) code += '\\e[5m';
            if (elem.inverted) code += '\\e[7m';

            return code;
        }

        // Convert hex to RGB
        function hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : { r: 0, g: 255, b: 0 };
        }

        // Duplicate Element
        function duplicateElement(elemId) {
            const elem = elements.find(e => e.id === elemId);
            const copy = { ...elem, id: 'elem_' + (elementIdCounter++) };
            const index = elements.findIndex(e => e.id === elemId);
            elements.splice(index + 1, 0, copy);
            renderCanvas();
            updatePreview();
        }

        // Delete Element
        function deleteElement(elemId) {
            elements = elements.filter(e => e.id !== elemId);
            selectedElements.delete(elemId);
            renderCanvas();
            renderPropertiesPanel();
            if (selectedElements.size === 0) closePropertiesDrawer();
            updatePreview();
        }

        // Setup Canvas Drop Zone (PC: accept drop from Prompt Elements, support insert between)
        function setupCanvasDropZone() {
            const canvas = document.getElementById('canvas');

            canvas.addEventListener('dragover', (e) => {
                if (isMobileViewport()) return;
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';
                canvas.classList.add('drag-over');
            });

            canvas.addEventListener('dragleave', (e) => {
                if (!canvas.contains(e.relatedTarget)) canvas.classList.remove('drag-over');
            });

            canvas.addEventListener('drop', (e) => {
                e.preventDefault();
                canvas.classList.remove('drag-over');
                if (isMobileViewport()) return;
                const json = e.dataTransfer.getData('application/json');
                if (!json) return;
                let def;
                try {
                    def = JSON.parse(json);
                } catch (err) {
                    return;
                }
                let insertIndex = elements.length;
                const target = e.target.closest('.element-item');
                if (target && target.dataset.elemId) {
                    const idx = elements.findIndex(el => el.id === target.dataset.elemId);
                    if (idx !== -1) {
                        const rect = target.getBoundingClientRect();
                        insertIndex = e.clientY < rect.top + rect.height / 2 ? idx : idx + 1;
                    }
                } else {
                    const sortableList = document.getElementById('sortable-list');
                    if (sortableList && sortableList.children.length) {
                        const children = Array.from(sortableList.children);
                        for (let i = 0; i < children.length; i++) {
                            const r = children[i].getBoundingClientRect();
                            if (e.clientY < r.top + r.height / 2) {
                                insertIndex = i;
                                break;
                            }
                            insertIndex = i + 1;
                        }
                    }
                }
                addElement(def, insertIndex);
            });
        }

        // Update Selected Elements
        function updateSelectedElements(property, value) {
            selectedElements.forEach(id => {
                const elem = elements.find(e => e.id === id);
                if (elem) {
                    elem[property] = value;
                    const input = document.getElementById(property === 'fgColor' ? 'fgColorInput' : property === 'bgColor' ? 'bgColorInput' : null);
                    const valueInput = document.getElementById(property === 'fgColor' ? 'fgValue' : property === 'bgColor' ? 'bgValue' : null);
                    if (input) input.value = value;
                    if (valueInput) valueInput.value = value;
                }
            });
            renderCanvas();
            updatePreview();
        }

        // Duplicate Selected Elements
        function duplicateSelectedElements() {
            const selectedArray = Array.from(selectedElements).map(id => elements.find(e => e.id === id));
            const copies = selectedArray.map(elem => ({
                ...elem,
                id: 'elem_' + (elementIdCounter++)
            }));
            elements.push(...copies);
            selectedElements.clear();
            renderCanvas();
            updatePreview();
        }

        // Delete Selected Elements
        function deleteSelectedElements() {
            selectedElements.forEach(id => {
                elements = elements.filter(e => e.id !== id);
            });
            selectedElements.clear();
            renderCanvas();
            renderPropertiesPanel();
            if (selectedElements.size === 0) closePropertiesDrawer();
            updatePreview();
        }

        // Escape content for a single-quoted PS1 assignment
        function escapePromptContent(code) {
            return String(code).replace(/'/g, "'\\''");
        }
        // Update Preview
        function updatePreview() {
            const preview = document.getElementById('preview');
            const codeOutput = document.getElementById('codeOutput');

            let previewHtml = '';
            let promptCode = "PS1='";

            elements.forEach(elem => {
                // Generate preview text with actual values (use templateId for type)
                const typeId = elem.templateId || elem.id;
                let previewValue = elem.preview;
                switch (typeId) {
                    case 'time24h':
                        previewValue = new Date().toLocaleTimeString('en-US', { hour12: false });
                        break;
                    case 'custom_date':
                        const d = new Date();
                        previewValue = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0') + ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') + ':' + String(d.getSeconds()).padStart(2, '0');
                        break;
                    case 'date':
                        previewValue = new Date().toISOString().split('T')[0];
                        break;
                    case 'time12h':
                        previewValue = new Date().toLocaleTimeString('en-US', { hour12: true });
                        break;
                    case 'username':
                        previewValue = 'neiki';
                        break;
                    case 'pwd_full':
                        previewValue = '/home/neiki/projects';
                        break;
                    case 'pwd_name':
                        previewValue = 'projects';
                        break;
                    case 'hostname_short':
                        previewValue = 'mypc';
                        break;
                    case 'hostname_full':
                        previewValue = 'mypc.example.com';
                        break;
                    case 'git_branch':
                        previewValue = 'main';
                        break;
                }

                // Generate CSS for element styling
                let styles = generateElementStyles(elem);
                let styledPreview = `<span style="${styles}">${previewValue}</span>`;

                previewHtml += styledPreview;

                const ansiPrefix = generateAnsiCode(elem);
                if (ansiPrefix) {
                    promptCode += escapePromptContent(`\\[${ansiPrefix}\\]`);
                }

                promptCode += escapePromptContent(elem.code);

                if (ansiPrefix) {
                    promptCode += escapePromptContent('\\[\\e[0m\\]');
                }
            });

            if (elements.length > 0) {
                promptCode += "'";
            } else {
                promptCode = "PS1=''";
            }

            // Add cursor to preview
            preview.innerHTML = previewHtml + (elements.length > 0 ? '<span style="animation: blink 1s infinite;">_</span>' : '');
            codeOutput.textContent = promptCode;
        }

        function switchColorMode(type, mode) {
            // Placeholder for color mode switching
            console.log(`Switching ${type} to ${mode} mode`);
        }




/* ===== app.js ===== */
﻿// Theme Toggle
        function toggleTheme() {
            const html = document.documentElement;
            const isDark = html.classList.contains('dark');
            if (isDark) {
                html.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
            updateThemeToggle();
        }

        function updateThemeToggle() {
            const sw = document.getElementById('themeSwitch');
            if (!sw) return;
            const isDark = document.documentElement.classList.contains('dark');
            sw.title = isDark ? 'Switch to light theme' : 'Switch to dark theme';
            sw.setAttribute('aria-checked', isDark ? 'false' : 'true');
        }

// Initialize App
        function init() {
            updateThemeToggle();
            renderElementsPanel();
            renderSpecialChars();
            renderCanvas();
            renderPropertiesPanel();
            updatePreview();
            setupCanvasDropZone();
            setupButtonHandlers();
        }

        // Setup Button Handlers
        function setupButtonHandlers() {
            document.getElementById('copyBtn').onclick = () => {
                const code = document.getElementById('codeOutput').textContent;
                navigator.clipboard.writeText(code).then(() => {
                    const btn = document.getElementById('copyBtn');
                    btn.classList.add('copied');
                    btn.textContent = 'Copied!';
                    setTimeout(() => {
                        btn.classList.remove('copied');
                        btn.innerHTML = `${ICONS.copy} Copy to Clipboard`;
                    }, 2000);
                });
            };

            document.getElementById('resetBtn').onclick = () => {
                if (confirm('Reset all element properties (colors and attributes) to defaults?')) {
                    elements.forEach(elem => {
                        elem.fgColor = '#00ff00';
                        elem.bgColor = 'transparent';
                        elem.bold = false;
                        elem.dim = false;
                        elem.italic = false;
                        elem.underline = false;
                        elem.blink = false;
                        elem.inverted = false;
                    });
                    renderCanvas();
                    renderPropertiesPanel();
                    updatePreview();
                }
            };

            document.getElementById('deleteBtn').onclick = () => {
                if (confirm('Are you sure you want to delete all elements?')) {
                    elements = [];
                    selectedElements.clear();
                    renderCanvas();
                    renderPropertiesPanel();
                    if (selectedElements.size === 0) closePropertiesDrawer();
                    updatePreview();
                }
            };
        }

        function initMobileResponsiveness() {
            const nowMobile = isMobileViewport();
            if (!nowMobile) closePropertiesDrawer();
            if (lastMobileState !== nowMobile) {
                lastMobileState = nowMobile;
                renderElementsPanel();
                renderSpecialChars();
            }
        }

        window.addEventListener('resize', initMobileResponsiveness);

        // Rocket Loader can execute this script after DOMContentLoaded has fired.
        function startApp() {
            init();
            initMobileResponsiveness();
        }

        if (document.readyState === 'loading') {
            window.addEventListener('DOMContentLoaded', startApp, { once: true });
        } else {
            startApp();
        }




