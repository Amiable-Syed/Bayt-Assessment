class SlideComponent {
  // Some class attributes required in Slider
  constructor(sliderContainer,userContentList) {
    this.sliderContainer = sliderContainer;
    this.arrowCreateRenderer();
    this.slideIndex = 0;
    this.slides = this.sliderContainer.getElementsByClassName("slide");
    this.dots = this.sliderContainer.getElementsByClassName("dot");
    this.init(userContentList);
  }

  init(userContentList){
    const sliderContent = this.sliderContainer.querySelector('.slide_content');
    const sliderWrapper= document.createElement('div');
    userContentList.forEach(content => {
      let element = document.createElement('div');
      element.classList.add('slide');
      element.classList.add('fade_effect');
      element.innerHTML = content;
      sliderWrapper?.appendChild(element);  
    });
    sliderContent.appendChild(sliderWrapper);
    this.dotsRenderer(sliderContent,{noOfDots: userContentList.length});
    this.showSlides();
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
    /*
  * Initialise and render the initial slides and configure to autoplay every 3 seconds
  */
  showSlides=()=> {    
    if (this.slideIndex >= this.slides.length) {this.slideIndex = 0}    
    if (this.slideIndex < 0) {this.slideIndex = this.slides.length - 1}
    this.currentSlide();
    this.slideIndex++;
    setTimeout(this.showSlides, 3000); // Change slide every 3 seconds
  }

    /*
  * Event Listener for slide change when clicked on arrows
  */ 
  changeSlide =(slideToIndex)=>{
      this.slideIndex = this.slideIndex + slideToIndex;
      if (this.slideIndex >= this.slides.length) {this.slideIndex = 0}    
      if (this.slideIndex < 0) {this.slideIndex = this.slides.length - 1}
      this.currentSlide();
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
    sliders?.forEach((sliderContainer)=>{
      new SlideComponent(sliderContainer,userContentList); 
    })
  }