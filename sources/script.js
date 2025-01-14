document.addEventListener('DOMContentLoaded', function() {

    // Contador ----------------------------------------

    const startDate = new Date('2024-05-05'); // Data de início
    const counter = document.getElementById('contador'); // Pegando o elemento contador
    
    // Função para verificar se um ano é bissexto
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }
    
    function updateCounter() {
        const today = new Date();
        
        // Calcula a diferença total entre a data de início e o dia de hoje em milissegundos
        const diff = today - startDate;
        const totalSeconds = Math.floor(diff / 1000);  // Convertendo para segundos
    
        // Cálculos considerando anos bissextos
        const totalDays = Math.floor(totalSeconds / (60 * 60 * 24)); // Total de dias
    
        let years = 0;
        let months = 0;
        let days = totalDays;
    
        // Calcula os anos bissextos e comuns
        let tempStartDate = new Date(startDate); // Cria uma cópia da data de início para não alterá-la diretamente
        while (true) {
            const yearDays = isLeapYear(tempStartDate.getFullYear()) ? 366 : 365;
            if (days >= yearDays) {
                years++;
                days -= yearDays;
                tempStartDate.setFullYear(tempStartDate.getFullYear() + 1);
            } else {
                break;
            }
        }
    
        // Calcula os meses, considerando o mês atual com base na data de início
        const monthsInYear = [31, (isLeapYear(today.getFullYear()) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Considerando os meses com 28 ou 29 dias
        while (days >= monthsInYear[tempStartDate.getMonth()]) {
            days -= monthsInYear[tempStartDate.getMonth()];
            months++;
            tempStartDate.setMonth(tempStartDate.getMonth() + 1);
            if (tempStartDate.getMonth() === 12) {
                tempStartDate.setMonth(0);
            }
        }
    
        // Calcula as horas, minutos e segundos restantes
        const hours = Math.floor(totalSeconds / (60 * 60) % 24);
        const minutes = Math.floor(totalSeconds / 60 % 60);
        const seconds = totalSeconds % 60;
    
        // Verifica se a data de início é no futuro
        if (today < startDate) {
            counter.innerText = "Ainda não começou!";
            return;
        }
    
        // Monta o texto do contador
        let counterText = "";
        if (years > 0) {
            counterText += `${years} ${years === 1 ? 'ano' : 'anos'}, `;
        }
        if (months > 0) {
            counterText += `${months} ${months === 1 ? 'mês' : 'meses'}, `;
        }
        if (days > 0) {
            counterText += `${days} ${days === 1 ? 'dia' : 'dias'}, `;
        }
        counterText += `${hours} ${hours === 1 ? 'hora' : 'horas'}, `;
        counterText += `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} e `;
        counterText += `${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}.`;
    
        // Atualiza o texto no contador
        counter.innerText = counterText;
    }
    
    // Atualiza o contador a cada segundo
    setInterval(updateCounter, 1000);
    updateCounter(); // Chama imediatamente ao carregar a página

    // Audio ----------------------------------------

    // Ajusta o volume do áudio (de 0.0 a 1.0)
    const audioElement = document.getElementById('musica');
    audioElement.volume = 0.75;  // Volume inicial (50% do volume máximo)
    
    // Remove o mudo após o carregamento
    audioElement.muted = false;

    // Slider ----------------------------------------

    let list    = document.querySelector('.slider .list')
    let items   = document.querySelectorAll('.slider .list .item')
    let dots    = document.querySelectorAll('.slider .dots li')
    let prev    = document.getElementById('prev')
    let next    = document.getElementById('next')

    let active = 0
    let lengthItems = items.length - 1;

    next.onclick = function() {
        if (active + 1 > lengthItems) {
            active = 0
        } else {
            active = active + 1;
        }
        reloadSlider();
    }

    prev.onclick = function() {
        if (active - 1 < 0) {
            active = lengthItems;
        } else {
            active = active - 1;
        }
        reloadSlider();
    }

    let refreshSlider = setInterval(()=> {next.click()}, 5000);
    function reloadSlider() {
        let checkLeft = items[active].offsetLeft;
        list.style.left = -checkLeft + 'px';

        let lascActiveDot = document.querySelector('.slider .dots li.active');
        lascActiveDot.classList.remove('active');
        dots[active].classList.add('active');
        clearInterval(refreshSlider);
        refreshSlider = setInterval(()=> {next.click()}, 5000);
    }

    dots.forEach((list, key) => {
        list.addEventListener('click', function() {
            active = key;
            reloadSlider();
        })
    })
});
