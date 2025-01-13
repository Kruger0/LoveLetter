document.addEventListener('DOMContentLoaded', function() {
    const startDate = new Date('2024-05-05'); // Data de início
    const contador = document.getElementById('contador'); // Pegando o elemento contador

    function updateCounter() {
        const today = new Date();
        let years = today.getFullYear() - startDate.getFullYear();
        let months = today.getMonth() - startDate.getMonth();
        let days = today.getDate() - startDate.getDate();

        // Corrige a contagem de meses e anos
        if (months < 0) {
            years--;
            months += 12;
        }
        if (days < 0) {
            const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += previousMonth.getDate();
            months--;
        }

        // Calcula as horas, minutos e segundos
        const diff = today - startDate;
        const sec = Math.floor(diff / 1000); // Total de segundos
        const min = Math.floor(sec / 60);   // Total de minutos
        const remainHou = Math.floor((sec / 3600) % 24); // Horas restantes
        const remainMin = min % 60;         // Minutos restantes após horas
        const remainSec = sec % 60;         // Segundos restantes após minutos

        // Verifica se já passou algum tempo desde a data de início
        if (years <= 0 && months <= 0 && days <= 0) {
            contador.innerText = "Ainda não começou!";
            return;
        }
        // Monta o texto do contador
        let counterText = ""; // Removendo "Juntos há"
        if (years > 0) {
            counterText += `${years} ${years === 1 ? 'ano' : 'anos'}, `;
        }
        counterText += `${months} ${months === 1 ? 'mês' : 'meses'}, `;
        counterText += `${days} ${days === 1 ? 'dia' : 'dias'}, `;
        counterText += `${remainHou} ${remainHou === 1 ? 'hora' : 'horas'}, `;
        counterText += `${remainMin} ${remainMin === 1 ? 'minuto' : 'minutos'} e `;
        counterText += `${remainSec} ${remainSec === 1 ? 'segundo' : 'segundos'}!`;

        // Atualiza o texto do contador
        contador.innerText = counterText;

    }

    setInterval(updateCounter, 1000); // Atualiza o contador a cada segundo
    updateCounter(); // Atualiza imediatamente ao carregar

    // Ajusta o volume do áudio (de 0.0 a 1.0)
    const audioElement = document.getElementById('musica');
    audioElement.volume = 0.5;  // Volume inicial (50% do volume máximo)
    
    // Remove o mudo após o carregamento
    audioElement.muted = false;
});
