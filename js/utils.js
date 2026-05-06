export function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

export function escapeAttribute(value) {
    return String(value).replaceAll('"', '&quot;');
}

export function formatUpdatedAt(value) {
    const updatedDate = new Date(value);
    if (Number.isNaN(updatedDate.getTime())) {
        return 'Recently updated';
    }

    return `Updated ${updatedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
}