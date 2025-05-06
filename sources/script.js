document.addEventListener('DOMContentLoaded', function() {

    // Date Counter ===========================================================

    const startDate = new Date('2024-05-05T00:00:00');
    const counter = document.getElementById('date-counter');
    
    function getDateDiff() {
        const currentDate = new Date();
        
        // Get date difference in milliseconds
        const diff = currentDate - startDate;
 
        // Calculate seconds, minutes, hours
        const sec = Math.floor((diff / 1000) % 60);
        const min = Math.floor((diff / (1000 * 60)) % 60);
        const hou = Math.floor((diff / (1000 * 60 * 60)) % 24);
    
        let tempDate = new Date(startDate);

        // Count years
        let years = 0;
        while (true) {
            const nextYear = new Date(tempDate);
            nextYear.setFullYear(nextYear.getFullYear() + 1);
            
            if (nextYear <= currentDate) {
                years++;
                tempDate = nextYear;
            } else {
                break;
            }
        }
        
        // Count months
        let months = 0;
        while (true) {
            const nextMonth = new Date(tempDate);
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            
            if (nextMonth <= currentDate) {
                months++;
                tempDate = nextMonth;
            } else {
                break;
            }
        }
        
        // Calculate remaining days
        const days = Math.floor((currentDate - tempDate) / (1000 * 60 * 60 * 24));
    
        // Monta o texto do contador
        let dateDiff = "";

        if (years > 0)  {dateDiff += `${years} ${years > 1 ?   'anos'     : 'ano'}, `;}
        if (months > 0) {dateDiff += `${months} ${months > 1 ? 'meses'    : 'mês'}, `;}
        if (days > 0)   {dateDiff += `${days} ${days > 1 ?     'dias'     : 'dia'}, `;}
        if (hou > 0)    {dateDiff += `${hou} ${hou > 1 ?       'horas'    : 'hora'}, `;}
        if (min > 0)    {dateDiff += `${min} ${min > 1 ?       'minutos'  : 'minuto'} `;}
        if (sec > 0)    {dateDiff += `e ${sec} ${sec > 1 ?     'segundos' : 'segundo'}`;}
    
        // Atualiza o texto no contador
        counter.innerText = dateDiff;
    }
    
    // Automatic call
    setInterval(getDateDiff, 1000);

    // Page reload call
    getDateDiff()

    // Slider ===========================================================

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
