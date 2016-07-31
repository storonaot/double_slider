document.addEventListener('DOMContentLoaded', function() {
  var controlLeft = document.querySelector('.control-left');
  var controlRight = document.querySelector('.control-right');

  var textWidth = document.querySelector('.text-slider').offsetWidth + 2;
  var photoWidth = document.querySelector('.photos-slider').offsetWidth + 2;

  var textItems = [].slice.call(document.querySelectorAll('.text-slider-item'));
  var photoItems = [].slice.call(document.querySelectorAll('.photos-slider-item'));

  var textSliderContent = document.querySelector('.text-slider-list');
  var photosSliderContent = document.querySelector('.photos-slider-list');

  var textSliderWidth = -(5 * textWidth - textWidth);
  var photosSliderWidth = -(5 * photoWidth - photoWidth);

  var textPosition = textSliderContent.style.marginLeft;
  // начальная позиция текстового слайдера
  textPosition = '0px';

  var photoPosition = photosSliderContent.style.marginLeft;
  // начальная позиция фото слайдера
  photoPosition = '0px';

  //номер активного слайда
  var activeSlide = 0;

  // добавляем каждому слайду такую же ширину как у контейнера
  addSize();

  // при ресайзе окна, пересчитываем базовую ширину каждого слайда
  window.addEventListener('resize', function() {
    textWidth = document.querySelector('.text-slider').offsetWidth;
    photoWidth = document.querySelector('.photos-slider').offsetWidth;
    addSize();
  });
  window.addEventListener('resize', function() {
    var x = activeSlide;
    reCalcWidth(x);
  });

  var disabled = false;

  controlRight.addEventListener('click', function() {
    if (!disabled) {
      disabled = true;
      setTimeout(function() {
        if (activeSlide < 4) {
          activeSlide++;
          slide(activeSlide, 'right');
        }
        disabled = false;
      }, 300);
    }
  });

  controlLeft.addEventListener('click', function() {
    if (!disabled) {
      disabled = true;
      setTimeout(function() {
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
    textItems.forEach(function(element) {
      element.style.width = textWidth + 'px';
    });

    // проходимся по всем элементам и задаем им ширину контейнера
    photoItems.forEach(function(element) {
      element.style.width = photoWidth + 'px';
    });
  }

  function slide(activeSlide, control) {
    var start = Date.now();
    var timer = setInterval(function() {
      var timePassed = Date.now() - start;
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
    var pxPerSecText = 300 / textWidth;
    // на сколько пикселей в секунду сдвигается 2 слайдер
    var pxPerSecPhot = 300 / photoWidth;
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
