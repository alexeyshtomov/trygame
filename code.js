(() => {
  let playing = true,
    activeHole = 1,
    deadCount = 0,
    lostCount = 0,
    timer;

  const stop = () => {
    playing = false;
    clearInterval(timer);
  };

  const startTimer = () => {
    let timeLeft = 45; // Устанавливаем начальное время в секундах

    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("countdown").textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timer);
        showModal();
      }
    }, 1000); // Таймер обновляется каждую секунду
  };

  const showModal = () => {
    document.getElementById("record").textContent = deadCount;
    document.getElementById("myModal").style.display = "block";
    stop(); // Остановить игру при открытом модальном окне
  };

  const closeModal = () => {
    document.getElementById("myModal").style.display = "none";
    resetGame();
  };

  const resetGame = () => {
    playing = true;
    activeHole = 1;
    deadCount = 0;
    lostCount = 0;
    updateStats();
    startTimer(); // Запустить таймер заново
  };

  const getHole = index => document.getElementById(`hole${index}`);
  const deactivateHole = index => getHole(index).className = 'hole';
  const activateHole = index => getHole(index).className = 'hole hole_has-mole';

  const updateStats = () => {
    document.getElementById("dead").textContent = deadCount;
    document.getElementById("lost").textContent = lostCount;
  };

  const handleClick = (event) => {
    if (!playing) {
      return;
    }
    const clickedHole = event.target;
    if (clickedHole.classList.contains('hole_has-mole')) {
      deadCount++;
    } else {
      lostCount++;
    }
    updateStats();
  };

  const next = () => setTimeout(() => {
    if (!playing) {
      return;
    }
    deactivateHole(activeHole);
    activeHole = Math.floor(1 + Math.random() * 9);
    activateHole(activeHole);
    next();
  }, 500);

  // Добавляем обработчик события click для каждой лунки
  document.querySelectorAll(".hole").forEach(hole => hole.addEventListener("click", handleClick));

  // Добавляем обработчик для закрытия модального окна
  document.querySelector(".close").addEventListener("click", closeModal);

  // Запускаем игру и таймер
  startTimer();
  next();
})();

  //проверка
  //еще одна