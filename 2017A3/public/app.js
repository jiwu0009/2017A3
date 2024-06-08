function addChocolate() {
    const name = document.getElementById('name').value;
    const type = document.getElementById('type').value;
    const calories = parseInt(document.getElementById('calories').value, 10);
    const ingredients = document.getElementById('ingredients').value;
    const comments = document.getElementById('comments').value;
    const rating = parseInt(document.getElementById('rating').value, 10);  // Get the rating

    const dateAdded = new Date().toISOString().split('T')[0];

    // Get the image input and destination elements
    const imgInput = document.getElementById("img-input");
    let imgData = '';

    if (imgInput.files.length > 0) {
        const reader = new FileReader();
        reader.onloadend = function (e) {
            imgData = e.target.result;
            saveChocolate(name, type, calories, ingredients, comments, rating, dateAdded, imgData);
        };
        reader.readAsDataURL(imgInput.files[0]);
    } else {
        saveChocolate(name, type, calories, ingredients, comments, rating, dateAdded, imgData);
    }
}
    //Save chocolate details to localStorage

function saveChocolate(name, type, calories, ingredients, comments, rating, dateAdded, imgData) {
    let chocolates = JSON.parse(localStorage.getItem('favChocolates')) || [];
    chocolates.push({ name, type, calories, ingredients, comments, rating, dateAdded, imgData });  // 添加评分和图片数据到对象中
    localStorage.setItem('favChocolates', JSON.stringify(chocolates));
    updateChocolates();
    calculateTotalCalories();
    updateStatistics();
    document.getElementById('chocolateForm').reset();
}

// Update the display of chocolates by date
function updateChocolates() {
    let chocolates = JSON.parse(localStorage.getItem('favChocolates')) || [];
    let container = document.getElementById('chocolatesByDate');
    container.innerHTML = '';

    let groupedByDate = chocolates.reduce((acc, choco) => {
        (acc[choco.dateAdded] = acc[choco.dateAdded] || []).push(choco);
        return acc;
    }, {});

    Object.keys(groupedByDate).forEach(date => {
        let datePanel = document.createElement('div');
        let toggleButton = document.createElement('button');
        toggleButton.textContent = `Date：${date} (Total calories: ${groupedByDate[date].reduce((sum, item) => sum + item.calories, 0)})`;

        let detailsDiv = document.createElement('div');
        detailsDiv.style.display = 'none';

        groupedByDate[date].forEach((item, index) => {
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'choco-checkbox';
            checkbox.value = JSON.stringify({ date, index });
            checkbox.style.display = 'none'; // 隐藏选择框

            let detail = document.createElement('p');
            detail.textContent = `${item.name} - ${item.type} - ${item.calories} calories - Ingredients: ${item.ingredients} - Comments: ${item.comments} - Rate: ${"⭐️".repeat(item.rating)}`;
            if (item.imgData) {
                let img = document.createElement('img');
                img.src = item.imgData;
                img.alt = item.name;
                img.style.maxWidth = '100px';
                img.style.marginLeft = '10px';
                detail.appendChild(img);
            }
            detail.prepend(checkbox);
            detailsDiv.appendChild(detail);
        });

        toggleButton.onclick = () => {
            detailsDiv.style.display = detailsDiv.style.display === 'block' ? 'none' : 'block';
        };

        datePanel.appendChild(toggleButton);
        datePanel.appendChild(detailsDiv);
        container.appendChild(datePanel);
    });

    // Update the chocolates by rating
    updateChocolatesByRating();
}

// Delete selected chocolates
function deleteSelectedChocolates() {
    let checkboxes = document.querySelectorAll('.choco-checkbox:checked');
    let chocolates = JSON.parse(localStorage.getItem('favChocolates'));

    checkboxes.forEach(checkbox => {
        let { date, index } = JSON.parse(checkbox.value);
        chocolates = chocolates.filter((choco, i) => !(choco.dateAdded === date && i === index));
    });

    localStorage.setItem('favChocolates', JSON.stringify(chocolates));
    updateChocolates();
    calculateTotalCalories();
    updateStatistics();
}

document.getElementById('deleteSelected').addEventListener('click', deleteSelectedChocolates);

document.getElementById("toggleDeleteButtons").addEventListener('click', function() {
    let deleteButtons = document.querySelectorAll('.delete-button, .choco-checkbox');
    deleteButtons.forEach(button => {
        button.style.display = button.style.display === 'none' ? 'inline' : 'none';
    });
});

