const methods = {
  parallax: (element, multiplier=4, scrollStop=undefined) => {
    const scrollY = window.scrollY;
    
    if (scrollY < scrollStop || !scrollStop) {
      element.style.transform = 'translateY(' + (scrollY / multiplier) * 2 + 'px)';
    }
  },
  slope: () => {
    const seed = Math.random() * 3;
    const pre = Math.random() > .5 ? '-' : '';
    return 'transform: rotate(' + pre + seed + 'deg)';
  },
  observeSentinel: function (callback) {
    const sentinel = document.querySelector('#sentinel');
    const observer = new IntersectionObserver(callback);
    observer.observe(sentinel);
  }
}

export default methods