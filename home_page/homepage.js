// document.querySelectorAll('.feature button').forEach(button => {
//     button.addEventListener('click', () => {
//         alert('Feature coming soon!');
//     });
// });

function loadViewPage(){
    window.location = "../view_page/viewpage.html"
}

document.addEventListener('DOMContentLoaded', function () {
    console.log("Inside create")
    const openPopupBtn = document.getElementById('openPopupBtn');
    if (openPopupBtn) {
        openPopupBtn.addEventListener('click', openPopupFunction);
    }
});
