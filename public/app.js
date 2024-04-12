function addSnack() {
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const calories = document.getElementById('calories').value;

    fetch('/add-snack', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, category, calories })
    })
    .then(response => response.json())
    .then(data => {
        const snackList = document.getElementById('snackList');
        const li = document.createElement('li');
        li.textContent = `${data.name} - ${data.category} - ${data.calories} calories`;
        snackList.appendChild(li);

        document.getElementById('name').value = '';
        document.getElementById('category').value = '';
        document.getElementById('calories').value = '';
    })
    .catch(error => console.error('Error:', error));
}
