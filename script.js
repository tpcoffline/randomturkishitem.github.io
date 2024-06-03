document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.start-button');
    const gameContainer = document.getElementById('game-container');
    const item1 = document.getElementById('item1');
    const item2 = document.getElementById('item2');
    const timerDisplay = document.getElementById('timer');

    const items = [
        { name: 'Türk Kahvesi', count: 0 },
        { name: 'Lokum', count: 0 },
        { name: 'Baklava', count: 0 },
        { name: 'Rakı', count: 0 },
        { name: 'Simit', count: 0 },
        { name: 'Kılıç', count: 0 },
        { name: 'Kedi', count: 0 },
        { name: 'A101', count: 0 },
        { name: 'Bim', count: 0 },
        { name: 'Ruhi Çenet', count: 0 },
        { name: 'Seni Gidi Fındık Kıran', count: 0 },
        { name: 'Fenerbahçe', count: 0 },
        { name: 'Galatasaray', count: 0 },
        { name: 'Beşiktaş', count: 0 }
    ];

    let timer;
    let countdown;
    const countdownTime = 10; // 10 saniye

    startButton.addEventListener('click', startGame);

    function startGame() {
        startButton.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        resetTimer();
        resetItemCount(); // Yeni eklenen fonksiyon
        updateItems();
    }

    function resetTimer() {
        clearInterval(timer);
        countdown = countdownTime;
        timerDisplay.textContent = `Süre: ${countdown} saniye`;
        timer = setInterval(() => {
            countdown--;
            timerDisplay.textContent = `Süre: ${countdown} saniye`;
            if (countdown === 0) {
                endGame();
            }
        }, 1000);
    }

    function resetItemCount() {
        items.forEach(item => {
            item.count = 0;
        });
    }

    function updateItems() {
        const [randomItem1, randomItem2] = getRandomItems();
        setItem(item1, randomItem1);
        setItem(item2, randomItem2);
        item1.addEventListener('click', () => selectItem(randomItem1));
        item2.addEventListener('click', () => selectItem(randomItem2));
    }

    function getRandomItems() {
        let item1Index = Math.floor(Math.random() * items.length);
        let item2Index;
        do {
            item2Index = Math.floor(Math.random() * items.length);
        } while (item1Index === item2Index);
        return [items[item1Index], items[item2Index]];
    }

    function setItem(element, item) {
        element.querySelector('.item-name').textContent = item.name;
        element.querySelector('.item-count').textContent = `Seçim: ${item.count}`;
    }

    function selectItem(item) {
        item.count++;
        resetTimer();
        updateItems();
    }

    function endGame() {
        clearInterval(timer);
        alert('Oyun bitti! Yeniden başlamak için Başlat tuşuna tıklayın.');
        gameContainer.classList.add('hidden');
        startButton.classList.remove('hidden');
    }
});
