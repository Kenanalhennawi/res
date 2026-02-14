/**
 * RezGui Entries - flydubai Contact Center Reference
 * Introduction & PNR Retrieve always visible; rest shown on search
 */
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearBtn');
    const contentArea = document.getElementById('contentArea');
    const searchHint = document.getElementById('searchHint');
    const cards = document.querySelectorAll('#contentArea .card');

    function updateClearBtn() {
        if (clearBtn) clearBtn.classList.toggle('hidden', !(searchInput && searchInput.value.trim()));
    }

    var helpCommands = ['HELP/LBA', 'HELP/A', 'HELP/LBO', 'HELP/LBI', 'HELP/LBX', 'HELP/LSA', 'HELP/LNA', 'HELP/LGA', 'HELP/LDT'];

    function filterEntries() {
        const raw = (searchInput && searchInput.value || '').trim();
        const q = raw.toLowerCase();
        updateClearBtn();

        if (!q) {
            contentArea.classList.add('hidden');
            if (searchHint) searchHint.classList.remove('hidden');
            return;
        }

        if (searchHint) searchHint.classList.add('hidden');
        contentArea.classList.remove('hidden');

        var exactHelp = helpCommands.find(function (cmd) { return cmd.toLowerCase() === q; });

        if (exactHelp) {
            cards.forEach(function (card) {
                var dataHelp = card.getAttribute('data-help');
                if (dataHelp && dataHelp.toUpperCase() === exactHelp.toUpperCase()) {
                    card.classList.remove('hidden');
                    card.querySelectorAll('tbody tr').forEach(function (row) { row.classList.remove('hidden'); });
                } else {
                    card.classList.add('hidden');
                }
            });
        } else {
            cards.forEach(function (card) {
                const rows = card.querySelectorAll('tbody tr');
                if (rows.length === 0) {
                    const text = card.textContent.toLowerCase();
                    card.classList.toggle('hidden', !text.includes(q));
                } else {
                    let visibleCount = 0;
                    rows.forEach(function (row) {
                        const text = row.textContent.toLowerCase();
                        const match = text.includes(q);
                        row.classList.toggle('hidden', !match);
                        if (match) visibleCount++;
                    });
                    card.classList.toggle('hidden', visibleCount === 0);
                }
            });
        }
    }

    if (searchInput) searchInput.addEventListener('input', filterEntries);
    if (clearBtn) clearBtn.onclick = function () {
        if (searchInput) { searchInput.value = ''; searchInput.focus(); }
        filterEntries();
    };

    document.querySelectorAll('.help-chip').forEach(function (btn) {
        btn.onclick = function () {
            var q = btn.getAttribute('data-search') || '';
            if (searchInput) { searchInput.value = q; searchInput.focus(); }
            filterEntries();
        };
    });
});
