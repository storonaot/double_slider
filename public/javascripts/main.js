document.addEventListener('DOMContentLoaded', () => {
  let controlLeft = document.querySelector('.control-left');
  let controlRight = document.querySelector('.control-right');

  let textWidth = document.querySelector('.text-slider').offsetWidth + 2;
  let photoWidth = document.querySelector('.photos-slider').offsetWidth + 2;

  let textItems = [].slice.call(document.querySelectorAll('.text-slider-item'));
  let photoItems = [].slice.call(document.querySelectorAll('.photos-slider-item'));

  let textSliderContent = document.querySelector('.text-slider-list');
  let photosSliderContent = document.querySelector('.photos-slider-list');

  let textSliderWidth = -(5 * textWidth - textWidth);
  let photosSliderWidth = -(5 * photoWidth - photoWidth);

  let textPosition = textSliderContent.style.marginLeft;
  // начальная позиция текстового слайдера
  textPosition = '0px';

  let photoPosition = photosSliderContent.style.marginLeft;
  // начальная позиция фото слайдера
  photoPosition = '0px';

  //номер активного слайда
  let activeSlide = 0;

  // добавляем каждому слайду такую же ширину как у контейнера
  addSize();

  // при ресайзе окна, пересчитываем базовую ширину каждого слайда
  window.addEventListener('resize', () => {
    textWidth = document.querySelector('.text-slider').offsetWidth;
    photoWidth = document.querySelector('.photos-slider').offsetWidth;
    addSize();
  });
  window.addEventListener('resize', () => {
    let x = activeSlide;
    reCalcWidth(x);
  });

  let disabled = false;

  controlRight.addEventListener('click', () => {
    if (!disabled) {
      disabled = true;
      setTimeout(() => {
        if (activeSlide < 4) {
          activeSlide++;
          slide(activeSlide, 'right');
        }
        disabled = false;
      }, 300);
    }
  });

  controlLeft.addEventListener('click', () => {
    if (!disabled) {
      disabled = true;
      setTimeout(() => {
        if (activeSlide > 0) {
          activeSlide--;
          slide(activeSlide, 'left');
        }
        disabled = false;
      }, 300);
    }
  });

  function addSize() {
    // проходимся по всем элементам и задаем им ширину контейнера
    textItems.forEach(element => {
      element.style.width = textWidth + 'px';
    });

    // проходимся по всем элементам и задаем им ширину контейнера
    photoItems.forEach(element => {
      element.style.width = photoWidth + 'px';
    });
  }

  function slide(activeSlide, control) {
    let start = Date.now();
    let timer = setInterval(() => {
      let timePassed = Date.now() - start;
      if (timePassed >= 300) {
        // после завершения анимации, убираем погрешность в размере путем пересчета позиции слайдера
        // умножая ширину контейнера на номер активного слайда
        reCalcWidth(activeSlide);
        clearInterval(timer);
        return;
      }
      //с каждей итерацией функции перерисовываем позицию на которой должен находиться слайдер
      draw(timePassed, textPosition, photoPosition, control);
    }, 1);
  }

  function draw(timePassed, textPosition, photoPosition, control) {
    // на сколько пикселей в секунду сдвигается 1 слайдер
    let pxPerSecText = 300 / textWidth;
    // на сколько пикселей в секунду сдвигается 2 слайдер
    let pxPerSecPhot = 300 / photoWidth;
    if (control === 'left') {
      textPosition = parseInt(textPosition) + timePassed / pxPerSecText + 'px';
      photoPosition = parseInt(photoPosition) + timePassed / pxPerSecPhot + 'px';
    } else {
      textPosition = parseInt(textPosition) - timePassed / pxPerSecText + 'px';
      photoPosition = parseInt(photoPosition) - timePassed / pxPerSecPhot + 'px';
    }
    textSliderContent.style.marginLeft = textPosition;
    photosSliderContent.style.marginLeft = photoPosition;
  }

  function reCalcWidth(activeSlide) {
    //первый слайдер
    textPosition = -(activeSlide * textWidth) + 'px';
    textSliderContent.style.marginLeft = textPosition;

    //ворой слайдер
    photoPosition = -(activeSlide * photoWidth) + 'px';
    photosSliderContent.style.marginLeft = photoPosition;
  }
});
//# sourceMappingURL=main.js.map
