document.addEventListener('DOMContentLoaded', () => {
    function loadUserData() {
        const data = localStorage.getItem('disasterQuizUser');
        return data ? JSON.parse(data) : { name: "Guest", totalPoints: 0, badgesEarned: [] };
    }

    function getRank(points) {
        if (points >= 500) return "Disaster Marshal";
        if (points >= 250) return "Triage Specialist";
        if (points >= 100) return "Safety Captain";
        if (points >= 50) return "First Responder";
        return "Novice";
    }

    function displayUserData() {
        const userData = loadUserData();
        document.getElementById('user-name').textContent = userData.name;
        document.getElementById('user-points').textContent = `${userData.totalPoints} Points`;
        document.getElementById('user-rank').textContent = getRank(userData.totalPoints);
        
        userData.badgesEarned.forEach(badgeId => {
            const badgeElement = document.querySelector(`.badge[data-id="${badgeId}"]`);
            if (badgeElement) {
                badgeElement.classList.add('earned');
            }
        });
    }

    displayUserData();

    const badges = document.querySelectorAll('.badge');
    const tooltip = document.getElementById('badge-tooltip');
    
    badges.forEach(badge => {
        badge.addEventListener('mousemove', (e) => {
            const title = badge.dataset.title;
            const description = badge.dataset.description;
            
            tooltip.innerHTML = `<strong>${title}</strong><br>${description}`;
            tooltip.classList.add('visible');
            
            const x = e.clientX + 15;
            const y = e.clientY + 15;
            tooltip.style.left = x + 'px';
            tooltip.style.top = y + 'px';
        });

        badge.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visible');
        });
    });
});