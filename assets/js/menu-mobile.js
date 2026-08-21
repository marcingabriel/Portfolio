document.addEventListener('DOMContentLoaded', () => {
    const btnMenu = document.querySelector('[data-menu="button"]');
    const menuList = document.querySelector('[data-menu="list"]');
    
    if (btnMenu && menuList) {
        // Toggle menu on button click
        btnMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            menuList.classList.toggle('active');
            btnMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        menuList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuList.classList.remove('active');
                btnMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuList.contains(e.target) && !btnMenu.contains(e.target)) {
                menuList.classList.remove('active');
                btnMenu.classList.remove('active');
            }
        });
    }
});
