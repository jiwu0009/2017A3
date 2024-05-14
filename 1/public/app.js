function addChocolate() {
    const name = document.getElementById('name').value;
    const type = document.getElementById('type').value;
    const calories = parseInt(document.getElementById('calories').value, 10);
    const ingredients = document.getElementById('ingredients').value;
    const comments = document.getElementById('comments').value;
    const rating = parseInt(document.getElementById('rating').value, 10);  // 获取评分

    const dateAdded = new Date().toISOString().split('T')[0];

    let chocolates = JSON.parse(localStorage.getItem('favChocolates')) || [];
    chocolates.push({ name, type, calories, ingredients, comments, rating, dateAdded });  // 添加评分到对象中
    localStorage.setItem('favChocolates', JSON.stringify(chocolates));
    updateChocolates();
    calculateTotalCalories();
    updateStatistics();
    document.getElementById('chocolateForm').reset();
}

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
        toggleButton.textContent = `日期：${date} (总卡路里: ${groupedByDate[date].reduce((sum, item) => sum + item.calories, 0)})`;

        let detailsDiv = document.createElement('div');
        detailsDiv.style.display = 'none';

        groupedByDate[date].forEach((item, index) => {
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'choco-checkbox';
            checkbox.value = JSON.stringify({ date, index });

            let detail = document.createElement('p');
            detail.textContent = `${item.name} - ${item.type} - ${item.calories} 卡路里 - 成分: ${item.ingredients} - 备注: ${item.comments} - 评分: ${"⭐️".repeat(item.rating)}`;
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

function calculateTotalCalories() {
    let chocolates = JSON.parse(localStorage.getItem('favChocolates')) || [];
    let totalCalories = chocolates.reduce((sum, item) => sum + item.calories, 0);
    document.getElementById('totalCalories').textContent = `总卡路里: ${totalCalories}`;
}

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
        <p>最高卡路里的巧克力: ${highestCaloriesChocolate.name} (${highestCaloriesChocolate.calories} 卡路里)</p>
        <p>用户最喜爱的巧克力类型: ${mostLikedType} (${typeCount[mostLikedType]} 次)</p>
    `;

    // Update chart
    updateChart(typeCount);
}

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

function updateChocolatesByRating() {
    let chocolates = JSON.parse(localStorage.getItem('favChocolates')) || [];
    let container = document.getElementById('chocolatesByRating');
    container.innerHTML = ''; // 清空现有内容，以便新的排序可以显示

    // 对巧克力数组进行排序，按照评分从高到低排序，并截取前五个
    chocolates.sort((a, b) => b.rating - a.rating).slice(0, 5).forEach(choco => {
        let detail = document.createElement('p');
        detail.textContent = `${choco.name} - ${choco.type} - ${choco.calories} 卡路里 - 成分: ${choco.ingredients} - 备注: ${choco.comments} - 评分: ${"⭐️".repeat(choco.rating)}`;
        container.appendChild(detail);
    });
}

function searchChocolates() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const chocolates = JSON.parse(localStorage.getItem('favChocolates')) || [];
    let container = document.getElementById('chocolatesByDate');
    container.innerHTML = '';  // 清空当前显示的所有巧克力记录

    chocolates.filter(choco => 
        choco.name.toLowerCase().includes(searchText) || choco.ingredients.toLowerCase().includes(searchText)
    ).forEach(choco => {
        let detail = document.createElement('p');
        detail.textContent = `${choco.name} - ${choco.type} - ${choco.calories} 卡路里 - 成分: ${choco.ingredients} - 备注: ${choco.comments} - 评分: ${"⭐️".repeat(choco.rating)}`;
        container.appendChild(detail);
    });
}


function searchChocolates() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const chocolates = JSON.parse(localStorage.getItem('favChocolates')) || [];
    let container = document.getElementById('chocolatesByDate');
    container.innerHTML = '';  // 清空当前显示的所有巧克力记录

    chocolates.filter(choco => 
        choco.name.toLowerCase().includes(searchText) || choco.ingredients.toLowerCase().includes(searchText)
    ).forEach(choco => {
        let detail = document.createElement('p');
        detail.textContent = `${choco.name} - ${choco.type} - ${choco.calories} 卡路里 - 成分: ${choco.ingredients} - 备注: ${choco.comments} - 评分: ${"⭐️".repeat(choco.rating)}`;
        container.appendChild(detail);
    });
}
function returnToMainPage() {
    location.reload();
}
