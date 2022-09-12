class SlideComponent {

  // Some class attributes required in Slider
  constructor(sliderContainer,userContentList,idx) {
    this.sliderContainer = sliderContainer;
    this.arrowCreateRenderer();
    this.slideIndex = -1;
    this.CarousalIndex = idx;
    this.resetInterval = null;
    this.slides = this.sliderContainer.getElementsByClassName("slide");
    this.dots = this.sliderContainer.getElementsByClassName("dot");
    this.init(userContentList);
    this.sliderAnimation = document.getElementsByClassName('animate_slider');
  }

  startInterval=()=>{
    this.interval = setInterval(this.showSlides,3000);
  }


  init(userContentList){
    const sliderContent = this.sliderContainer.querySelector('.slide_content');
    const sliderWrapper= document.createElement('div');
    sliderWrapper.classList.add('animate_slider');
    userContentList.forEach(content => {
      let element = document.createElement('div');
      element.classList.add('slide');
      element.innerHTML = content;
      sliderWrapper?.appendChild(element);  
    });
    sliderContent.appendChild(sliderWrapper);
    this.dotsRenderer(sliderContent,{noOfDots: userContentList.length});
    this.startAutoSlides()
    this.startInterval();
  }

  arrowCreateRenderer =()=>{
    const  leftArrowImg = document.createElement('img');
    leftArrowImg.setAttribute(
      'src',
      './assets/arrow.svg',
    );
    leftArrowImg.classList.add("slider_arrow");
    leftArrowImg.classList.add("left_arrow");
    leftArrowImg.addEventListener('click',()=>this.changeSlide(-1));

    const sliderInnerContent =  document.createElement('div');
    sliderInnerContent.classList.add("slide_content");

    const rightArrowImg =  document.createElement('img');
    rightArrowImg.classList.add("slider_arrow");
    rightArrowImg.addEventListener('click',()=>this.changeSlide(1));
    rightArrowImg.setAttribute(
      'src',
      './assets/arrow.svg',
    );
   
    this.sliderContainer.appendChild(leftArrowImg);
    
    this.sliderContainer.appendChild(sliderInnerContent);
  
    this.sliderContainer.appendChild(rightArrowImg);
  }

  startAutoSlides=()=>{
    this.slideIndex++;
    this.outOfBoundIndexes();
    this.currentSlide();
  }
    /*
  * Initialise and render the initial slides and configure to autoplay every 3 seconds
  */
  showSlides=()=> { 
    this.sliderAnimation[this.CarousalIndex].classList.add('fade_effect_right');
    this.removeClasses(()=>{
      this.startAutoSlides();
    });
}

  removeClasses=(cb)=>{
    setTimeout(()=> {
      this.sliderAnimation[this.CarousalIndex].classList.remove('fade_effect_left');
      this.sliderAnimation[this.CarousalIndex].classList.remove('fade_effect_right')
      cb?.();
    }, 1500)
  }

  outOfBoundIndexes=()=>{
    if (this.slideIndex >= this.slides.length) {this.slideIndex = 0}    
    if (this.slideIndex < 0) {this.slideIndex = this.slides.length - 1}
  }
    /*
  * Event Listener for slide change when clicked on arrows
  */ 
  changeSlide =(slideToIndex)=>{
    this.resetInterval && clearInterval(this.resetInterval);
    this.interval && clearInterval(this.interval);

    if(slideToIndex < 0){
      this.sliderAnimation[this.CarousalIndex].classList.add('fade_effect_left');
      } else{
      this.sliderAnimation[this.CarousalIndex].classList.add('fade_effect_right');
    }
    this.interval = null;
    this.removeClasses(()=>{
      this.slideIndex = this.slideIndex + slideToIndex;
      this.outOfBoundIndexes();
      this.currentSlide();
        this.resetInterval = setTimeout(()=>{
        this.startInterval()},2000)
    });
 }

   /*
  * Get the current slide set and make the dot active
  */ 
  currentSlide=()=>{ 
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].style.display = "none"; 
      this.dots[i].classList.remove("current_active");
    }
    this.slides[this.slideIndex].style.display = "block";
    this.dots[this.slideIndex].classList.add("current_active");
  }


    /*
   * Dots renderer to highlight the current active slide as well as quick access 
   */
  dotsRenderer=(sliderContent,options)=>{
    for(let t=0;t<options.noOfDots;t++){
      const dotElement = document.createElement('div');
      dotElement.classList.add("dot");
      dotElement.onclick= ()=> {this.slideIndex = t;this.currentSlide();};
      sliderContent?.appendChild(dotElement);
  }
  }
}

  /*
  * Content Component to be rendered in the this.sliderContainer
  */
  const contentComponent=(userContentList)=>{
    const sliders = document.querySelectorAll(".slider");
    sliders?.forEach((sliderContainer,idx)=>{
      new SlideComponent(sliderContainer,userContentList,idx); 
    })
  }