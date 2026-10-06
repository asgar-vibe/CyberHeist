/**
 * CYBER HEIST // MISSION DATABASE & LEVEL REGISTRY (13 LEVELS)
 * Scalable level definitions for Computational Thinking puzzles.
 * Progressive curriculum from middle school to advanced cyber logic:
 * - Levels 1-3: Foundations (Indexing, Filtering, Binary Search)
 * - Levels 4-6: Cryptography & Modulo Arithmetic (Caesar, Parity, Sequences)
 * - Levels 7-9: Logic & Deduction (Contradictions, Range Overlaps, Nested Logic)
 * - Levels 10-13: Algorithmic Thinking (Min Search, Primes, Greedy SJF, Palindromes)
 */

const gameLevels = [
  // ========================================================
  // LEVEL 1: THE DECRYPTOR (String Indexing & Slicing)
  // ========================================================
  {
    id: 1,
    type: "slice",
    title: "THE DECRYPTOR // STRING SLICER",
    shortTitle: "DECRYPTOR",
    desc: 'We intercepted a corrupted data packet from the Omega mainframe. The authorization key "CYBER_VAULT" is buried inside. Extract it using Python slicing notation!',
    concept: '<strong class="text-cyber-green">String Slicing:</strong> In Computer Science, indexing starts at <strong>0</strong>. When taking a slice <code>string[A : B]</code>, character at index <code>A</code> is included, but slicing stops right before <code>B</code>!',
    handlerInitial: "Operative, scan the raw memory buffer above. Locate where 'CYBER_VAULT' begins and ends on the index ruler, then inject your slice parameters!",
    hints: [
      "Look at the index ruler above. 'C' is at index 4. 'T' is at index 14. Remember slicing stops right before the end index, so set the end index to 15!"
    ],
    rawData: "XF9_CYBER_VAULT_PASS_882",
    targetToken: "CYBER_VAULT",
    targetStart: 4,
    targetEnd: 15,
    specs: [
      { label: "TARGET TOKEN", value: '"CYBER_VAULT"', color: "text-cyber-green" },
      { label: "DATA TYPE", value: "string (length: 24)", color: "text-cyber-cyan" },
      { label: "OFFSET RULE", value: "raw_data[start_index : end_index]", color: "text-slate-300" }
    ],
    initialState: () => ({
      userStart: 0,
      userEnd: 5
    }),
    initialCode: `# LEVEL 1: MEMORY SLICE INJECTION
raw_data = "XF9_CYBER_VAULT_PASS_882"
# Enter start and end indices: raw_data[start:end]
access_key = raw_data[0:5]
print("KEY ACQUIRED:", access_key)`,

    renderClueBar: (container, level, state, game) => {
      const str = level.rawData;
      let html = `
        <div class="flex items-center justify-between mb-1 text-[11px]">
          <span class="text-slate-400 font-bold">MEMORY BUFFER & INDEX RULER:</span>
          <span class="text-cyber-orange text-[10px]">CLICK LETTER TO SELECT</span>
        </div>
        <div class="overflow-x-auto pb-1.5 flex gap-1 select-none">
      `;

      for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const isTarget = i >= level.targetStart && i < level.targetEnd;
        const isSelected = i >= state.userStart && i < state.userEnd;

        let charBg = 'bg-cyber-dark border-cyber-border text-slate-300';
        if (isSelected) {
          charBg = 'bg-cyber-green/20 border-cyber-green text-cyber-green shadow-[0_0_8px_rgba(0,255,102,0.4)]';
        } else if (isTarget) {
          charBg = 'bg-cyber-yellow/10 border-cyber-yellow/40 text-cyber-yellow';
        }

        html += `
          <div onclick="game.handleLevelAction('rulerClick', ${i})" 
               title="Index ${i}: '${char}'"
               class="flex flex-col items-center cursor-pointer transition hover:scale-105">
            <span class="text-[9px] font-mono text-slate-500 mb-0.5">${i}</span>
            <div class="w-6 h-7 rounded border flex items-center justify-center font-mono font-bold text-xs ${charBg}">
              ${char}
            </div>
          </div>
        `;
      }
      html += `</div>`;
      container.innerHTML = html;
    },

    renderEditorCode: (container, level, state, game) => {
      container.innerHTML = `
        <div class="text-slate-500 mb-1 select-none"># LEVEL 1: MEMORY SLICE INJECTION</div>
        <div class="text-slate-300 select-none">raw_data = <span class="text-cyber-orange">"${level.rawData}"</span></div>
        <div class="text-slate-500 my-1 select-none"># Enter start and end indices: raw_data[start:end]</div>
        <div class="flex items-center gap-1.5 my-2">
          <span class="text-cyber-cyan font-bold">access_key</span>
          <span class="text-slate-400">=</span>
          <span class="text-slate-300 font-bold">raw_data[</span>
          <input id="l1-code-start" type="number" min="0" max="${level.rawData.length}" value="${state.userStart}" 
                 oninput="game.handleLevelAction('codeInputChange')" 
                 class="w-14 bg-cyber-dark border border-cyber-border focus:border-cyber-green text-center text-cyber-green font-bold rounded py-0.5 outline-none">
          <span class="text-slate-400 font-bold">:</span>
          <input id="l1-code-end" type="number" min="0" max="${level.rawData.length}" value="${state.userEnd}" 
                 oninput="game.handleLevelAction('codeInputChange')" 
                 class="w-14 bg-cyber-dark border border-cyber-border focus:border-cyber-green text-center text-cyber-green font-bold rounded py-0.5 outline-none">
          <span class="text-slate-300 font-bold">]</span>
        </div>
        <div class="text-slate-500 mt-auto select-none">print("KEY ACQUIRED:", access_key)</div>
      `;
    },

    renderEditorBlocks: (container, level, state, game) => {
      container.innerHTML = `
        <div class="text-xs text-slate-300 font-mono">
          <div class="text-slate-400 mb-2 font-bold flex items-center gap-2">
            <span class="px-1.5 py-0.5 rounded bg-cyber-green/10 text-cyber-green border border-cyber-green/30">BLOCK 1</span>
            <span>SLICE CONFIGURATOR</span>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="p-2.5 rounded bg-cyber-dark border border-cyber-border">
              <label class="block text-[11px] text-slate-400 mb-1">START INDEX (Inclusive):</label>
              <div class="flex items-center gap-2">
                <input id="l1-block-start-slider" type="range" min="0" max="${level.rawData.length}" value="${state.userStart}" 
                       oninput="game.handleLevelAction('sliderChange', {type: 'start', val: this.value})" class="flex-1 accent-cyber-green cursor-pointer">
                <span id="l1-block-start-val" class="w-8 text-center font-bold text-cyber-green text-sm">${state.userStart}</span>
              </div>
            </div>

            <div class="p-2.5 rounded bg-cyber-dark border border-cyber-border">
              <label class="block text-[11px] text-slate-400 mb-1">END INDEX (Exclusive):</label>
              <div class="flex items-center gap-2">
                <input id="l1-block-end-slider" type="range" min="0" max="${level.rawData.length}" value="${state.userEnd}" 
                       oninput="game.handleLevelAction('sliderChange', {type: 'end', val: this.value})" class="flex-1 accent-cyber-cyan cursor-pointer">
                <span id="l1-block-end-val" class="w-8 text-center font-bold text-cyber-cyan text-sm">${state.userEnd}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="p-2 rounded bg-black/60 border border-cyber-border/70 text-[11px] text-slate-400 text-center">
          💡 Tip: Click directly on any letter in the ruler above to snap the slice to it!
        </div>
      `;
    },

    renderVisualizer: (container, level, state, game) => {
      const sliceResult = level.rawData.slice(state.userStart, state.userEnd);
      const isMatch = sliceResult === level.targetToken;

      container.innerHTML = `
        <div class="w-full h-full flex flex-col items-center justify-center p-2 text-center">
          <svg class="w-full h-24" viewBox="0 0 300 80" fill="none">
            <rect x="20" y="20" width="260" height="24" rx="4" fill="#0D1117" stroke="#1E293B" stroke-width="2"/>
            <rect x="${30 + (state.userStart * 8)}" y="20" 
                  width="${Math.max(12, (state.userEnd - state.userStart) * 9.5)}" 
                  height="24" rx="2" 
                  fill="${isMatch ? 'rgba(0, 255, 102, 0.4)' : 'rgba(0, 240, 255, 0.3)'}" 
                  stroke="${isMatch ? '#00FF66' : '#00F0FF'}" stroke-width="2"/>
            <line x1="${30 + (state.userStart * 8)}" y1="10" 
                  x2="${30 + (state.userEnd * 9.5)}" y2="10" 
                  stroke="${isMatch ? '#00FF66' : '#FF9900'}" stroke-width="3" stroke-dasharray="4 2"/>
            <text x="150" y="65" text-anchor="middle" fill="${isMatch ? '#00FF66' : '#94A3B8'}" font-family="monospace" font-size="11" font-weight="bold">
              ${isMatch ? '★ TARGET TOKEN LOCKED ★' : 'SCANNING RAW MEMORY OFFSETS...'}
            </text>
          </svg>
        </div>
      `;
    },

    getLivePreview: (state, level) => {
      const sliceVal = level.rawData.slice(state.userStart, state.userEnd);
      const isMatch = (sliceVal === level.targetToken);
      return {
        text: `"${sliceVal}"`,
        isMatch,
        statusText: isMatch ? "MATCH FOUND! READY TO INJECT" : `TARGET: "${level.targetToken}"`
      };
    },

    validate: (state, level) => {
      const start = parseInt(state.userStart) || 0;
      const end = parseInt(state.userEnd) || 0;
      const sliceVal = level.rawData.slice(start, end);
      const isMatch = (sliceVal === level.targetToken);

      return {
        success: isMatch,
        output: sliceVal,
        message: isMatch 
          ? `ACCESS GRANTED: SECURITY VAULT DECRYPTION COMPLETE!` 
          : `⚠️ ERROR: Key mismatch! Extracted "${sliceVal}", but security expects "${level.targetToken}". Adjust your slicing bounds!`,
        intelName: "Vault Decryption Token",
        intelValue: sliceVal,
        successModalDesc: `Extracted valid key "${sliceVal}" from memory offsets [${start}:${end}]. Security perimeter has been bypassed!`
      };
    },

    autoSolve: (state, level) => {
      state.userStart = level.targetStart;
      state.userEnd = level.targetEnd;
    }
  },


  // ========================================================
  // LEVEL 2: THE INTRUDER HUNT (Loops & Filtering)
  // ========================================================
  {
    id: 2,
    type: "filter",
    title: "INTRUDER HUNT // PACKET FILTER",
    shortTitle: "INTRUDER",
    desc: 'Omega Corporation is routing disguised cyber attacks through our network. Write a script to isolate IP addresses that logged > 10 attempts AND have suspicious == True!',
    concept: '<strong class="text-cyber-orange">Loops & Filter Logic:</strong> A <code>for</code> loop checks each item in a list one by one. The <code>and</code> operator requires <strong>both</strong> conditions to evaluate to <code>True</code> before appending to the list!',
    handlerInitial: "Warning! Malicious proxies are flooding our gateway. Inspect the log stream, build the quarantine loop condition, and flush the intruders into containment!",
    hints: [
      "The rogue bots made MORE than 10 attempts (attempts > 10) AND are marked suspicious (suspicious == True). Both conditions must match!"
    ],
    rawData: [
      { id: 1, ip: "192.168.1.42", attempts: 3, suspicious: false, country: "US", origin: "Staff LAN" },
      { id: 2, ip: "10.0.4.88", attempts: 18, suspicious: true, country: "RU", origin: "Rogue Proxy" },
      { id: 3, ip: "172.16.0.12", attempts: 7, suspicious: false, country: "DE", origin: "VPN Relay" },
      { id: 4, ip: "185.220.101.5", attempts: 42, suspicious: true, country: "NK", origin: "Tor Gateway" },
      { id: 5, ip: "192.168.1.105", attempts: 9, suspicious: true, country: "CN", origin: "Low Scan" },
      { id: 6, ip: "203.0.113.19", attempts: 27, suspicious: true, country: "IR", origin: "Bot Daemon" },
      { id: 7, ip: "10.0.0.1", attempts: 15, suspicious: false, country: "US", origin: "Internal Host" },
      { id: 8, ip: "198.51.100.77", attempts: 31, suspicious: true, country: "RO", origin: "DDOS Vector" }
    ],
    targetIps: ["10.0.4.88", "185.220.101.5", "203.0.113.19", "198.51.100.77"],
    specs: [
      { label: "TOTAL LOGS", value: "8 Packet Records", color: "text-cyber-green" },
      { label: "RULE 1", value: "log.attempts > 10", color: "text-cyber-orange" },
      { label: "RULE 2", value: "log.suspicious == True", color: "text-cyber-cyan" }
    ],
    initialState: () => ({
      op1: ">",
      val1: 10,
      logic: "and",
      val2: true,
      activeScanningId: null,
      quarantinedIps: []
    }),
    initialCode: `quarantined_ips = []
for log in server_logs:
    if log.attempts > 10 and log.suspicious == True:
        quarantined_ips.append(log.ip)
return quarantined_ips`,

    renderClueBar: (container, level, state, game) => {
      let html = `
        <div class="flex items-center justify-between mb-1.5 text-[11px]">
          <span class="text-slate-400 font-bold">INCOMING LOG RECORDS STREAM:</span>
          <span class="text-cyber-cyan text-[10px]">MONITORING ${level.rawData.length} SESSIONS</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5 max-h-20 overflow-y-auto pr-1">
      `;

      level.rawData.forEach(log => {
        const isThreat = level.targetIps.includes(log.ip);
        html += `
          <div id="log-card-${log.id}" class="p-1.5 rounded bg-cyber-dark border ${isThreat ? 'border-cyber-red/50 text-cyber-red' : 'border-cyber-border text-slate-300'} text-[10px] flex flex-col justify-between">
            <div class="flex items-center justify-between font-bold">
              <span>${log.ip}</span>
              <span>${log.country}</span>
            </div>
            <div class="text-[9px] text-slate-400 flex items-center justify-between mt-1">
              <span>Try: ${log.attempts}</span>
              <span class="${log.suspicious ? 'text-cyber-red' : 'text-slate-500'}">${log.suspicious ? '⚠️ SUS' : 'OK'}</span>
            </div>
          </div>
        `;
      });

      html += `</div>`;
      container.innerHTML = html;
    },

    renderEditorCode: (container, level, state, game) => {
      container.innerHTML = `
        <div class="text-slate-500 mb-1 select-none"># LEVEL 2: THREAT IDENTIFICATION PROTOCOL</div>
        <div class="text-slate-300 select-none">quarantined_ips = []</div>
        <div class="text-cyber-green font-bold select-none">for log in server_logs:</div>
        <div class="pl-4 my-1">
          <span class="text-slate-500 select-none"># Modify the conditional expression below:</span>
          <div class="flex flex-wrap items-center gap-1.5 my-1.5">
            <span class="text-cyber-yellow font-bold">if</span>
            <span class="text-slate-300">log.attempts</span>
            <select id="l2-code-op1" onchange="game.handleLevelAction('filterCodeChange')" class="bg-cyber-dark border border-cyber-border text-cyber-green font-bold rounded px-1.5 py-0.5 outline-none">
              <option value=">" ${state.op1 === '>' ? 'selected' : ''}>&gt;</option>
              <option value="<" ${state.op1 === '<' ? 'selected' : ''}>&lt;</option>
              <option value="==" ${state.op1 === '==' ? 'selected' : ''}>==</option>
              <option value=">=" ${state.op1 === '>=' ? 'selected' : ''}>&gt;=</option>
            </select>
            <input id="l2-code-val1" type="number" value="${state.val1}" oninput="game.handleLevelAction('filterCodeChange')" class="w-12 bg-cyber-dark border border-cyber-border text-center text-cyber-green font-bold rounded py-0.5 outline-none">
            <select id="l2-code-logic" onchange="game.handleLevelAction('filterCodeChange')" class="bg-cyber-dark border border-cyber-border text-cyber-cyan font-bold rounded px-1.5 py-0.5 outline-none">
              <option value="and" ${state.logic === 'and' ? 'selected' : ''}>and</option>
              <option value="or" ${state.logic === 'or' ? 'selected' : ''}>or</option>
            </select>
            <span class="text-slate-300">log.suspicious ==</span>
            <select id="l2-code-val2" onchange="game.handleLevelAction('filterCodeChange')" class="bg-cyber-dark border border-cyber-border text-cyber-orange font-bold rounded px-1.5 py-0.5 outline-none">
              <option value="True" ${state.val2 === true ? 'selected' : ''}>True</option>
              <option value="False" ${state.val2 === false ? 'selected' : ''}>False</option>
            </select>
            <span class="text-slate-300">:</span>
          </div>
          <div class="text-cyber-cyan select-none pl-4">quarantined_ips.append(log.ip)</div>
        </div>
        <div class="text-slate-500 mt-auto select-none">return quarantined_ips</div>
      `;
    },

    renderEditorBlocks: (container, level, state, game) => {
      container.innerHTML = `
        <div class="space-y-2.5 font-mono text-xs">
          <div class="p-2 rounded bg-cyber-dark border border-cyber-border flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-1.5 py-0.5 rounded bg-cyber-green/20 text-cyber-green font-bold text-[10px]">LOOP</span>
              <span class="text-slate-300 font-bold">FOR EACH <code class="text-cyber-green">log</code> IN <code class="text-slate-400">server_logs</code></span>
            </div>
            <span class="text-[10px] text-slate-500">ITERATOR</span>
          </div>

          <div class="p-2.5 rounded bg-cyber-dark border border-cyber-cyan/50 space-y-2">
            <div class="flex items-center justify-between">
              <span class="px-1.5 py-0.5 rounded bg-cyber-yellow/20 text-cyber-yellow font-bold text-[10px]">IF CONDITION</span>
              <span class="text-[10px] text-cyber-cyan">DUAL FILTER</span>
            </div>
            
            <div class="flex flex-wrap items-center gap-1.5 text-xs">
              <span class="text-slate-400">WHEN</span>
              <span class="px-1.5 py-0.5 rounded bg-black text-cyber-green font-bold border border-cyber-border">log.attempts</span>
              <select id="l2-block-op1" onchange="game.handleLevelAction('filterBlockChange')" class="bg-black border border-cyber-border text-cyber-green font-bold rounded px-2 py-1 outline-none cursor-pointer">
                <option value=">" ${state.op1 === '>' ? 'selected' : ''}>&gt; (GREATER THAN)</option>
                <option value="<" ${state.op1 === '<' ? 'selected' : ''}>&lt; (LESS THAN)</option>
                <option value="==" ${state.op1 === '==' ? 'selected' : ''}>== (EQUAL TO)</option>
                <option value=">=" ${state.op1 === '>=' ? 'selected' : ''}>&gt;= (GREATER OR EQUAL)</option>
              </select>
              <input id="l2-block-val1" type="number" value="${state.val1}" oninput="game.handleLevelAction('filterBlockChange')" class="w-14 bg-black border border-cyber-border text-center text-cyber-green font-bold rounded py-1 outline-none">
            </div>

            <div class="flex items-center gap-2">
              <select id="l2-block-logic" onchange="game.handleLevelAction('filterBlockChange')" class="bg-black border border-cyber-cyan text-cyber-cyan font-bold rounded px-2 py-1 outline-none text-xs cursor-pointer">
                <option value="and" ${state.logic === 'and' ? 'selected' : ''}>LOGICAL AND (BOTH MUST MATCH)</option>
                <option value="or" ${state.logic === 'or' ? 'selected' : ''}>LOGICAL OR (EITHER CAN MATCH)</option>
              </select>
            </div>

            <div class="flex flex-wrap items-center gap-1.5 text-xs">
              <span class="text-slate-400">AND</span>
              <span class="px-1.5 py-0.5 rounded bg-black text-cyber-orange font-bold border border-cyber-border">log.suspicious</span>
              <span class="text-slate-400">IS</span>
              <select id="l2-block-val2" onchange="game.handleLevelAction('filterBlockChange')" class="bg-black border border-cyber-border text-cyber-orange font-bold rounded px-2 py-1 outline-none cursor-pointer">
                <option value="True" ${state.val2 === true ? 'selected' : ''}>True (FLAGGED)</option>
                <option value="False" ${state.val2 === false ? 'selected' : ''}>False (UNFLAGGED)</option>
              </select>
            </div>
          </div>

          <div class="p-2 rounded bg-cyber-dark border border-cyber-border flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-1.5 py-0.5 rounded bg-cyber-orange/20 text-cyber-orange font-bold text-[10px]">THEN</span>
              <span class="text-cyber-orange font-bold">ISOLATE TO QUARANTINE CHAMBER</span>
            </div>
            <span class="text-[10px] text-cyber-orange">APPEND</span>
          </div>
        </div>
      `;
    },

    renderVisualizer: (container, level, state, game) => {
      const activeScanningId = state.activeScanningId;
      const quarantinedIps = state.quarantinedIps || [];

      container.innerHTML = `
        <div class="w-full h-full flex items-center justify-between gap-3 p-1">
          <div class="flex-1 bg-cyber-dark/80 rounded border border-cyber-border p-2 flex flex-col justify-between h-28">
            <div class="text-[10px] text-slate-400 font-bold uppercase flex items-center justify-between">
              <span>PACKET SCANNER</span>
              <span class="w-2 h-2 rounded-full bg-cyber-green animate-ping"></span>
            </div>
            <div class="text-center font-mono text-xs text-cyber-cyan font-bold">
              ${activeScanningId ? `SCANNING PKT #${activeScanningId}` : `BUFFER LOADED: ${level.rawData.length} PACKETS`}
            </div>
            <div class="w-full bg-black/60 rounded h-1.5 overflow-hidden">
              <div class="h-full bg-cyber-green animate-pulse" style="width: 100%"></div>
            </div>
          </div>

          <div class="flex flex-col items-center justify-center text-cyber-orange">
            <span class="text-xs">⚡</span>
            <span class="text-[9px] font-bold">FILTER</span>
          </div>

          <div class="flex-1 bg-cyber-dark/80 rounded border border-cyber-red/50 p-2 flex flex-col justify-between h-28 box-glow-red">
            <div class="text-[10px] text-cyber-red font-bold uppercase flex items-center justify-between">
              <span>QUARANTINE ZONE</span>
              <span class="text-[9px] font-mono">${quarantinedIps.length} LOCKED</span>
            </div>
            <div class="overflow-y-auto max-h-14 space-y-0.5 text-[9px] font-mono text-cyber-red">
              ${quarantinedIps.length === 0 ? '<div class="text-slate-500 italic text-center py-2">EMPTY</div>' : ''}
              ${quarantinedIps.map(ip => `<div class="bg-black/50 px-1 rounded flex items-center gap-1">🔒 <span>${ip}</span></div>`).join('')}
            </div>
          </div>
        </div>
      `;
    },

    evaluateMatches: (state, level) => {
      const { op1, val1, logic, val2 } = state;
      const matches = [];

      level.rawData.forEach(log => {
        let cond1 = false;
        if (op1 === '>') cond1 = log.attempts > val1;
        else if (op1 === '<') cond1 = log.attempts < val1;
        else if (op1 === '==') cond1 = log.attempts === val1;
        else if (op1 === '>=') cond1 = log.attempts >= val1;

        const cond2 = (log.suspicious === val2);

        let pass = false;
        if (logic === 'and') pass = (cond1 && cond2);
        else if (logic === 'or') pass = (cond1 || cond2);

        if (pass) matches.push(log.ip);
      });

      return matches;
    },

    getLivePreview: (state, level) => {
      const matches = level.evaluateMatches(state, level);
      const isExactMatch = (matches.length === level.targetIps.length && level.targetIps.every(ip => matches.includes(ip)));

      return {
        text: `[${matches.length} IPs Matched]`,
        isMatch: isExactMatch,
        statusText: isExactMatch ? "ALL 4 INTRUDERS IDENTIFIED!" : `TARGET: Exactly 4 Rogue IPs (Current: ${matches.length})`
      };
    },

    validate: (state, level) => {
      const matches = level.evaluateMatches(state, level);
      const isExactMatch = (matches.length === level.targetIps.length && level.targetIps.every(ip => matches.includes(ip)));

      return {
        success: isExactMatch,
        output: matches,
        message: isExactMatch
          ? "ACCESS GRANTED: ALL 4 ROGUE INTRUDERS TRAPPED IN QUARANTINE!"
          : `⚠️ LOGIC ERROR: Filter captured ${matches.length} IPs instead of the 4 exact rogue bot IPs. Check your '>' threshold and 'and' operator!`,
        intelName: "Quarantined Threat Botnet",
        intelValue: matches.join(", "),
        successModalDesc: `Your condition successfully filtered all 4 malicious bot IPs: ${matches.join(", ")}. Gateway node secured!`
      };
    },

    autoSolve: (state, level) => {
      state.op1 = '>';
      state.val1 = 10;
      state.logic = 'and';
      state.val2 = true;
    }
  },


  // ========================================================
  // LEVEL 3: OVERCLOCK SEARCH (Binary Search)
  // ========================================================
  {
    id: 3,
    type: "binary_search",
    title: "OVERCLOCK SEARCH // BINARY LOCATOR",
    shortTitle: "OVERCLOCK",
    desc: 'Omega’s final rootkit is hiding in a network port between 1 and 100. Our core processor is overheating! A linear 1-by-1 search is too slow. Use Binary Search to lock the port in 7 or fewer probes!',
    concept: '<strong class="text-cyber-cyan">Binary Search:</strong> When searching a sorted range, always probe the middle: <code>mid = (low + high) // 2</code>. Each probe eliminates <strong>half</strong> the entire search space!',
    handlerInitial: "Core temperature rising rapidly! Enter target port probes. The diagnostic radar will report HIGHER or LOWER. Halve the range on each step to bypass the meltdown!",
    hints: [
      "The target port is within the active range [low ... high]. Probe the exact midpoint: (low + high) // 2!"
    ],
    rawData: {
      minPort: 1,
      maxPort: 100,
      targetPort: 68,
      maxAttempts: 7,
      maxTemp: 100
    },
    specs: [
      { label: "PORT RANGE", value: "1 to 100", color: "text-cyber-green" },
      { label: "THERMAL CAPACITY", value: "MAX 7 PROBES", color: "text-cyber-red" },
      { label: "STRATEGY", value: "Binary Bisection O(log n)", color: "text-cyber-cyan" }
    ],
    initialState: () => ({
      currentLow: 1,
      currentHigh: 100,
      targetPort: 68,
      attemptsLeft: 7,
      overclockTemp: 25,
      lastProbe: 50,
      lastStatus: "IDLE",
      history: []
    }),
    initialCode: `# LEVEL 3: BINARY RANGE BISECTION SCRIPT
low = 1; high = 100
# Calculate the midpoint probe:
next_probe = (low + high) // 2 -> 50
if status == "HIGHER": low = mid + 1
elif status == "LOWER": high = mid - 1
else: LOCKED_ROOTKIT_FOUND()`,

    renderClueBar: (container, level, state, game) => {
      container.innerHTML = `
        <div class="flex items-center justify-between mb-1.5 text-[11px]">
          <span class="text-slate-400 font-bold">CORE THERMAL & ATTEMPTS METER:</span>
          <span class="text-cyber-red font-bold">OVERHEAT WARNING</span>
        </div>
        <div class="flex items-center gap-3">
          <div class="flex-1 bg-cyber-dark rounded p-1.5 border border-cyber-border">
            <div class="flex items-center justify-between text-[10px] mb-1">
              <span>CORE TEMP: <strong id="l3-temp-val" class="text-cyber-orange">${state.overclockTemp}°C</strong> / ${level.rawData.maxTemp}°C</span>
              <span id="l3-attempts-val" class="text-cyber-yellow font-bold">${state.attemptsLeft} PROBES LEFT</span>
            </div>
            <div class="w-full bg-black rounded-full h-2 overflow-hidden border border-cyber-border">
              <div id="l3-temp-bar" class="h-full bg-gradient-to-r from-cyber-green via-cyber-orange to-cyber-red transition-all duration-300" style="width: ${state.overclockTemp}%"></div>
            </div>
          </div>
        </div>
      `;
    },

    renderEditorCode: (container, level, state, game) => {
      container.innerHTML = `
        <div class="text-slate-500 mb-1 select-none"># LEVEL 3: BINARY RANGE BISECTION SCRIPT</div>
        <div class="text-slate-300 select-none">low = <span class="text-cyber-green">${state.currentLow}</span>; high = <span class="text-cyber-green">${state.currentHigh}</span></div>
        <div class="text-slate-500 my-1 select-none"># Calculate the midpoint probe:</div>
        <div class="flex items-center gap-2 my-2">
          <span class="text-cyber-cyan font-bold">next_probe</span>
          <span class="text-slate-400">=</span>
          <span class="text-slate-300 font-bold">(low + high) // 2 -> </span>
          <input id="l3-probe-input" type="number" min="1" max="100" value="${state.lastProbe}"
                 oninput="game.handleLevelAction('probeInputChange')"
                 class="w-16 bg-cyber-dark border border-cyber-border focus:border-cyber-green text-center text-cyber-green font-bold rounded py-0.5 outline-none text-sm">
          <button onclick="game.executeExploit()" class="px-2.5 py-1 rounded bg-cyber-orange text-black font-bold text-xs hover:bg-amber-400">
            PROBE NOW
          </button>
        </div>
        <div class="text-slate-500 select-none text-[11px] mt-2">
          <div>if status == "HIGHER": low = mid + 1</div>
          <div>elif status == "LOWER": high = mid - 1</div>
          <div>else: LOCKED_ROOTKIT_FOUND()</div>
        </div>
      `;
    },

    renderEditorBlocks: (container, level, state, game) => {
      const mid = Math.floor((state.currentLow + state.currentHigh) / 2);
      container.innerHTML = `
        <div class="space-y-3 font-mono text-xs">
          <div class="p-2.5 rounded bg-cyber-dark border border-cyber-border flex items-center justify-between">
            <span class="text-slate-400">ACTIVE SEARCH WINDOW:</span>
            <span id="l3-active-window-label" class="text-cyber-green font-bold text-sm">[${state.currentLow} ... ${state.currentHigh}]</span>
          </div>

          <div class="p-2.5 rounded bg-cyber-dark border border-cyber-cyan/40">
            <label class="block text-slate-300 font-bold mb-1">RECOMMENDED MIDPOINT FORMULA:</label>
            <div class="text-[11px] text-slate-400">
              mid = ( <span id="l3-formula-low" class="text-cyber-green font-bold">${state.currentLow}</span> + <span id="l3-formula-high" class="text-cyber-green font-bold">${state.currentHigh}</span> ) // 2 = <span id="l3-formula-mid" class="text-cyber-yellow font-bold text-sm">${mid}</span>
            </div>
            <button onclick="game.handleLevelAction('applyMidpoint')" class="mt-2 w-full py-1 rounded bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan font-bold text-xs hover:bg-cyber-cyan/30 transition">
              ⚡ AUTO-CALCULATE OPTIMAL MIDPOINT
            </button>
          </div>
        </div>
      `;
    },

    renderVisualizer: (container, level, state, game) => {
      const low = state.currentLow;
      const high = state.currentHigh;
      const lowPercent = Math.max(0, (low - 1));
      const highPercent = Math.min(100, high);
      const widthPercent = Math.max(2, highPercent - lowPercent);

      container.innerHTML = `
        <div class="w-full h-full flex flex-col justify-between p-1.5">
          <div class="flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>PORT BUS 1</span>
            <span class="text-cyber-green font-bold">ACTIVE SEARCH RANGE: ${low} - ${high}</span>
            <span>PORT BUS 100</span>
          </div>

          <div class="relative w-full h-12 bg-black rounded border border-cyber-border overflow-hidden my-1">
            <div class="absolute top-0 bottom-0 left-0 bg-cyber-red/20 border-r border-cyber-red/50" style="width: ${lowPercent}%"></div>
            <div class="absolute top-0 bottom-0 bg-cyber-green/25 border-x-2 border-cyber-green shadow-[0_0_15px_rgba(0,255,102,0.3)] transition-all duration-300" 
                 style="left: ${lowPercent}%; width: ${widthPercent}%;">
            </div>
            <div class="absolute top-0 bottom-0 right-0 bg-cyber-red/20 border-l border-cyber-red/50" style="width: ${100 - highPercent}%"></div>

            <div class="absolute top-0 bottom-0 w-1 bg-cyber-orange shadow-[0_0_8px_#FF9900]" style="left: ${state.lastProbe}%;">
            </div>
          </div>

          <div class="flex items-center justify-between text-[10px] font-mono">
            <span class="text-slate-400">LAST PROBE: <strong class="text-cyber-orange">${state.lastProbe}</strong></span>
            <span class="${state.lastStatus === 'MATCH' ? 'text-cyber-green font-bold' : (state.lastStatus === 'HIGHER' ? 'text-cyber-yellow' : 'text-cyber-cyan')}">
              FEEDBACK: ${state.lastStatus === 'IDLE' ? 'AWAITING SCAN' : (state.lastStatus === 'MATCH' ? 'TARGET LOCKED' : `TARGET IS ${state.lastStatus}`)}
            </span>
          </div>
        </div>
      `;
    },

    getLivePreview: (state, level) => {
      const probe = state.lastProbe;
      return {
        text: `PORT ${probe}`,
        isMatch: (probe === state.targetPort),
        statusText: `Active Range: [${state.currentLow} ... ${state.currentHigh}]`
      };
    },

    validate: (state, level) => {
      const probeVal = parseInt(state.lastProbe) || 50;
      const target = state.targetPort;

      if (probeVal === target) {
        state.lastStatus = "MATCH";
        return {
          success: true,
          status: "MATCH",
          output: probeVal,
          message: `🎯 TARGET ACQUIRED! PORT ${probeVal} CONTAINS THE ROOTKIT!`,
          intelName: "Rootkit Neutralization Port",
          intelValue: `Port #${probeVal}`,
          successModalDesc: `You successfully applied binary search to isolate rootkit at Port #${probeVal} within thermal limits!`
        };
      }

      if (state.attemptsLeft <= 0 || state.overclockTemp >= level.rawData.maxTemp) {
        return {
          success: false,
          status: "BURNOUT",
          message: "CRITICAL OVERHEAT: Thermal threshold exceeded! Resetting port bus..."
        };
      }

      if (probeVal < target) {
        state.currentLow = Math.max(state.currentLow, probeVal + 1);
        state.lastStatus = "HIGHER";
        return {
          success: false,
          status: "HIGHER",
          message: `PORT ${probeVal}: RADAR SIGNAL TOO LOW! (Target is HIGHER)`
        };
      } else {
        state.currentHigh = Math.min(state.currentHigh, probeVal - 1);
        state.lastStatus = "LOWER";
        return {
          success: false,
          status: "LOWER",
          message: `PORT ${probeVal}: RADAR SIGNAL TOO HIGH! (Target is LOWER)`
        };
      }
    },

    autoSolve: (state, level) => {
      state.lastProbe = state.targetPort;
    }
  },


  // ========================================================
  // LEVEL 4: CAESAR SHIFT CIPHER // ALPHABET WRAP (Crypto & Modulo)
  // ========================================================
  {
    id: 4,
    type: "caesar",
    title: "CAESAR DECRYPTOR // MODULO ROTATION",
    shortTitle: "CAESAR ROT",
    desc: 'Omega radio towers transmit intercepted telemetry scrambled with a classical Caesar Shift cipher: "FDHVDU_FLSKHU". Determine the shift key (1-25) using modular arithmetic (char_code - key + 26) % 26 to restore the token!',
    concept: '<strong class="text-cyber-green">Modular Arithmetic (Modulo %):</strong> In Caesar ciphers, the alphabet loops around: <code>new_char = (code - key + 26) % 26</code>. The modulo operator <code>%</code> ensures numbers wrap seamlessly between 0 and 25!',
    handlerInitial: "Cadet, this radio transmission is encrypted with an alphabetic rotation. Shift each letter backwards until a meaningful cyber keyword appears!",
    hints: [
      "Try shifting each letter backwards by 3 positions: 'F' becomes 'C', 'D' becomes 'A', 'H' becomes 'E'... Look for the word 'CAESAR'!"
    ],
    rawData: "FDHVDU_FLSKHU",
    targetDecrypted: "CAESAR_CIPHER",
    targetShift: 3,
    specs: [
      { label: "CIPHERTEXT", value: '"FDHVDU_FLSKHU"', color: "text-cyber-orange" },
      { label: "ALPHABET SIZE", value: "26 letters (Modulo 26)", color: "text-cyber-cyan" },
      { label: "KEY DOMAIN", value: "Integer in range [1 .. 25]", color: "text-cyber-green" }
    ],
    initialState: () => ({
      shiftKey: 1
    }),
    initialCode: `# LEVEL 4: CAESAR CIPHER DECRYPTION
ciphertext = "FDHVDU_FLSKHU"
# Shift formula: (ord(c) - 65 - shift_key) % 26 + 65
shift_key = 3
plaintext = decrypt_caesar(ciphertext, shift_key)
print("DECRYPTED:", plaintext)`,

    decryptText: (str, key) => {
      return str.split('').map(c => {
        if (c >= 'A' && c <= 'Z') {
          const code = c.charCodeAt(0) - 65;
          const decryptedCode = (code - key + 26) % 26;
          return String.fromCharCode(decryptedCode + 65);
        }
        return c;
      }).join('');
    },

    handleAction: (action, payload, state, level, game) => {
      if (action === 'setShift') {
        state.shiftKey = parseInt(payload) || 1;
        const input = document.getElementById('l4-shift-input');
        const slider = document.getElementById('l4-shift-slider');
        const dial = document.getElementById('l4-shift-dial-val');
        if (input) input.value = state.shiftKey;
        if (slider) slider.value = state.shiftKey;
        if (dial) dial.textContent = state.shiftKey;
        level.renderVisualizer(document.getElementById('visualizer-container'), level, state, game);
        game.updateLivePreview();
      }
    },

    renderClueBar: (container, level, state, game) => {
      container.innerHTML = `
        <div class="flex items-center justify-between mb-1.5 text-[11px]">
          <span class="text-slate-400 font-bold">CAESAR ALPHABET WHEEL REFERENCE:</span>
          <span class="text-cyber-cyan text-[10px]">A=0 ... Z=25</span>
        </div>
        <div class="p-2 rounded bg-cyber-dark border border-cyber-border font-mono text-[10px] space-y-1">
          <div class="text-slate-400 flex items-center justify-between">
            <span>CIPHER CHARS:</span>
            <span class="text-cyber-orange font-bold">${level.rawData}</span>
          </div>
          <div class="text-slate-400 flex items-center justify-between">
            <span>CURRENT SHIFT (-${state.shiftKey}):</span>
            <span class="text-cyber-green font-bold">${level.decryptText(level.rawData, state.shiftKey)}</span>
          </div>
        </div>
      `;
    },

    renderEditorCode: (container, level, state, game) => {
      container.innerHTML = `
        <div class="text-slate-500 mb-1 select-none"># LEVEL 4: CAESAR MODULO REVERSE SHIFT</div>
        <div class="text-slate-300 select-none">ciphertext = <span class="text-cyber-orange">"${level.rawData}"</span></div>
        <div class="flex items-center gap-2 my-2">
          <span class="text-cyber-cyan font-bold">shift_key</span>
          <span class="text-slate-400">=</span>
          <input id="l4-shift-input" type="number" min="1" max="25" value="${state.shiftKey}"
                 oninput="game.handleLevelAction('setShift', this.value)"
                 class="w-16 bg-cyber-dark border border-cyber-border focus:border-cyber-green text-center text-cyber-green font-bold rounded py-0.5 outline-none text-sm">
          <span class="text-slate-500 text-[11px]"># (1 to 25)</span>
        </div>
        <div class="text-slate-300 select-none">decrypted = [(c - shift_key) % 26]</div>
        <div class="text-slate-500 mt-2 select-none text-[11px]">print("OUTPUT:", decrypted)</div>
      `;
    },

    renderEditorBlocks: (container, level, state, game) => {
      container.innerHTML = `
        <div class="space-y-3 font-mono text-xs">
          <div class="p-2.5 rounded bg-cyber-dark border border-cyber-border">
            <label class="block text-slate-400 text-[11px] mb-1">ROTATION SHIFT KEY SLIDER (1 - 25):</label>
            <div class="flex items-center gap-3">
              <input id="l4-shift-slider" type="range" min="1" max="25" value="${state.shiftKey}"
                     oninput="game.handleLevelAction('setShift', this.value)"
                     class="flex-1 accent-cyber-green cursor-pointer">
              <span id="l4-shift-dial-val" class="w-8 text-center font-bold text-cyber-green text-base">${state.shiftKey}</span>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-1.5">
            ${[1, 2, 3, 4, 5, 7, 13, 25].map(k => `
              <button onclick="game.handleLevelAction('setShift', ${k})" class="p-1 rounded bg-black/60 border border-cyber-border hover:border-cyber-cyan text-[11px] font-bold text-slate-300">
                Key ${k}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    },

    renderVisualizer: (container, level, state, game) => {
      const dec = level.decryptText(level.rawData, state.shiftKey);
      const isMatch = (dec === level.targetDecrypted);

      container.innerHTML = `
        <div class="w-full h-full flex flex-col items-center justify-center p-2 text-center font-mono">
          <div class="text-[10px] text-slate-400 mb-1">DECRYPTED STREAM:</div>
          <div class="text-lg font-black tracking-widest ${isMatch ? 'text-cyber-green glow-green' : 'text-cyber-orange glow-orange'}">
            ${dec}
          </div>
          <div class="mt-2 text-[10px] px-2 py-0.5 rounded border ${isMatch ? 'border-cyber-green text-cyber-green bg-cyber-green/10' : 'border-cyber-border text-slate-500'}">
            ${isMatch ? '★ VALID KEY CONFIRMED ★' : 'CIPHER UNRESOLVED: TRY SHIFT 3'}
          </div>
        </div>
      `;
    },

    getLivePreview: (state, level) => {
      const dec = level.decryptText(level.rawData, state.shiftKey);
      const isMatch = (dec === level.targetDecrypted);
      return {
        text: `"${dec}"`,
        isMatch,
        statusText: isMatch ? "CORRECT CIPHER KEY FOUND!" : `Current: Key ${state.shiftKey}`
      };
    },

    validate: (state, level) => {
      const dec = level.decryptText(level.rawData, state.shiftKey);
      const isMatch = (dec === level.targetDecrypted);

      return {
        success: isMatch,
        output: dec,
        message: isMatch
          ? `ACCESS GRANTED: Caesar rotation resolved to "${dec}"!`
          : `⚠️ ERROR: Decrypted text "${dec}" is unreadable. Adjust the shift key!`,
        intelName: "Decrypted Radio Token",
        intelValue: dec,
        successModalDesc: `You cracked the Caesar cipher using shift key = ${state.shiftKey}! Transmission verified.`
      };
    },

    autoSolve: (state, level) => {
      state.shiftKey = level.targetShift;
    }
  },


  // ========================================================
  // LEVEL 5: PARITY CHECK // MODULO BIT VALIDATOR (Crypto & Modulo)
  // ========================================================
  {
    id: 5,
    type: "parity",
    title: "PARITY CHECK // MODULO BIT VALIDATOR",
    shortTitle: "PARITY CHECK",
    desc: 'Omega uses a Modulo 7 checksum algorithm on packets: sum(bytes) % 7 must equal 0. An adversary modified one packet in transit. Inspect the 5 packet payloads, identify the corrupted packet ID, and isolate it!',
    concept: '<strong class="text-cyber-orange">Error Detection via Modulo:</strong> Real-world networking protocols (like IPv4 Header Checksum or CRC32) use modular arithmetic to ensure packets are not corrupted. When <code>sum % divisor != 0</code>, data integrity is compromised!',
    handlerInitial: "Operative, run the modulo checksum filter across the packet stream. Four packets are genuine (sum % 7 == 0); find the tampered anomaly!",
    hints: [
      "Calculate the sum of bytes for each packet: Packet #103 has [18, 22, 33] -> sum = 73. Since 73 % 7 = 3 (not 0), Packet #103 is corrupted!"
    ],
    rawData: [
      { id: 101, bytes: [14, 21, 28], sum: 63, remainder: 0, status: "VALID" },
      { id: 102, bytes: [10, 15, 24], sum: 49, remainder: 0, status: "VALID" },
      { id: 103, bytes: [18, 22, 33], sum: 73, remainder: 3, status: "CORRUPTED" }, // Target anomaly
      { id: 104, bytes: [7, 35, 14], sum: 56, remainder: 0, status: "VALID" },
      { id: 105, bytes: [12, 19, 39], sum: 70, remainder: 0, status: "VALID" }
    ],
    corruptedId: 103,
    specs: [
      { label: "CHECKSUM RULE", value: "packet.sum % 7 == 0", color: "text-cyber-green" },
      { label: "PACKET BATCH", value: "5 Network Frames", color: "text-cyber-cyan" },
      { label: "TARGET", value: "Flagged Tampered Packet ID", color: "text-cyber-red" }
    ],
    initialState: () => ({
      selectedPacketId: 101
    }),
    initialCode: `# LEVEL 5: PARITY INTEGRITY AUDITOR
for pkt in stream:
    if sum(pkt.bytes) % 7 != 0:
        corrupted_packet_id = pkt.id
print("FLAGGED CORRUPTED PKT:", corrupted_packet_id)`,

    handleAction: (action, payload, state, level, game) => {
      if (action === 'selectPacket') {
        state.selectedPacketId = parseInt(payload);
        level.renderClueBar(document.getElementById('workspace-clue-bar'), level, state, game);
        level.renderVisualizer(document.getElementById('visualizer-container'), level, state, game);
        const sel = document.getElementById('l5-packet-select');
        if (sel) sel.value = state.selectedPacketId;
        game.updateLivePreview();
      }
    },

    renderClueBar: (container, level, state, game) => {
      container.innerHTML = `
        <div class="flex items-center justify-between mb-1 text-[11px]">
          <span class="text-slate-400 font-bold">PACKET PAYLOAD INTEGRITY STREAM:</span>
          <span class="text-cyber-orange text-[10px]">CLICK PACKET TO AUDIT</span>
        </div>
        <div class="grid grid-cols-5 gap-1.5">
          ${level.rawData.map(p => {
            const isSelected = (p.id === state.selectedPacketId);
            const isBad = (p.sum % 7 !== 0);
            return `
              <button onclick="game.handleLevelAction('selectPacket', ${p.id})" class="p-1.5 rounded border text-left ${isSelected ? 'border-cyber-green bg-cyber-green/20 text-cyber-green' : 'border-cyber-border bg-cyber-dark text-slate-300'}">
                <div class="font-bold text-[10px]">#${p.id}</div>
                <div class="text-[9px] text-slate-400">Sum: ${p.sum}</div>
                <div class="text-[8px] font-mono ${isBad ? 'text-cyber-red' : 'text-slate-500'}">Rem: ${p.sum % 7}</div>
              </button>
            `;
          }).join('')}
        </div>
      `;
    },

    renderEditorCode: (container, level, state, game) => {
      container.innerHTML = `
        <div class="text-slate-500 mb-1 select-none"># LEVEL 5: MODULO INTEGRITY VALIDATOR</div>
        <div class="text-slate-300 select-none">rule = "sum(bytes) % 7 == 0"</div>
        <div class="flex items-center gap-2 my-2">
          <span class="text-cyber-red font-bold">flag_tampered_packet</span>
          <span class="text-slate-400">=</span>
          <select id="l5-packet-select" onchange="game.handleLevelAction('selectPacket', this.value)" class="bg-cyber-dark border border-cyber-border text-cyber-green font-bold rounded px-2 py-1 outline-none text-xs">
            ${level.rawData.map(p => `<option value="${p.id}" ${state.selectedPacketId === p.id ? 'selected' : ''}>Packet #${p.id} (Sum: ${p.sum})</option>`).join('')}
          </select>
        </div>
        <div class="text-slate-500 select-none text-[11px]">isolate_network_frame(flag_tampered_packet)</div>
      `;
    },

    renderEditorBlocks: (container, level, state, game) => {
      container.innerHTML = `
        <div class="space-y-2.5 font-mono text-xs">
          <div class="p-2 rounded bg-cyber-dark border border-cyber-border flex items-center justify-between">
            <span class="text-slate-400">DIVISOR MODULO:</span>
            <span class="text-cyber-cyan font-bold">% 7</span>
          </div>
          <div class="p-2 rounded bg-cyber-dark border border-cyber-red/40 flex items-center justify-between">
            <span class="text-slate-400">FAIL CONDITION:</span>
            <span class="text-cyber-red font-bold">remainder != 0</span>
          </div>
          <div class="text-[11px] text-slate-400 p-2 rounded bg-black/60 border border-cyber-border">
            Select the packet with non-zero remainder from the dropdown or cards above.
          </div>
        </div>
      `;
    },

    renderVisualizer: (container, level, state, game) => {
      const pkt = level.rawData.find(p => p.id === state.selectedPacketId);
      const isBad = pkt && (pkt.sum % 7 !== 0);

      container.innerHTML = `
        <div class="w-full h-full flex flex-col items-center justify-center p-2 text-center font-mono">
          <div class="text-xs text-slate-400 mb-1">PACKET #${pkt.id} CHECKSUM FORMULA:</div>
          <div class="text-sm font-bold ${isBad ? 'text-cyber-red glow-red' : 'text-cyber-green glow-green'}">
            ${pkt.sum} % 7 = ${pkt.sum % 7} (${isBad ? 'CORRUPTED CHECKSUM' : 'VERIFIED OK'})
          </div>
          <div class="mt-2 text-[10px] text-slate-400">
            ${isBad ? '⚠️ CRC VIOLATION DETECTED! READY TO PURGE' : 'PASS: Packets with remainder 0 are safe'}
          </div>
        </div>
      `;
    },

    getLivePreview: (state, level) => {
      const isMatch = (state.selectedPacketId === level.corruptedId);
      return {
        text: `PACKET #${state.selectedPacketId}`,
        isMatch,
        statusText: isMatch ? "CORRUPTED ANOMALY TARGETED!" : "Packet has valid remainder (0)"
      };
    },

    validate: (state, level) => {
      const isMatch = (state.selectedPacketId === level.corruptedId);
      return {
        success: isMatch,
        output: `#${state.selectedPacketId}`,
        message: isMatch
          ? `ACCESS GRANTED: Packet #${state.selectedPacketId} purged! Checksum error neutralized.`
          : `⚠️ INCORRECT: Packet #${state.selectedPacketId} has a valid checksum (sum % 7 == 0). Target the packet with non-zero remainder!`,
        intelName: "Purged Malware Packet",
        intelValue: `Packet #${state.selectedPacketId}`,
        successModalDesc: `You isolated corrupted Packet #103 with remainder 3 (% 7 != 0). Channel restored!`
      };
    },

    autoSolve: (state, level) => {
      state.selectedPacketId = level.corruptedId;
    }
  },


  // ========================================================
  // LEVEL 6: PRNG SEQUENCE // PATTERN PREDICTOR (Crypto & Modulo)
  // ========================================================
  {
    id: 6,
    type: "sequence",
    title: "PRNG GENERATOR // SEQUENCE PREDICTOR",
    shortTitle: "PRNG SEED",
    desc: 'Omega’s One-Time-Pad authenticator uses a linear mathematical sequence: [4, 11, 25, 53, ?, 221]. The generation rule is next = (current * 2 + 3). Calculate the missing secret seed to unlock the generator core!',
    concept: '<strong class="text-cyber-cyan">Recurrence Relations in PRNGs:</strong> Computer random number generators (PRNGs) are not truly random; they compute sequences using recurrence relations like <code>X(n+1) = (A * X(n) + C) % M</code>. If you deduce the pattern, you can predict every future key!',
    handlerInitial: "Cadet, examine the token interval progression: 4 -> 11 (+7), 11 -> 25 (+14), 25 -> 53 (+28)... Calculate the missing 5th token in the series!",
    hints: [
      "Look at the formula: 53 * 2 + 3 = 106 + 3 = 109! Notice that 109 * 2 + 3 = 221 matches the next term!"
    ],
    rawData: [4, 11, 25, 53, null, 221],
    targetToken: 109,
    specs: [
      { label: "SEQUENCE", value: "[4, 11, 25, 53, ?, 221]", color: "text-cyber-yellow" },
      { label: "RECURRENCE", value: "next = (current * 2) + 3", color: "text-cyber-green" },
      { label: "OUTPUT SEED", value: "Missing 5th Element", color: "text-cyber-cyan" }
    ],
    initialState: () => ({
      userToken: 100
    }),
    initialCode: `# LEVEL 6: PSEUDO-RANDOM SEQUENCE PREDICTOR
sequence = [4, 11, 25, 53, None, 221]
# Formula: next_val = current * 2 + 3
missing_seed = 53 * 2 + 3
print("PREDICTED SEED:", missing_seed)`,

    handleAction: (action, payload, state, level, game) => {
      if (action === 'setSeed') {
        state.userToken = parseInt(payload) || 0;
        const input = document.getElementById('l6-seed-input');
        if (input) input.value = state.userToken;
        level.renderClueBar(document.getElementById('workspace-clue-bar'), level, state, game);
        level.renderVisualizer(document.getElementById('visualizer-container'), level, state, game);
        game.updateLivePreview();
      }
    },

    renderClueBar: (container, level, state, game) => {
      container.innerHTML = `
        <div class="flex items-center justify-between mb-1.5 text-[11px]">
          <span class="text-slate-400 font-bold">CRYPTOGRAPHIC SEED TIMELINE:</span>
          <span class="text-cyber-cyan text-[10px]">next = curr * 2 + 3</span>
        </div>
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1">
          ${level.rawData.map((num, i) => {
            const val = num !== null ? num : state.userToken;
            const isMissing = (num === null);
            const isCorrect = isMissing && (state.userToken === level.targetToken);
            return `
              <div class="p-2 rounded border font-mono text-center min-w-[50px] ${isMissing ? (isCorrect ? 'border-cyber-green bg-cyber-green/20 text-cyber-green' : 'border-cyber-orange bg-cyber-orange/20 text-cyber-orange') : 'border-cyber-border bg-cyber-dark text-slate-300'}">
                <div class="text-[9px] text-slate-500">#${i+1}</div>
                <div class="font-bold text-xs">${val}</div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    },

    renderEditorCode: (container, level, state, game) => {
      container.innerHTML = `
        <div class="text-slate-500 mb-1 select-none"># LEVEL 6: RECURRENCE CALCULATOR</div>
        <div class="text-slate-300 select-none">sequence = [4, 11, 25, 53, <span class="text-cyber-yellow">?</span>, 221]</div>
        <div class="flex items-center gap-2 my-2">
          <span class="text-cyber-cyan font-bold">missing_seed</span>
          <span class="text-slate-400">=</span>
          <input id="l6-seed-input" type="number" value="${state.userToken}"
                 oninput="game.handleLevelAction('setSeed', this.value)"
                 class="w-20 bg-cyber-dark border border-cyber-border focus:border-cyber-green text-center text-cyber-green font-bold rounded py-0.5 outline-none text-sm">
        </div>
        <div class="text-slate-500 select-none text-[11px]">verify_seed(53 * 2 + 3 == missing_seed)</div>
      `;
    },

    renderEditorBlocks: (container, level, state, game) => {
      container.innerHTML = `
        <div class="space-y-2.5 font-mono text-xs">
          <div class="p-2.5 rounded bg-cyber-dark border border-cyber-cyan/40">
            <span class="text-slate-400 block mb-1 text-[11px]">CALCULATION HELPER:</span>
            <div class="text-cyber-green font-bold">53 * 2 + 3 = 106 + 3 = 109</div>
          </div>
          <button onclick="game.handleLevelAction('setSeed', 109)" class="w-full py-1.5 rounded bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan font-bold text-xs hover:bg-cyber-cyan/30">
            APPLY 109 TO SEED BUFFER
          </button>
        </div>
      `;
    },

    renderVisualizer: (container, level, state, game) => {
      const isMatch = (state.userToken === level.targetToken);
      container.innerHTML = `
        <div class="w-full h-full flex flex-col items-center justify-center p-2 text-center font-mono">
          <div class="text-xs text-slate-400 mb-1">GENERATOR CORE STATUS:</div>
          <div class="text-xl font-black ${isMatch ? 'text-cyber-green glow-green' : 'text-cyber-orange glow-orange'}">
            SEED: ${state.userToken}
          </div>
          <div class="text-[10px] mt-1 text-slate-400">
            ${isMatch ? '★ SEQUENCE EQUATION BALANCED ★' : 'EQUATION MISMATCH: next != 221'}
          </div>
        </div>
      `;
    },

    getLivePreview: (state, level) => {
      const isMatch = (state.userToken === level.targetToken);
      return {
        text: `SEED ${state.userToken}`,
        isMatch,
        statusText: isMatch ? "CORRECT SEQUENCE SEED!" : "Target missing seed in series"
      };
    },

    validate: (state, level) => {
      const isMatch = (state.userToken === level.targetToken);
      return {
        success: isMatch,
        output: state.userToken,
        message: isMatch
          ? `ACCESS GRANTED: Seed ${state.userToken} validated! PRNG key locked.`
          : `⚠️ ERROR: Seed ${state.userToken} breaks recurrence (53 * 2 + 3 != ${state.userToken}). Calculate carefully!`,
        intelName: "PRNG Master Seed",
        intelValue: `Seed #${state.userToken}`,
        successModalDesc: `You deduced the recurrence relation next = 2n + 3 and unlocked PRNG Seed 109!`
      };
    },

    autoSolve: (state, level) => {
      state.userToken = level.targetToken;
    }
  },


  // ========================================================
  // LEVEL 7: THE SYNDICATE MOLE // CONTRADICTION MATRIX (Logic & Deduction)
  // ========================================================
  {
    id: 7,
    type: "deduction",
    title: "THE SYNDICATE MOLE // CONTRADICTION MATRIX",
    shortTitle: "MOLE HUNT",
    desc: 'An insider leaked classified encryption keys. Intercepted logs give four suspect profiles. Internal Affairs established: the mole was in Room B between 02:00 and 04:00, used a Tor VPN, AND their badge was cloned. Write the multi-condition filter to isolate the traitor!',
    concept: '<strong class="text-cyber-orange">Compound Boolean Conditions:</strong> In cyber investigations, multiple clues must be combined using logical <code>and</code>. All three conditions <code>(room == "Room B" and 2 <= time <= 4 and vpn == True and badge == "Cloned")</code> must evaluate to True simultaneously to eliminate false positives!',
    handlerInitial: "Cadet, examine the suspect table. Cross-reference access room, check-in timestamp, proxy status, and biometric badge flag to unmask the mole!",
    hints: [
      "Check Agent 'Phantom': Room B, check-in 03:15 (between 2 and 4), VPN is True, and badge is Cloned. Phantom matches all 3 contradictory parameters!"
    ],
    rawData: [
      { name: "Agent Viper", room: "Room B", time: 1.5, vpn: false, badge: "Verified", isMole: false },
      { name: "Agent Phantom", room: "Room B", time: 3.25, vpn: true, badge: "Cloned", isMole: true }, // The Mole!
      { name: "Agent Ghost", room: "Room A", time: 3.75, vpn: true, badge: "Verified", isMole: false },
      { name: "Agent Echo", room: "Room B", time: 5.0, vpn: false, badge: "Cloned", isMole: false }
    ],
    targetSuspect: "Agent Phantom",
    specs: [
      { label: "LOCATION", value: 'room == "Room B"', color: "text-cyber-orange" },
      { label: "TIMEFRAME", value: "2.0 <= time <= 4.0", color: "text-cyber-yellow" },
      { label: "FLAGS", value: 'vpn == True and badge == "Cloned"', color: "text-cyber-red" }
    ],
    initialState: () => ({
      selectedSuspect: "Agent Viper"
    }),
    initialCode: `# LEVEL 7: MOLE IDENTIFICATION FILTER
for agent in suspects:
    if agent.room == "Room B" and (2.0 <= agent.time <= 4.0) \\
       and agent.vpn == True and agent.badge == "Cloned":
        mole_name = agent.name
print("UNMASKED MOLE:", mole_name)`,

    handleAction: (action, payload, state, level, game) => {
      if (action === 'selectSuspect') {
        state.selectedSuspect = payload;
        level.renderClueBar(document.getElementById('workspace-clue-bar'), level, state, game);
        level.renderVisualizer(document.getElementById('visualizer-container'), level, state, game);
        const sel = document.getElementById('l7-suspect-select');
        if (sel) sel.value = state.selectedSuspect;
        game.updateLivePreview();
      }
    },

    renderClueBar: (container, level, state, game) => {
      container.innerHTML = `
        <div class="flex items-center justify-between mb-1.5 text-[11px]">
          <span class="text-slate-400 font-bold">SUSPECT DOSSIER LINEUP:</span>
          <span class="text-cyber-red text-[10px]">1 TRAITOR PRESENT</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          ${level.rawData.map(s => {
            const isSel = (s.name === state.selectedSuspect);
            return `
              <button onclick="game.handleLevelAction('selectSuspect', '${s.name}')" class="p-1.5 rounded border text-left font-mono ${isSel ? 'border-cyber-red bg-cyber-red/20 text-cyber-red' : 'border-cyber-border bg-cyber-dark text-slate-300'}">
                <div class="font-bold text-[10px]">${s.name}</div>
                <div class="text-[9px] text-slate-400">${s.room} @ 0${Math.floor(s.time)}:${String(Math.round((s.time % 1)*60)).padStart(2,'0')}</div>
                <div class="text-[8px] text-slate-400">VPN: ${s.vpn} | ${s.badge}</div>
              </button>
            `;
          }).join('')}
        </div>
      `;
    },

    renderEditorCode: (container, level, state, game) => {
      container.innerHTML = `
        <div class="text-slate-500 mb-1 select-none"># LEVEL 7: TRAITOR IDENTIFICATION FILTER</div>
        <div class="text-slate-300 select-none"># Match: Room B + 02:00-04:00 + VPN + Cloned Badge</div>
        <div class="flex items-center gap-2 my-2">
          <span class="text-cyber-red font-bold">apprehend_suspect</span>
          <span class="text-slate-400">=</span>
          <select id="l7-suspect-select" onchange="game.handleLevelAction('selectSuspect', this.value)" class="bg-cyber-dark border border-cyber-border text-cyber-green font-bold rounded px-2 py-1 outline-none text-xs">
            ${level.rawData.map(s => `<option value="${s.name}" ${state.selectedSuspect === s.name ? 'selected' : ''}>${s.name}</option>`).join('')}
          </select>
        </div>
        <div class="text-slate-500 select-none text-[11px]">issue_warrant(apprehend_suspect)</div>
      `;
    },

    renderEditorBlocks: (container, level, state, game) => {
      container.innerHTML = `
        <div class="space-y-2 font-mono text-xs">
          <div class="p-2 rounded bg-cyber-dark border border-cyber-border text-[11px]">
            <span class="text-cyber-orange font-bold">1. Room:</span> Room B <br>
            <span class="text-cyber-yellow font-bold">2. Time:</span> Between 02:00 and 04:00 <br>
            <span class="text-cyber-cyan font-bold">3. Network:</span> VPN == True <br>
            <span class="text-cyber-red font-bold">4. Biometric:</span> Badge == Cloned
          </div>
          <button onclick="game.handleLevelAction('selectSuspect', 'Agent Phantom')" class="w-full py-1.5 rounded bg-cyber-red/20 border border-cyber-red text-cyber-red font-bold text-xs hover:bg-cyber-red/30">
            LOCK IN: AGENT PHANTOM
          </button>
        </div>
      `;
    },

    renderVisualizer: (container, level, state, game) => {
      const suspect = level.rawData.find(s => s.name === state.selectedSuspect);
      const isMole = suspect && suspect.isMole;

      container.innerHTML = `
        <div class="w-full h-full flex flex-col items-center justify-center p-2 text-center font-mono">
          <div class="text-[10px] text-slate-400 mb-1">INTERROGATION SPOTLIGHT:</div>
          <div class="text-lg font-black tracking-wide ${isMole ? 'text-cyber-red glow-red' : 'text-slate-300'}">
            ${suspect.name}
          </div>
          <div class="text-[10px] mt-1 ${isMole ? 'text-cyber-red font-bold' : 'text-slate-500'}">
            ${isMole ? '🚨 ALL 4 CONTRADICTION CLUES MATCHED! TRAITOR FOUND' : 'ALIBI VERIFIED: Does not fit all criteria'}
          </div>
        </div>
      `;
    },

    getLivePreview: (state, level) => {
      const isMatch = (state.selectedSuspect === level.targetSuspect);
      return {
        text: state.selectedSuspect,
        isMatch,
        statusText: isMatch ? "MOLE UNMASKED!" : "Selected agent has valid alibi"
      };
    },

    validate: (state, level) => {
      const isMatch = (state.selectedSuspect === level.targetSuspect);
      return {
        success: isMatch,
        output: state.selectedSuspect,
        message: isMatch
          ? `ACCESS GRANTED: ${state.selectedSuspect} detained! Rogue transmission terminated.`
          : `⚠️ FALSE ARREST: ${state.selectedSuspect} does not fulfill all 4 conditions. Check check-in time and room!`,
        intelName: "Apprehended Mole Dossier",
        intelValue: state.selectedSuspect,
        successModalDesc: `You combined multi-factor boolean logic to expose the traitor ${state.selectedSuspect}!`
      };
    },

    autoSolve: (state, level) => {
      state.selectedSuspect = level.targetSuspect;
    }
  },


  // ========================================================
  // LEVEL 8: TIME-LOCK ALIBI // INTERVAL OVERLAP (Logic & Deduction)
  // ========================================================
  {
    id: 8,
    type: "interval",
    title: "TIME-LOCK ALIBI // INTERVAL OVERLAP",
    shortTitle: "TIME ALIBI",
    desc: 'Omega deployed a logic bomb during a scheduled security maintenance window: 14:15 to 14:45 (Interval [15 .. 45]). Four session logs are logged. Detect which session was active strictly overlapping inside the vulnerability window!',
    concept: '<strong class="text-cyber-green">Interval Overlap Mathematics:</strong> Two time intervals <code>[A, B]</code> and <code>[C, D]</code> overlap if and only if <code>A < D and B > C</code>! This logic is crucial in calendar scheduling, database transaction locks, and server security audits.',
    handlerInitial: "Cadet, compare the session start and end times against the maintenance interval [15, 45]. Session S3 (14:20 - 14:40) was directly active inside the outage!",
    hints: [
      "Session S1 ended before 15. Session S2 started after 45. Session S3 ran from 20 to 40, right in the middle of the vulnerability window!"
    ],
    rawData: [
      { id: "S1", start: 0, end: 12, desc: "14:00 - 14:12 (Safe: Before Maintenance)" },
      { id: "S2", start: 48, end: 60, desc: "14:48 - 15:00 (Safe: After Maintenance)" },
      { id: "S3", start: 20, end: 40, desc: "14:20 - 14:40 (CRITICAL: Active Inside Window!)" }, // Overlapping
      { id: "S4", start: 50, end: 55, desc: "14:50 - 14:55 (Safe)" }
    ],
    targetSession: "S3",
    specs: [
      { label: "MAINTENANCE WINDOW", value: "[14:15 .. 14:45] (15-45 min)", color: "text-cyber-red" },
      { label: "OVERLAP CONDITION", value: "session.start < 45 and session.end > 15", color: "text-cyber-cyan" },
      { label: "TARGET", value: "Flagged Vulnerable Session ID", color: "text-cyber-orange" }
    ],
    initialState: () => ({
      selectedSession: "S1"
    }),
    initialCode: `# LEVEL 8: TIME-SERIES OVERLAP AUDITOR
window_start = 15; window_end = 45
for s in sessions:
    # Interval overlap formula:
    if s.start < window_end and s.end > window_start:
        breached_session = s.id
print("BREACH SESSION:", breached_session)`,

    handleAction: (action, payload, state, level, game) => {
      if (action === 'selectSession') {
        state.selectedSession = payload;
        level.renderClueBar(document.getElementById('workspace-clue-bar'), level, state, game);
        level.renderVisualizer(document.getElementById('visualizer-container'), level, state, game);
        const sel = document.getElementById('l8-session-select');
        if (sel) sel.value = state.selectedSession;
        game.updateLivePreview();
      }
    },

    renderClueBar: (container, level, state, game) => {
      container.innerHTML = `
        <div class="flex items-center justify-between mb-1 text-[11px]">
          <span class="text-slate-400 font-bold">TIMELINE TIMESTAMPS:</span>
          <span class="text-cyber-red text-[10px]">MAINTENANCE: 15-45m</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          ${level.rawData.map(s => {
            const isSel = (s.id === state.selectedSession);
            return `
              <button onclick="game.handleLevelAction('selectSession', '${s.id}')" class="p-1.5 rounded border text-left font-mono ${isSel ? 'border-cyber-green bg-cyber-green/20 text-cyber-green' : 'border-cyber-border bg-cyber-dark text-slate-300'}">
                <div class="font-bold text-[10px]">Session ${s.id}</div>
                <div class="text-[9px] text-slate-400">${s.start}m - ${s.end}m</div>
              </button>
            `;
          }).join('')}
        </div>
      `;
    },

    renderEditorCode: (container, level, state, game) => {
      container.innerHTML = `
        <div class="text-slate-500 mb-1 select-none"># LEVEL 8: INTERVAL OVERLAP DETECTION</div>
        <div class="text-slate-300 select-none">vulnerability_window = (15, 45)</div>
        <div class="flex items-center gap-2 my-2">
          <span class="text-cyber-orange font-bold">flag_session</span>
          <span class="text-slate-400">=</span>
          <select id="l8-session-select" onchange="game.handleLevelAction('selectSession', this.value)" class="bg-cyber-dark border border-cyber-border text-cyber-green font-bold rounded px-2 py-1 outline-none text-xs">
            ${level.rawData.map(s => `<option value="${s.id}" ${state.selectedSession === s.id ? 'selected' : ''}>Session ${s.id}: ${s.desc}</option>`).join('')}
          </select>
        </div>
        <div class="text-slate-500 select-none text-[11px]">isolate_compromised_session(flag_session)</div>
      `;
    },

    renderEditorBlocks: (container, level, state, game) => {
      container.innerHTML = `
        <div class="space-y-2.5 font-mono text-xs">
          <div class="p-2.5 rounded bg-cyber-dark border border-cyber-border">
            <span class="text-slate-400 text-[11px] block">INTERVAL TEST:</span>
            <span class="text-cyber-cyan font-bold">s.start &lt; 45 AND s.end &gt; 15</span>
          </div>
          <button onclick="game.handleLevelAction('selectSession', 'S3')" class="w-full py-1.5 rounded bg-cyber-green/20 border border-cyber-green text-cyber-green font-bold text-xs hover:bg-cyber-green/30">
            SELECT SESSION S3 (20-40m)
          </button>
        </div>
      `;
    },

    renderVisualizer: (container, level, state, game) => {
      const sess = level.rawData.find(s => s.id === state.selectedSession);
      const isTarget = (sess.id === level.targetSession);

      container.innerHTML = `
        <div class="w-full h-full flex flex-col justify-between p-1.5 font-mono">
          <div class="flex items-center justify-between text-[10px] text-slate-400">
            <span>14:00 (0m)</span>
            <span class="text-cyber-red font-bold">OUTAGE WINDOW (15 - 45m)</span>
            <span>15:00 (60m)</span>
          </div>

          <div class="relative w-full h-10 bg-black rounded border border-cyber-border overflow-hidden my-1">
            <div class="absolute top-0 bottom-0 left-[25%] width-[50%] bg-cyber-red/25 border-x-2 border-cyber-red" style="left: 25%; width: 50%;"></div>
            <div class="absolute top-1 bottom-1 rounded bg-cyber-green border border-cyber-green shadow-[0_0_10px_#00FF66] transition-all"
                 style="left: ${(sess.start/60)*100}%; width: ${Math.max(4, ((sess.end - sess.start)/60)*100)}%;">
            </div>
          </div>

          <div class="text-center text-[10px] ${isTarget ? 'text-cyber-green font-bold' : 'text-slate-400'}">
            Session ${sess.id} (${sess.start}m - ${sess.end}m) -> ${isTarget ? 'DIRECT OVERLAP WITH SECURITY BREACH!' : 'Outside vulnerability interval'}
          </div>
        </div>
      `;
    },

    getLivePreview: (state, level) => {
      const isMatch = (state.selectedSession === level.targetSession);
      return {
        text: `SESSION ${state.selectedSession}`,
        isMatch,
        statusText: isMatch ? "CORRECT COMPROMISED SESSION!" : "Session is outside outage window"
      };
    },

    validate: (state, level) => {
      const isMatch = (state.selectedSession === level.targetSession);
      return {
        success: isMatch,
        output: `Session ${state.selectedSession}`,
        message: isMatch
          ? `ACCESS GRANTED: Session S3 isolated! Attack vector neutralized.`
          : `⚠️ INCORRECT: Session ${state.selectedSession} was not running inside the 14:15-14:45 window. Check the timeline bar!`,
        intelName: "Compromised Session Vector",
        intelValue: `Session ${state.selectedSession}`,
        successModalDesc: `You applied interval overlap logic [start < 45 and end > 15] to isolate compromised Session S3!`
      };
    },

    autoSolve: (state, level) => {
      state.selectedSession = level.targetSession;
    }
  },


  // ========================================================
  // LEVEL 9: ACCESS MATRIX // NESTED CLEARANCE (Logic & Deduction)
  // ========================================================
  {
    id: 9,
    type: "matrix",
    title: "ACCESS MATRIX // NESTED CLEARANCE",
    shortTitle: "ACCESS MATRIX",
    desc: 'Omega’s mainframe gateway requires a nested access policy: (1) Clearance >= 5, (2) Department == "CYBER_OPS", and (3) Two-Factor Token == True. Beware of guest honeypots! Evaluate the policy rule and authorize the legitimate user.',
    concept: '<strong class="text-cyber-cyan">Nested Decision Trees & Fall-Through:</strong> Modern Identity and Access Management (IAM) systems use hierarchical security rules. If any required branch of the decision tree evaluates to False, execution must fall through to ACCESS_DENIED.',
    handlerInitial: "Cadet, configure the authentication evaluator. Find the credential token that satisfies all three nested security predicates without triggering honeypot alarms!",
    hints: [
      "Select 'Operative Valkyrie': Clearance = 5, Dept = 'CYBER_OPS', 2FA = True. All 3 criteria pass!"
    ],
    rawData: [
      { user: "Guest_User", clearance: 1, dept: "GUEST", token2FA: false, valid: false },
      { user: "Dev_Relay", clearance: 4, dept: "CYBER_OPS", token2FA: true, valid: false }, // clearance < 5
      { user: "Operative_Valkyrie", clearance: 5, dept: "CYBER_OPS", token2FA: true, valid: true }, // MATCH
      { user: "Admin_Ghost", clearance: 6, dept: "HR", token2FA: true, valid: false } // wrong dept
    ],
    targetUser: "Operative_Valkyrie",
    specs: [
      { label: "MIN CLEARANCE", value: "level >= 5", color: "text-cyber-green" },
      { label: "AUTHORIZED DEPT", value: 'dept == "CYBER_OPS"', color: "text-cyber-cyan" },
      { label: "MFA REQUIREMENT", value: "token2FA == True", color: "text-cyber-yellow" }
    ],
    initialState: () => ({
      selectedUser: "Guest_User"
    }),
    initialCode: `# LEVEL 9: NESTED CLEARANCE EVALUATOR
def verify_access(u):
    if u.clearance >= 5:
        if u.dept == "CYBER_OPS":
            if u.token2FA:
                return "ACCESS_GRANTED"
    return "ACCESS_DENIED"`,

    handleAction: (action, payload, state, level, game) => {
      if (action === 'selectUser') {
        state.selectedUser = payload;
        level.renderClueBar(document.getElementById('workspace-clue-bar'), level, state, game);
        level.renderVisualizer(document.getElementById('visualizer-container'), level, state, game);
        const sel = document.getElementById('l9-user-select');
        if (sel) sel.value = state.selectedUser;
        game.updateLivePreview();
      }
    },

    renderClueBar: (container, level, state, game) => {
      container.innerHTML = `
        <div class="flex items-center justify-between mb-1.5 text-[11px]">
          <span class="text-slate-400 font-bold">CREDENTIAL STREAM:</span>
          <span class="text-cyber-cyan text-[10px]">NESTED IAM POLICY</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          ${level.rawData.map(u => {
            const isSel = (u.user === state.selectedUser);
            return `
              <button onclick="game.handleLevelAction('selectUser', '${u.user}')" class="p-1.5 rounded border text-left font-mono ${isSel ? 'border-cyber-green bg-cyber-green/20 text-cyber-green' : 'border-cyber-border bg-cyber-dark text-slate-300'}">
                <div class="font-bold text-[10px] truncate">${u.user}</div>
                <div class="text-[9px] text-slate-400">Lvl: ${u.clearance} | ${u.dept}</div>
                <div class="text-[8px] text-slate-500">2FA: ${u.token2FA}</div>
              </button>
            `;
          }).join('')}
        </div>
      `;
    },

    renderEditorCode: (container, level, state, game) => {
      container.innerHTML = `
        <div class="text-slate-500 mb-1 select-none"># LEVEL 9: NESTED IAM EVALUATION</div>
        <div class="text-slate-300 select-none"># Rule: clearance >= 5 and dept == "CYBER_OPS" and 2FA</div>
        <div class="flex items-center gap-2 my-2">
          <span class="text-cyber-green font-bold">authorize_credential</span>
          <span class="text-slate-400">=</span>
          <select id="l9-user-select" onchange="game.handleLevelAction('selectUser', this.value)" class="bg-cyber-dark border border-cyber-border text-cyber-green font-bold rounded px-2 py-1 outline-none text-xs">
            ${level.rawData.map(u => `<option value="${u.user}" ${state.selectedUser === u.user ? 'selected' : ''}>${u.user} (Lvl ${u.clearance}, ${u.dept})</option>`).join('')}
          </select>
        </div>
        <div class="text-slate-500 select-none text-[11px]">grant_gateway_handshake(authorize_credential)</div>
      `;
    },

    renderEditorBlocks: (container, level, state, game) => {
      container.innerHTML = `
        <div class="space-y-2 font-mono text-xs">
          <div class="p-2 rounded bg-cyber-dark border border-cyber-border text-[11px]">
            <div>1. Clearance &gt;= 5</div>
            <div>2. Dept == "CYBER_OPS"</div>
            <div>3. 2FA Token == True</div>
          </div>
          <button onclick="game.handleLevelAction('selectUser', 'Operative_Valkyrie')" class="w-full py-1.5 rounded bg-cyber-green/20 border border-cyber-green text-cyber-green font-bold text-xs hover:bg-cyber-green/30">
            AUTHORIZE: OPERATIVE_VALKYRIE
          </button>
        </div>
      `;
    },

    renderVisualizer: (container, level, state, game) => {
      const u = level.rawData.find(item => item.user === state.selectedUser);
      const isOk = u && u.valid;

      container.innerHTML = `
        <div class="w-full h-full flex flex-col items-center justify-center p-2 text-center font-mono">
          <div class="text-xs text-slate-400 mb-1">IAM GATEWAY STATUS:</div>
          <div class="text-base font-bold ${isOk ? 'text-cyber-green glow-green' : 'text-cyber-red glow-red'}">
            ${u.user} -> ${isOk ? 'ACCESS_GRANTED [CLEARANCE PASS]' : 'ACCESS_DENIED [SECURITY REJECT]'}
          </div>
          <div class="text-[10px] mt-1 text-slate-400">
            ${isOk ? '★ ALL 3 POLICY BRANCHES SATISFIED ★' : 'One or more predicates failed authorization check'}
          </div>
        </div>
      `;
    },

    getLivePreview: (state, level) => {
      const isMatch = (state.selectedUser === level.targetUser);
      return {
        text: state.selectedUser,
        isMatch,
        statusText: isMatch ? "VALID AUTHENTICATION PROFILE!" : "Unauthorized user credentials"
      };
    },

    validate: (state, level) => {
      const isMatch = (state.selectedUser === level.targetUser);
      return {
        success: isMatch,
        output: state.selectedUser,
        message: isMatch
          ? `ACCESS GRANTED: ${state.selectedUser} validated across tri-factor policy!`
          : `⚠️ ACCESS DENIED: ${state.selectedUser} fails policy requirements. Ensure Clearance >= 5 and Dept == CYBER_OPS!`,
        intelName: "Validated IAM Profile",
        intelValue: state.selectedUser,
        successModalDesc: `You navigated the nested clearance decision tree and authorized ${state.selectedUser}!`
      };
    },

    autoSolve: (state, level) => {
      state.selectedUser = level.targetUser;
    }
  },


  // ========================================================
  // LEVEL 10: LOWEST LATENCY // MINIMUM VALUE SEARCH (Algorithmic)
  // ========================================================
  {
    id: 10,
    type: "min_search",
    title: "LOWEST LATENCY // MINIMUM COST ROUTER",
    shortTitle: "MIN LATENCY",
    desc: 'Omega’s DDoS attack is congesting relay routes. We must route our counter-exploit payload through the server node with the LOWEST latency (ping in ms) that is ONLINE (status == "ONLINE"). Beware: Node Beta has 14ms ping, but is OFFLINE!',
    concept: '<strong class="text-cyber-green">Conditional Minimum Search:</strong> Finding the minimum element requires tracking the lowest value seen so far (<code>min_val = infinity</code>), while filtering only valid candidates (<code>if node.online and node.ping < min_val</code>).',
    handlerInitial: "Operative, scan the network topology. Filter out offline relays, then isolate the online server with minimal round-trip latency!",
    hints: [
      "Compare the ONLINE nodes: Alpha (120ms), Gamma (38ms), Delta (82ms), and Epsilon (25ms). Epsilon is online with only 25ms ping!"
    ],
    rawData: [
      { id: "Alpha", ping: 120, status: "ONLINE" },
      { id: "Beta", ping: 14, status: "OFFLINE" }, // Trap: lowest ping but offline!
      { id: "Gamma", ping: 38, status: "ONLINE" },
      { id: "Delta", ping: 82, status: "ONLINE" },
      { id: "Epsilon", ping: 25, status: "ONLINE" } // Target minimum!
    ],
    targetNode: "Epsilon",
    specs: [
      { label: "SELECTION CRITERIA", value: 'status == "ONLINE"', color: "text-cyber-green" },
      { label: "OPTIMIZATION", value: "min(ping)", color: "text-cyber-cyan" },
      { label: "TARGET RELAY", value: "Optimal Counter-Payload Node", color: "text-cyber-yellow" }
    ],
    initialState: () => ({
      selectedNode: "Alpha"
    }),
    initialCode: `# LEVEL 10: MINIMUM LATENCY ROUTE SELECTOR
min_ping = float('inf')
best_node = None
for node in relays:
    if node.status == "ONLINE" and node.ping < min_ping:
        min_ping = node.ping
        best_node = node.id
print("OPTIMAL ROUTE:", best_node)`,

    handleAction: (action, payload, state, level, game) => {
      if (action === 'selectNode') {
        state.selectedNode = payload;
        level.renderClueBar(document.getElementById('workspace-clue-bar'), level, state, game);
        level.renderVisualizer(document.getElementById('visualizer-container'), level, state, game);
        const sel = document.getElementById('l10-node-select');
        if (sel) sel.value = state.selectedNode;
        game.updateLivePreview();
      }
    },

    renderClueBar: (container, level, state, game) => {
      container.innerHTML = `
        <div class="flex items-center justify-between mb-1.5 text-[11px]">
          <span class="text-slate-400 font-bold">RELAY TOPOLOGY PINGS:</span>
          <span class="text-cyber-green text-[10px]">MIN SEARCH O(N)</span>
        </div>
        <div class="grid grid-cols-5 gap-1.5">
          ${level.rawData.map(n => {
            const isSel = (n.id === state.selectedNode);
            const isOnline = (n.status === "ONLINE");
            return `
              <button onclick="game.handleLevelAction('selectNode', '${n.id}')" class="p-1.5 rounded border text-left font-mono ${isSel ? 'border-cyber-green bg-cyber-green/20 text-cyber-green' : 'border-cyber-border bg-cyber-dark text-slate-300'}">
                <div class="font-bold text-[10px]">Node ${n.id}</div>
                <div class="text-[9px] ${isOnline ? 'text-cyber-cyan font-bold' : 'text-slate-500'}">${n.ping}ms</div>
                <div class="text-[8px] ${isOnline ? 'text-cyber-green' : 'text-cyber-red'}">${n.status}</div>
              </button>
            `;
          }).join('')}
        </div>
      `;
    },

    renderEditorCode: (container, level, state, game) => {
      container.innerHTML = `
        <div class="text-slate-500 mb-1 select-none"># LEVEL 10: OPTIMAL ROUTE SELECTOR</div>
        <div class="text-slate-300 select-none"># Objective: lowest ping among ONLINE relays</div>
        <div class="flex items-center gap-2 my-2">
          <span class="text-cyber-green font-bold">route_payload_via</span>
          <span class="text-slate-400">=</span>
          <select id="l10-node-select" onchange="game.handleLevelAction('selectNode', this.value)" class="bg-cyber-dark border border-cyber-border text-cyber-green font-bold rounded px-2 py-1 outline-none text-xs">
            ${level.rawData.map(n => `<option value="${n.id}" ${state.selectedNode === n.id ? 'selected' : ''}>Node ${n.id} (${n.ping}ms, ${n.status})</option>`).join('')}
          </select>
        </div>
        <div class="text-slate-500 select-none text-[11px]">transmit_packet_counter_strike(route_payload_via)</div>
      `;
    },

    renderEditorBlocks: (container, level, state, game) => {
      container.innerHTML = `
        <div class="space-y-2 font-mono text-xs">
          <div class="p-2 rounded bg-cyber-dark border border-cyber-border text-[11px]">
            <div>1. Filter: Node.status == "ONLINE"</div>
            <div>2. Find minimum: min(25, 38, 82, 120) = 25ms</div>
          </div>
          <button onclick="game.handleLevelAction('selectNode', 'Epsilon')" class="w-full py-1.5 rounded bg-cyber-green/20 border border-cyber-green text-cyber-green font-bold text-xs hover:bg-cyber-green/30">
            LOCK IN NODE EPSILON (25ms)
          </button>
        </div>
      `;
    },

    renderVisualizer: (container, level, state, game) => {
      const node = level.rawData.find(n => n.id === state.selectedNode);
      const isTarget = (node.id === level.targetNode);

      container.innerHTML = `
        <div class="w-full h-full flex flex-col items-center justify-center p-2 text-center font-mono">
          <div class="text-xs text-slate-400 mb-1">SELECTED ROUTE TELEMETRY:</div>
          <div class="text-lg font-black ${isTarget ? 'text-cyber-green glow-green' : (node.status === 'OFFLINE' ? 'text-cyber-red glow-red' : 'text-cyber-orange')}">
            NODE ${node.id}: ${node.ping}ms (${node.status})
          </div>
          <div class="text-[10px] mt-1 ${isTarget ? 'text-cyber-green' : 'text-slate-500'}">
            ${isTarget ? '★ OPTIMAL MINIMUM ONLINE ROUTE LOCKED ★' : (node.status === 'OFFLINE' ? 'ERROR: CANNOT ROUTE VIA OFFLINE NODE' : 'SUBOPTIMAL: A faster online node exists')}
          </div>
        </div>
      `;
    },

    getLivePreview: (state, level) => {
      const isMatch = (state.selectedNode === level.targetNode);
      return {
        text: `NODE ${state.selectedNode}`,
        isMatch,
        statusText: isMatch ? "OPTIMAL MINIMUM LATENCY NODE!" : "Selected route is suboptimal"
      };
    },

    validate: (state, level) => {
      const isMatch = (state.selectedNode === level.targetNode);
      const node = level.rawData.find(n => n.id === state.selectedNode);

      return {
        success: isMatch,
        output: `Node ${state.selectedNode} (${node.ping}ms)`,
        message: isMatch
          ? `ACCESS GRANTED: Counter-exploit transmitted via Node Epsilon at 25ms!`
          : `⚠️ ROUTING ERROR: ${node.id} is ${node.status === 'OFFLINE' ? 'OFFLINE' : 'slower than 25ms'}. Pick the online node with minimum ping!`,
        intelName: "Optimal Routing Node",
        intelValue: `Node ${state.selectedNode} (${node.ping}ms)`,
        successModalDesc: `You successfully computed the minimum cost path and routed via Node Epsilon (25ms)!`
      };
    },

    autoSolve: (state, level) => {
      state.selectedNode = level.targetNode;
    }
  },


  // ========================================================
  // LEVEL 11: QUANTUM PRIME BEACON // PRIME NUMBER DETECTOR (Algorithmic)
  // ========================================================
  {
    id: 11,
    type: "primes",
    title: "QUANTUM PRIME BEACON // PRIME NUMBER DETECTOR",
    shortTitle: "PRIME FILTER",
    desc: 'Omega radio beacons broadcast transmissions hidden strictly on prime number radio frequencies in an array: [14, 17, 21, 29, 35, 41, 51, 59, 64]. Non-prime composite numbers are decoy static noise! Filter and collect all 4 prime frequencies to isolate the beacon carrier.',
    concept: '<strong class="text-cyber-cyan">Prime Number Algorithms:</strong> A prime number <code>p > 1</code> has no positive divisors other than 1 and itself. In cryptography (RSA, Diffie-Hellman), prime numbers form the foundational trapdoor one-way functions!',
    handlerInitial: "Operative, scan the frequency spectrum. Decompose each frequency into factors. Extract the 4 prime signals: 17, 29, 41, and 59!",
    hints: [
      "Check: 14 = 2*7 (composite), 17 = prime, 21 = 3*7 (composite), 29 = prime, 35 = 5*7 (composite), 41 = prime, 51 = 3*17 (composite), 59 = prime, 64 = composite. The 4 primes are: 17, 29, 41, 59!"
    ],
    rawData: [14, 17, 21, 29, 35, 41, 51, 59, 64],
    targetPrimes: [17, 29, 41, 59],
    specs: [
      { label: "RAW FREQUENCIES", value: "9 Radio Bands", color: "text-cyber-cyan" },
      { label: "FILTER CONDITION", value: "is_prime(freq) == True", color: "text-cyber-green" },
      { label: "TARGET COUNT", value: "Exactly 4 Prime Bands", color: "text-cyber-yellow" }
    ],
    initialState: () => ({
      selectedFrequencies: [17, 29]
    }),
    initialCode: `# LEVEL 11: PRIME NUMBER FREQUENCY ISOLATOR
def is_prime(n):
    if n < 2: return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0: return False
    return True

prime_bands = [f for f in frequencies if is_prime(f)]
print("CARRIER FREQUENCIES:", prime_bands)`,

    isPrime: (n) => {
      if (n < 2) return false;
      for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
      }
      return true;
    },

    handleAction: (action, payload, state, level, game) => {
      if (action === 'toggleFreq') {
        const val = parseInt(payload);
        if (state.selectedFrequencies.includes(val)) {
          state.selectedFrequencies = state.selectedFrequencies.filter(x => x !== val);
        } else {
          state.selectedFrequencies.push(val);
          state.selectedFrequencies.sort((a,b) => a-b);
        }
        level.renderClueBar(document.getElementById('workspace-clue-bar'), level, state, game);
        level.renderVisualizer(document.getElementById('visualizer-container'), level, state, game);
        game.updateLivePreview();
      } else if (action === 'autoSelectPrimes') {
        state.selectedFrequencies = [...level.targetPrimes];
        level.renderClueBar(document.getElementById('workspace-clue-bar'), level, state, game);
        level.renderVisualizer(document.getElementById('visualizer-container'), level, state, game);
        game.updateLivePreview();
      }
    },

    renderClueBar: (container, level, state, game) => {
      container.innerHTML = `
        <div class="flex items-center justify-between mb-1.5 text-[11px]">
          <span class="text-slate-400 font-bold">FREQUENCY SPECTRUM SELECTOR:</span>
          <span class="text-cyber-cyan text-[10px]">CLICK NUMBERS TO TOGGLE</span>
        </div>
        <div class="grid grid-cols-9 gap-1">
          ${level.rawData.map(f => {
            const isSel = state.selectedFrequencies.includes(f);
            const isActualPrime = level.isPrime(f);
            return `
              <button onclick="game.handleLevelAction('toggleFreq', ${f})" class="p-1 rounded border text-center font-mono ${isSel ? (isActualPrime ? 'border-cyber-green bg-cyber-green/25 text-cyber-green' : 'border-cyber-red bg-cyber-red/25 text-cyber-red') : 'border-cyber-border bg-cyber-dark text-slate-400'}">
                <div class="text-[11px] font-bold">${f}</div>
              </button>
            `;
          }).join('')}
        </div>
      `;
    },

    renderEditorCode: (container, level, state, game) => {
      container.innerHTML = `
        <div class="text-slate-500 mb-1 select-none"># LEVEL 11: PRIME DETECTION SCRIPT</div>
        <div class="text-slate-300 select-none">frequencies = [${level.rawData.join(', ')}]</div>
        <div class="my-2">
          <span class="text-cyber-cyan font-bold">selected_primes</span> = 
          <span class="text-cyber-green font-bold font-mono">[${state.selectedFrequencies.join(', ')}]</span>
        </div>
        <div class="text-slate-500 select-none text-[11px]">tune_receiver_to(selected_primes)</div>
      `;
    },

    renderEditorBlocks: (container, level, state, game) => {
      container.innerHTML = `
        <div class="space-y-2 font-mono text-xs">
          <div class="p-2 rounded bg-cyber-dark border border-cyber-border text-[11px]">
            <span class="text-slate-400">PRIME CANDIDATES:</span>
            <div class="text-cyber-cyan mt-1">17, 29, 41, 59 have no factors other than 1 and themselves!</div>
          </div>
          <button onclick="game.handleLevelAction('autoSelectPrimes')" class="w-full py-1.5 rounded bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan font-bold text-xs hover:bg-cyber-cyan/30">
            ⚡ SELECT ALL 4 PRIME FREQUENCIES
          </button>
        </div>
      `;
    },

    renderVisualizer: (container, level, state, game) => {
      const sel = state.selectedFrequencies;
      const isExact = (sel.length === level.targetPrimes.length && level.targetPrimes.every(p => sel.includes(p)));

      container.innerHTML = `
        <div class="w-full h-full flex flex-col items-center justify-center p-2 text-center font-mono">
          <div class="text-xs text-slate-400 mb-1">RADIO BEACON CARRIER SPECTRUM:</div>
          <div class="text-sm font-bold ${isExact ? 'text-cyber-green glow-green' : 'text-cyber-yellow'}">
            TUNED BANDS: [${sel.join(', ') || 'NONE'}] (${sel.length}/4 Primes)
          </div>
          <div class="text-[10px] mt-1 ${isExact ? 'text-cyber-green font-bold' : 'text-slate-400'}">
            ${isExact ? '★ QUANTUM BEACON CARRIER LOCKED ★' : 'Carrier signal noisy: Must contain only the 4 primes'}
          </div>
        </div>
      `;
    },

    getLivePreview: (state, level) => {
      const sel = state.selectedFrequencies;
      const isExact = (sel.length === level.targetPrimes.length && level.targetPrimes.every(p => sel.includes(p)));
      return {
        text: `[${sel.join(', ')}]`,
        isMatch: isExact,
        statusText: isExact ? "ALL 4 PRIME BANDS IDENTIFIED!" : `Tuned: ${sel.length}/4 prime bands`
      };
    },

    validate: (state, level) => {
      const sel = state.selectedFrequencies;
      const isExact = (sel.length === level.targetPrimes.length && level.targetPrimes.every(p => sel.includes(p)));

      return {
        success: isExact,
        output: `[${sel.join(', ')}]`,
        message: isExact
          ? `ACCESS GRANTED: Beacon locked on frequencies [${sel.join(', ')}]!`
          : `⚠️ SIGNAL NOISE: Selected set [${sel.join(', ')}] contains non-primes or is missing primes. Check: 17, 29, 41, 59!`,
        intelName: "Quantum Prime Frequencies",
        intelValue: `[${sel.join(', ')}]`,
        successModalDesc: `You eliminated composite decoys and captured prime beacon frequencies [17, 29, 41, 59]!`
      };
    },

    autoSolve: (state, level) => {
      state.selectedFrequencies = [...level.targetPrimes];
    }
  },


  // ========================================================
  // LEVEL 12: SHORTEST JOB FIRST // GREEDY SCHEDULER (Algorithmic)
  // ========================================================
  {
    id: 12,
    type: "greedy_sjf",
    title: "SHORTEST JOB FIRST // GREEDY SCHEDULER",
    shortTitle: "SJF GREEDY",
    desc: 'Omega initiates a memory wiper in 30 seconds! We have 5 data extraction jobs with execution durations: A (8s), B (18s), C (5s), D (12s), E (4s). Using the Greedy "Shortest Job First" algorithm, select the optimal 4 tasks that fit within the 30-second window!',
    concept: '<strong class="text-cyber-green">Greedy Heuristics & Job Scheduling:</strong> In operating systems, the Shortest Job First (SJF) algorithm minimizes average waiting time and maximizes task throughput under tight deadlines by prioritizing the smallest jobs first.',
    handlerInitial: "Cadet, sorting by ascending duration gives: E (4s) -> C (5s) -> A (8s) -> D (12s). Total = 29s! Select tasks E, C, A, and D to rescue 4 files before the wipe!",
    hints: [
      "Avoid Task B (18s) because it wastes the quota! Choose E (4s) + C (5s) + A (8s) + D (12s) = 29s <= 30s. Exactly 4 tasks!"
    ],
    rawData: [
      { id: "A", time: 8 },
      { id: "B", time: 18 }, // Avoid
      { id: "C", time: 5 },
      { id: "D", time: 12 },
      { id: "E", time: 4 }
    ],
    targetTasks: ["E", "C", "A", "D"],
    maxBudget: 30,
    specs: [
      { label: "TIME BUDGET", value: "30 Seconds Max", color: "text-cyber-red" },
      { label: "STRATEGY", value: "Greedy Shortest Job First (SJF)", color: "text-cyber-green" },
      { label: "OBJECTIVE", value: "Maximize Completed Tasks (4 Tasks)", color: "text-cyber-cyan" }
    ],
    initialState: () => ({
      selectedTasks: ["E", "C"]
    }),
    initialCode: `# LEVEL 12: GREEDY TASK SCHEDULER
tasks.sort(key=lambda x: x.duration) # Ascending SJF
# Selected: E(4) + C(5) + A(8) + D(12) = 29s <= 30s
schedule = ["E", "C", "A", "D"]
print("EXECUTING PIPELINE:", schedule)`,

    handleAction: (action, payload, state, level, game) => {
      if (action === 'toggleTask') {
        const id = payload;
        if (state.selectedTasks.includes(id)) {
          state.selectedTasks = state.selectedTasks.filter(x => x !== id);
        } else {
          state.selectedTasks.push(id);
        }
        level.renderClueBar(document.getElementById('workspace-clue-bar'), level, state, game);
        level.renderVisualizer(document.getElementById('visualizer-container'), level, state, game);
        game.updateLivePreview();
      } else if (action === 'autoSchedule') {
        state.selectedTasks = ["E", "C", "A", "D"];
        level.renderClueBar(document.getElementById('workspace-clue-bar'), level, state, game);
        level.renderVisualizer(document.getElementById('visualizer-container'), level, state, game);
        game.updateLivePreview();
      }
    },

    getTotalTime: (state, level) => {
      return state.selectedTasks.reduce((sum, tid) => {
        const t = level.rawData.find(item => item.id === tid);
        return sum + (t ? t.time : 0);
      }, 0);
    },

    renderClueBar: (container, level, state, game) => {
      const totalTime = level.getTotalTime(state, level);
      container.innerHTML = `
        <div class="flex items-center justify-between mb-1 text-[11px]">
          <span class="text-slate-400 font-bold">TASK QUEUE (SJF CANDIDATES):</span>
          <span class="${totalTime > 30 ? 'text-cyber-red' : 'text-cyber-green'} text-[10px] font-bold">TIME: ${totalTime}s / 30s</span>
        </div>
        <div class="grid grid-cols-5 gap-1.5">
          ${level.rawData.map(t => {
            const isSel = state.selectedTasks.includes(t.id);
            return `
              <button onclick="game.handleLevelAction('toggleTask', '${t.id}')" class="p-1.5 rounded border text-left font-mono ${isSel ? 'border-cyber-green bg-cyber-green/20 text-cyber-green' : 'border-cyber-border bg-cyber-dark text-slate-300'}">
                <div class="font-bold text-[10px]">Task ${t.id}</div>
                <div class="text-[9px] text-slate-400">Duration: ${t.time}s</div>
              </button>
            `;
          }).join('')}
        </div>
      `;
    },

    renderEditorCode: (container, level, state, game) => {
      const totalTime = level.getTotalTime(state, level);
      container.innerHTML = `
        <div class="text-slate-500 mb-1 select-none"># LEVEL 12: SJF OPTIMIZER</div>
        <div class="text-slate-300 select-none">budget = 30 # seconds</div>
        <div class="my-2">
          <span class="text-cyber-cyan font-bold">execution_pipeline</span> = 
          <span class="text-cyber-green font-bold font-mono">[${state.selectedTasks.map(x => `"${x}"`).join(', ')}]</span>
        </div>
        <div class="text-slate-400 select-none text-[11px]">Total Time: ${totalTime}s | Max Tasks: 4</div>
      `;
    },

    renderEditorBlocks: (container, level, state, game) => {
      container.innerHTML = `
        <div class="space-y-2 font-mono text-xs">
          <div class="p-2 rounded bg-cyber-dark border border-cyber-border text-[11px]">
            <span class="text-slate-400">SORT BY DURATION (SJF):</span>
            <div class="text-cyber-green mt-1">E(4s) + C(5s) + A(8s) + D(12s) = 29s (4 Tasks)</div>
          </div>
          <button onclick="game.handleLevelAction('autoSchedule')" class="w-full py-1.5 rounded bg-cyber-green/20 border border-cyber-green text-cyber-green font-bold text-xs hover:bg-cyber-green/30">
            ⚡ SELECT GREEDY OPTIMAL (E, C, A, D)
          </button>
        </div>
      `;
    },

    renderVisualizer: (container, level, state, game) => {
      const totalTime = level.getTotalTime(state, level);
      const isOptimal = (state.selectedTasks.length === 4 && totalTime <= 30);

      container.innerHTML = `
        <div class="w-full h-full flex flex-col justify-between p-1.5 font-mono">
          <div class="flex items-center justify-between text-[10px] text-slate-400">
            <span>PIPELINE: ${state.selectedTasks.length} TASKS</span>
            <span class="${totalTime <= 30 ? 'text-cyber-green' : 'text-cyber-red'} font-bold">${totalTime}s / 30s BUDGET</span>
          </div>

          <div class="relative w-full h-8 bg-black rounded border border-cyber-border overflow-hidden my-1">
            <div class="h-full bg-gradient-to-r from-cyber-green via-cyber-cyan to-cyber-orange transition-all" style="width: ${Math.min(100, (totalTime/30)*100)}%;"></div>
          </div>

          <div class="text-center text-[10px] ${isOptimal ? 'text-cyber-green font-bold' : (totalTime > 30 ? 'text-cyber-red font-bold' : 'text-slate-400')}">
            ${isOptimal ? '★ OPTIMAL GREEDY THROUGHPUT ACHIEVED (4 TASKS)! ★' : (totalTime > 30 ? 'OVER BUDGET: Execution exceeds 30s limit!' : 'Under capacity: Can rescue more tasks with SJF')}
          </div>
        </div>
      `;
    },

    getLivePreview: (state, level) => {
      const totalTime = level.getTotalTime(state, level);
      const isOptimal = (state.selectedTasks.length === 4 && totalTime <= 30);
      return {
        text: `${state.selectedTasks.length} Tasks (${totalTime}s)`,
        isMatch: isOptimal,
        statusText: isOptimal ? "OPTIMAL SJF SCHEDULE!" : `Selected: ${totalTime}s / 30s`
      };
    },

    validate: (state, level) => {
      const totalTime = level.getTotalTime(state, level);
      const isOptimal = (state.selectedTasks.length === 4 && totalTime <= 30);

      return {
        success: isOptimal,
        output: `[${state.selectedTasks.join(', ')}] (${totalTime}s)`,
        message: isOptimal
          ? `ACCESS GRANTED: Pipeline executed in ${totalTime}s! 4 tasks salvaged.`
          : `⚠️ SCHEDULER ERROR: ${totalTime > 30 ? 'Total time exceeded 30s!' : 'Fewer than 4 tasks scheduled. Use Shortest Job First!'}`,
        intelName: "Optimal SJF Execution Queue",
        intelValue: `[${state.selectedTasks.join(', ')}]`,
        successModalDesc: `You applied Greedy Shortest Job First to rescue 4 critical tasks within 29 seconds!`
      };
    },

    autoSolve: (state, level) => {
      state.selectedTasks = ["E", "C", "A", "D"];
    }
  },


  // ========================================================
  // LEVEL 13: OMEGA CORE MELTDOWN // PALINDROME OVERRIDE (Final Boss)
  // ========================================================
  {
    id: 13,
    type: "palindrome",
    title: "OMEGA CORE MELTDOWN // PALINDROME OVERRIDE",
    shortTitle: "OMEGA BOSS",
    desc: 'FINAL BOSS: You stand before the central Omega AI Core! The reactor self-destruct mechanism requires a symmetrical Palindrome override token (identical backwards and forwards) of length 7 hidden among candidate memory dumps. Locate and inject the true palindrome to collapse the syndicate mainframe!',
    concept: '<strong class="text-cyber-cyan">Palindrome Verification & Symmetry:</strong> A string is a palindrome if <code>s == reverse(s)</code>. Two-pointer checks compare characters from outside inward <code>(s[left] == s[right])</code> with $O(N)$ time complexity.',
    handlerInitial: "Operative! This is the climax of Operation Cyber Heist! The central firewall requires a symmetrical 7-letter palindrome. Analyze the candidates and trigger the core meltdown!",
    hints: [
      "Check candidate 'ROTATOR': R-O-T-A-T-O-R backwards is still R-O-T-A-T-O-R! That is the self-destruct palindrome override key!"
    ],
    rawData: ["CYBER99", "RADAR01", "ROTATOR", "MATRIX1"],
    targetPalindrome: "ROTATOR",
    specs: [
      { label: "TARGET ENTITY", value: "Omega Core AI Reactor", color: "text-cyber-red" },
      { label: "SYMMETRY RULE", value: "token == token[::-1]", color: "text-cyber-green" },
      { label: "TOKEN LENGTH", value: "7 Characters", color: "text-cyber-yellow" }
    ],
    initialState: () => ({
      selectedCandidate: "CYBER99"
    }),
    initialCode: `# LEVEL 13: FINAL CORE PALINDROME OVERRIDE
def is_palindrome(s):
    return s == s[::-1]

for token in core_dumps:
    if is_palindrome(token) and len(token) == 7:
        meltdown_key = token
trigger_core_overload(meltdown_key)`,

    isPalindrome: (s) => {
      return s === s.split('').reverse().join('');
    },

    handleAction: (action, payload, state, level, game) => {
      if (action === 'selectCandidate') {
        state.selectedCandidate = payload;
        level.renderClueBar(document.getElementById('workspace-clue-bar'), level, state, game);
        level.renderVisualizer(document.getElementById('visualizer-container'), level, state, game);
        const sel = document.getElementById('l13-token-select');
        if (sel) sel.value = state.selectedCandidate;
        game.updateLivePreview();
      }
    },

    renderClueBar: (container, level, state, game) => {
      container.innerHTML = `
        <div class="flex items-center justify-between mb-1.5 text-[11px]">
          <span class="text-slate-400 font-bold">CORE REACTOR CANDIDATES:</span>
          <span class="text-cyber-red text-[10px]">PALINDROME TOKEN</span>
        </div>
        <div class="grid grid-cols-4 gap-1.5">
          ${level.rawData.map(c => {
            const isSel = (c === state.selectedCandidate);
            const isPal = level.isPalindrome(c);
            return `
              <button onclick="game.handleLevelAction('selectCandidate', '${c}')" class="p-1.5 rounded border text-center font-mono ${isSel ? (isPal ? 'border-cyber-green bg-cyber-green/20 text-cyber-green' : 'border-cyber-orange bg-cyber-orange/20 text-cyber-orange') : 'border-cyber-border bg-cyber-dark text-slate-300'}">
                <div class="font-bold text-xs">${c}</div>
                <div class="text-[9px] text-slate-500">${c.split('').reverse().join('')}</div>
              </button>
            `;
          }).join('')}
        </div>
      `;
    },

    renderEditorCode: (container, level, state, game) => {
      container.innerHTML = `
        <div class="text-slate-500 mb-1 select-none"># LEVEL 13: OMEGA CORE PALINDROME OVERRIDE</div>
        <div class="text-slate-300 select-none">candidates = ${JSON.stringify(level.rawData)}</div>
        <div class="flex items-center gap-2 my-2">
          <span class="text-cyber-red font-bold">inject_override_key</span>
          <span class="text-slate-400">=</span>
          <select id="l13-token-select" onchange="game.handleLevelAction('selectCandidate', this.value)" class="bg-cyber-dark border border-cyber-border text-cyber-green font-bold rounded px-2 py-1 outline-none text-xs">
            ${level.rawData.map(c => `<option value="${c}" ${state.selectedCandidate === c ? 'selected' : ''}>"${c}" (Reverse: "${c.split('').reverse().join('')}")</option>`).join('')}
          </select>
        </div>
        <div class="text-slate-500 select-none text-[11px]">initiate_mainframe_meltdown(inject_override_key)</div>
      `;
    },

    renderEditorBlocks: (container, level, state, game) => {
      container.innerHTML = `
        <div class="space-y-2 font-mono text-xs">
          <div class="p-2 rounded bg-cyber-dark border border-cyber-border text-[11px]">
            <span class="text-slate-400">SYMMETRICAL CHECK:</span>
            <div class="text-cyber-green font-bold mt-1">R - O - T - A - T - O - R (Identical forwards and backwards!)</div>
          </div>
          <button onclick="game.handleLevelAction('selectCandidate', 'ROTATOR')" class="w-full py-2 rounded bg-cyber-red hover:bg-red-500 text-black font-display font-black text-xs tracking-wider shadow-[0_0_20px_rgba(255,42,85,0.4)]">
            💥 TRIGGER CORE OVERRIDE (ROTATOR)
          </button>
        </div>
      `;
    },

    renderVisualizer: (container, level, state, game) => {
      const c = state.selectedCandidate;
      const isPal = level.isPalindrome(c);

      container.innerHTML = `
        <div class="w-full h-full flex flex-col items-center justify-center p-2 text-center font-mono">
          <div class="text-xs text-slate-400 mb-1">CORE CONTAINMENT SHIELD INTEGRITY:</div>
          <div class="text-2xl font-black tracking-widest ${isPal ? 'text-cyber-green glow-green' : 'text-cyber-red glow-red'}">
            "${c}" ${isPal ? '== "' + c + '"' : '!= "' + c.split('').reverse().join('') + '"'}
          </div>
          <div class="text-[10px] mt-1.5 ${isPal ? 'text-cyber-green font-bold' : 'text-slate-500'}">
            ${isPal ? '🚨 CRITICAL MELTDOWN AUTHORIZED: CORE DEFENSES SHATTERED!' : 'SYMMETRY MISMATCH: Containment field holds'}
          </div>
        </div>
      `;
    },

    getLivePreview: (state, level) => {
      const isMatch = (state.selectedCandidate === level.targetPalindrome);
      return {
        text: `"${state.selectedCandidate}"`,
        isMatch,
        statusText: isMatch ? "VALID PALINDROME OVERRIDE!" : "Candidate is not symmetrical"
      };
    },

    validate: (state, level) => {
      const isMatch = (state.selectedCandidate === level.targetPalindrome);
      return {
        success: isMatch,
        output: `"${state.selectedCandidate}"`,
        message: isMatch
          ? `ACCESS GRANTED: Core Palindrome verified! Omega mainframe completely neutralized!`
          : `⚠️ REJECTION: "${state.selectedCandidate}" reversed is "${state.selectedCandidate.split('').reverse().join('')}". It is not a palindrome!`,
        intelName: "Omega Core Meltdown Key",
        intelValue: state.selectedCandidate,
        successModalDesc: `You cracked the final boss vault with Palindrome key "ROTATOR"! The Omega mainframe has been defeated!`
      };
    },

    autoSolve: (state, level) => {
      state.selectedCandidate = level.targetPalindrome;
    }
  }
];
