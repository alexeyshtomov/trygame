(() => {
    let playing = true,
      activeHole = 1,
      deadCount = 0,
      lostCount = 0;
  
    const stop = () => playing = false,
      getHole = index => document.getElementById(`hole${index}`),
      deactivateHole = index =>
        getHole(index).className = 'hole',
      activateHole = index =>
        getHole(index).className = 'hole hole_has-mole',
      updateStats = () => {
        document.getElementById("dead").textContent = deadCount;
        document.getElementById("lost").textContent = lostCount;
      },
      handleClick = (event) => {
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
      },
      next = () => setTimeout(() => {
        if (!playing) {
          return;
        }
        deactivateHole(activeHole);
        activeHole = Math.floor(1 + Math.random() * 9);
        activateHole(activeHole);
        next();
      }, 800);
  
    
      document.querySelectorAll(".hole").forEach(hole => hole.addEventListener("click", handleClick));
  
    next();
  })();
  