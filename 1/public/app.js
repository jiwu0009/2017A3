function addChocolate() {
    const name = document.getElementById('name').value;
    const type = document.getElementById('type').value;
    const calories = parseInt(document.getElementById('calories').value, 10);
    const ingredients = document.getElementById('ingredients').value.split(', ');
    const comments = document.getElementById('comments').value;
    const date = new Date().toLocaleString(); // 自动设置当前日期和时间

    let chocolates = JSON.parse(localStorage.getItem('favChocolates')) || [];
    chocolates.push({ name, type, calories, ingredients, comments, dateAdded: date });
    localStorage.setItem('favChocolates', JSON.stringify(chocolates));
    updateChocolates();
    calculateTotalCalories();
}

function updateChocolates() {
    let list = document.getElementById('chocolateList');
    list.innerHTML = '';
    let chocolates = JSON.parse(localStorage.getItem('favChocolates')) || [];

    let chocolatesByDate = chocolates.reduce((group, choco) => {
        const date = choco.dateAdded.split(' ')[0]; // 保证使用正确的字段
        if (!group[date]) group[date] = [];
        group[date].push(choco);
        return group;
    }, {});

    Object.keys(chocolatesByDate).forEach(date => {
        let dateSection = document.createElement('div');
        let dateButton = document.createElement('button');
        dateButton.textContent = `日期：${date} (${chocolatesByDate[date].length} 项)`;
        dateButton.onclick = function() {
            let panel = this.nextElementSibling;
            panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
        };

        let panel = document.createElement('div');
        panel.style.display = 'none';

        chocolatesByDate[date].forEach(choco => {
            let listItem = document.createElement('li');
            listItem.textContent = `${choco.name} - ${choco.type} - ${choco.calories} calories - Ingredients: ${choco.ingredients.join(', ')} - Comments: ${choco.comments}`;
            panel.appendChild(listItem);
        });

        dateSection.appendChild(dateButton);
        dateSection.appendChild(panel);
        list.appendChild(dateSection);
    });

    calculateTotalCalories(); // 在此处更新总卡路里
}

function calculateTotalCalories() {
    let chocolates = JSON.parse(localStorage.getItem('favChocolates')) || [];
    let totalCalories = chocolates.reduce((acc, choco) => acc + choco.calories, 0);
    document.getElementById('totalCalories').textContent = totalCalories;
}

// 页面加载完毕时初始化数据
document.addEventListener('DOMContentLoaded', function() {
    updateChocolates();
    calculateTotalCalories();
});
