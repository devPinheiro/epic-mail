// let use something different
let $ = selector => document.querySelector(selector);


let sidebar = $('.sidebar'),
    main = $('.main'),
    openSidebar = $('.open-sidebar'),
    closeSidebar = $('.close-sidebar');

// Menu Navigation
openSidebar.addEventListener('click', () => {
    // open
    openSidebar.style.display = 'none';
    closeSidebar.style.display = "block";
    sidebar.style.width = "200px";
    main.style.marginLeft = "200px";

});


closeSidebar.addEventListener('click', () => {
    sidebar.style.width = "0px";
    main.style.marginLeft = "0px";
    openSidebar.style.display = 'block';
    closeSidebar.style.display = "none";
});