export default (setIsLoaded, isLoaded) => {
  const html = document.documentElement;
  const canvas = document.getElementById('hero-lightpass');
  const context = canvas.getContext('2d');

  const whiteBgElement = document.getElementById('home-background');
  const homeLeadElement = document.querySelector('.home-lead-screen-container');

  const frameCount = 100;

  const currentFrame = (index) => {
    let formattedIndex;

    if (index < 10) {
      formattedIndex = `00${index}`;
    } else if (index < 100) {
      formattedIndex = `0${index}`;
    } else if (index < 1000) {
      formattedIndex = `${index}`;
    }

    return `/amimation_figures/MAIN_FIG_ANIM_EXPLODE_00${formattedIndex}-min.jpg`;
  };

  const imagesSrcList = new Array(frameCount).fill(null).map((_, i) => currentFrame(i));

  const preloadedImages = [];

  function preloadImages(imgSrcArr) {
    for (let i = 0; i <= frameCount; i += 1) {
      const img = new Image(window.innerWidth, 'auto');
      img.onload = () => {
        const index = preloadedImages.indexOf(this);

        if (index !== -1) {
          preloadedImages.splice(index, 1);
        }

        if (i > 98) {
          setIsLoaded(true);
        }
      };
      img.src = imgSrcArr[i];
      preloadedImages.push(img);
    }
  }

  const img = new Image();
  img.src = currentFrame(1);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  img.onload = () => {
    context.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
  };

  const updateImage = (index) => {
    // img.src = currentFrame(index);
    if (index < frameCount && index >= 0) {
      context.drawImage(preloadedImages[index], 0, 0, window.innerWidth, window.innerHeight);
    }

    if (index < 60) {
      whiteBgElement.style.width = `${(frameCount + 2) / 2 - index}vw`;
      homeLeadElement.style.width = `${(frameCount + 2) / 2 - index}vw`;
    } else {
      whiteBgElement.style.width = 0;
      homeLeadElement.style.width = 0;
    }

    if (index >= frameCount) {
      canvas.style.position = 'absolute';
      canvas.style.top = `${window.innerHeight}px`;
    } else if (index < frameCount) {
      canvas.style.position = 'fixed';
      canvas.style.top = 0;
    }
  };

  if (isLoaded) {
    window.addEventListener('scroll', () => {
      const { scrollTop } = html;
      const maxScrollTop = window.innerHeight * 2 - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(frameCount, Math.ceil(scrollFraction * frameCount));
      requestAnimationFrame(() => updateImage(frameIndex + 1));
    });
  }

  preloadImages(imagesSrcList);
};
