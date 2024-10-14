
document.addEventListener('DOMContentLoaded', function () {
    const openPopupBtn = document.getElementById('openPopupBtn');
    const submitBtn = document.querySelector('.submit-btn');

    if (openPopupBtn) {
        openPopupBtn.addEventListener('click', openPopupFunction);
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', function () {
            const name = document.getElementById('name').value.trim();
            const desc = document.getElementById('desc').value.trim();

            if (name && desc) {
                const newAnalysis = { name: name, description: desc };
                let analyses = JSON.parse(localStorage.getItem('analyses')) || [];
                analyses.push(newAnalysis);
                localStorage.setItem('analyses', JSON.stringify(analyses));
                document.getElementById('popupForm').style.display = 'none';
                document.getElementById('name').value = '';
                document.getElementById('desc').value = '';
                window.location = "../view_page/viewpage.html";
            } else {
                alert('Please fill in both fields.');
            }
        });
    }
});