document.getElementById("clear").addEventListener("click", function() {
    localStorage.clear();
    updateChocolates();
    calculateTotalCalories();
    updateStatistics();
});

document.addEventListener('DOMContentLoaded', () => {
    updateChocolates();
    calculateTotalCalories();
    updateStatistics();
});
// Calculate total calories of all chocolates
function calculateTotalCalories() {
    let chocolates = JSON.parse(localStorage.getItem('favChocolates')) || [];
    let totalCalories = chocolates.reduce((sum, item) => sum + item.calories, 0);
    document.getElementById('totalCalories').textContent = ` ${totalCalories}`;
}
// Update statistics section
function updateStatistics() {
    let chocolates = JSON.parse(localStorage.getItem('favChocolates')) || [];
    if (chocolates.length === 0) return;

    // Calculate highest calories chocolate
    let highestCaloriesChocolate = chocolates.reduce((max, choco) => choco.calories > max.calories ? choco : max, chocolates[0]);

    // Calculate most liked chocolate type
    let typeCount = chocolates.reduce((acc, choco) => {
        acc[choco.type] = (acc[choco.type] || 0) + 1;
        return acc;
    }, {});

    let mostLikedType = Object.keys(typeCount).reduce((max, type) => typeCount[type] > typeCount[max] ? type : max, Object.keys(typeCount)[0]);

    document.getElementById('statistics').innerHTML = `
        <p>Chocolate with highest calories: ${highestCaloriesChocolate.name} (${highestCaloriesChocolate.calories} calories)</p>
        <p>Your favourite Chocolate: ${mostLikedType} (${typeCount[mostLikedType]} times)</p>
    `;

    // Update chart
    updateChart(typeCount);
}
// Update the chart with chocolate type distribution
function updateChart(typeCount) {
    let ctx = document.getElementById('chocolateChart').getContext('2d');
    let chartData = {
        labels: Object.keys(typeCount),
        datasets: [{
            label: '巧克力类型分布',
            data: Object.values(typeCount),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
// Update chocolates display sorted by rating
function updateChocolatesByRating() {
    let chocolates = JSON.parse(localStorage.getItem('favChocolates')) || [];
    let container = document.getElementById('chocolatesByRating');
    container.innerHTML = ''; // Clear current content to show new sorted data

    // Sort chocolates by rating in descending order and take top 5
    let sortedChocolates = chocolates.sort((a, b) => b.rating - a.rating).slice(0, 5);

    sortedChocolates.forEach(choco => {
        let detail = document.createElement('p');
        detail.textContent = `${choco.name} - ${choco.type} - ${choco.calories} Calories - Ingredients: ${choco.ingredients} - Comments: ${choco.comments} - Rate: ${"⭐️".repeat(choco.rating)}`;
        if (choco.imgData) {
            let img = document.createElement('img');
            img.src = choco.imgData;
            img.alt = choco.name;
            img.style.maxWidth = '100px';
            img.style.marginLeft = '10px';
            detail.appendChild(img);
        }
        container.appendChild(detail);
    });
}


// Clear the search input and refresh the chocolates display
function returnToMainPage() {
    document.getElementById('searchTerm').value = '';
    updateChocolates();
}
// Search chocolates by name and display the results
function searchChocolates() {
    let searchTerm = document.getElementById('searchTerm').value.toLowerCase();
    let chocolates = JSON.parse(localStorage.getItem('favChocolates')) || [];
    let container = document.getElementById('chocolatesByDate');
    container.innerHTML = '';

    chocolates.forEach((item, index) => {
        if (item.name.toLowerCase().includes(searchTerm)) {
            let detail = document.createElement('p');
            detail.textContent = `${item.name} - ${item.type} - ${item.calories} 卡路里 - 成分: ${item.ingredients} - 备注: ${item.comments} - 评分: ${"⭐️".repeat(item.rating)}`;
            if (item.imgData) {
                let img = document.createElement('img');
                img.src = item.imgData;
                img.alt = item.name;
                img.style.maxWidth = '100px';
                img.style.marginLeft = '10px';
                detail.appendChild(img);
            }
            container.appendChild(detail);
        }
    });
}


function previewImage() {
    const input = document.getElementById('img-input');
    const imgDest = document.getElementById('img-dest');
    const file = input.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
        imgDest.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        imgDest.src = "";
    }
}