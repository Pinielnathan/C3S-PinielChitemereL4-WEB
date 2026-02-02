// --- TRACK LIST ---
const MY_TRACKS = [
    { title: "The Two Loners", youtube: "https://youtu.be/W6ZuSZrJAMM" },
    { title: "Despondency", youtube: "https://youtu.be/u59d_gb88_I" },
    { title: "Sadder than Ever", youtube: "https://youtu.be/bRypPe-N-zk" },
    { title: "OTL (Interlude)", youtube: "https://youtu.be/DV_qE0wujMw" },
    { title: "Faction Party ft. Ks Gates", youtube: "https://youtu.be/6pWHFY4hnCw" },
    { title: "MELOSPAT", youtube: "https://youtu.be/8bAiRFsUxJI" },
    { title: "Heavy-Hearted", youtube: "https://youtu.be/ID-x6NbEeaY" },
    { title: "Holy Numbers", youtube: "https://youtu.be/-Qak1OZ-ivc" },
    { title: "Angel of Luck", youtube: "https://youtu.be/3R5p0v9wPok" },
    { title: "Heaven Gates", youtube: "https://youtu.be/l95qBwZCWeI?si=qu4a3NUExwUU7FTo" },
    { title: "Wounds of Grace", youtube: "https://youtu.be/v6hZGxVz01Y" },
    { title: "XVII", youtube: "https://youtu.be/hl0COGEVXQk" },
    { title: "TILL DEATH", youtube: "https://youtu.be/Vx1CjuNO_Rk?si=hPmrKsJZk5L7P20C" },
    { title: "GUITAR BOY", youtube: "https://youtu.be/op-qR7jLCzk?si=LUDIj9GFOniF1WgP" },
    { title: "PERIFIDIOUS LOVER", youtube: "https://youtu.be/WZVzu12IMa0?si=t3uCMkVt_QL0teWw" }
];

// --- CUSTOM API ---
async function loadMBAlbums() {
    const container = document.getElementById('album-grid');
    if (!container) return; 

    const ALBUM_DATA = [
        { title: "BILLIE:RACHIE", mbid: "2768f6ed-1c50-414b-8691-4f5cd87987b2" },
        { title: "Holy Numerals", mbid: "eb87b787-c071-4013-a1e6-c795e38f3ce1" },
        { title: "DESPONDENT ANGEL", mbid: "8ec68c87-3b99-4785-a934-83794691d370" },
        { title: "How it Started", mbid: "a72df863-19aa-41d8-9b2b-78cad97a1425" }
    ];

    container.innerHTML = "";
    ALBUM_DATA.forEach(album => {
        const coverArtUrl = `https://coverartarchive.org/release/${album.mbid}/front-500`;
        container.innerHTML += `
            <div class="card">
                <img src="${coverArtUrl}" class="album-cover" alt="${album.title}" onerror="this.src='placeholder.jpg';">
                <div class="album-info">
                    <h3>${album.title}</h3>
                    <p>Album</p>
                </div>
            </div>`;
    });
}

function loadManualTracks() {
    const container = document.getElementById('track-list');
    if (!container) return;

    container.innerHTML = "";
    MY_TRACKS.forEach((track) => {
        const videoId = track.youtube.split('/').pop().split('?')[0];
        const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        container.innerHTML += `
            <a href="${track.youtube}" target="_blank" class="track-link">
                <div class="track-item card">
                    <img src="${thumbUrl}" class="track-bg-art" style="position: absolute; right: 0; top: 0; width: 35%; height: 100%; object-fit: cover; opacity: 0.30; z-index: 0; pointer-events: none;">
                    <span class="track-title">${track.title}</span>
                </div>
            </a>`;
    });
}

// --- 4. INITIALIZE ---
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('album-grid')) loadMBAlbums();
    if (document.getElementById('track-list')) loadManualTracks();
});
// --- CONTACT FORM HANDLER ---
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    const successMessage = document.getElementById('successMessage');

    if (contactForm && successMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevents the page from refreshing
            
            successMessage.style.display = 'block';

            contactForm.reset();
        });
    }
});

function handlePresave(button) {
    button.textContent = "Presaved ✓";
    button.style.background = "#222";
    button.style.color = "#a855f7";
    button.style.borderColor = "#a855f7";
    button.style.cursor = "default";
    button.disabled = true;
}

function filterTracks() {
    const query = document.getElementById('track-search').value.toLowerCase();
    const container = document.getElementById('track-list');
    if (!container) return;

    const filtered = MY_TRACKS.filter(track => 
        track.title.toLowerCase().includes(query)
    );

    // list with only matches
    container.innerHTML = "";
    filtered.forEach((track) => {
        const videoId = track.youtube.split('/').pop().split('?')[0];
        const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        container.innerHTML += `
            <a href="${track.youtube}" target="_blank" class="track-link">
                <div class="track-item card">
                    <img src="${thumbUrl}" class="track-bg-art" style="position: absolute; right: 0; top: 0; width: 35%; height: 100%; object-fit: cover; opacity: 0.30; z-index: 0; pointer-events: none;">
                    <span class="track-title">${track.title}</span>
                </div>
            </a>`;
    });

    if (filtered.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:#888; margin-top:20px;">No tracks found matching "${query}"</p>`;
    }
}