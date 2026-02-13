/**
 * RezGui Entries - flydubai Contact Center Reference
 * Search and filter RezGui command entries
 */
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const cards = document.querySelectorAll('.card');

    function filterEntries() {
        const q = (searchInput && searchInput.value || '').trim().toLowerCase();
        cards.forEach(function (card) {
            if (!q) {
                card.classList.remove('hidden');
                card.querySelectorAll('tr').forEach(function (r) { r.classList.remove('hidden'); });
                return;
            }
            const rows = card.querySelectorAll('tbody tr');
            let visibleCount = 0;
            rows.forEach(function (row) {
                const text = row.textContent.toLowerCase();
                const match = text.includes(q);
                row.classList.toggle('hidden', !match);
                if (match) visibleCount++;
            });
            card.classList.toggle('hidden', visibleCount === 0);
        });
    }

    if (searchInput) searchInput.addEventListener('input', filterEntries);
});
