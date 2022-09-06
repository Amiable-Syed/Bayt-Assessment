// Some global varaibles being used in multiple functions
let slideIndex = 0;
let slides = document.getElementsByClassName("slide");
let dots = document.getElementsByClassName("dot");
  
  /*
  * Initialise and render the initial slides and configure to autoplay every 3 seconds
  */

  const showSlides=()=> {    
    if (slideIndex >= slides.length) {slideIndex = 0}    
    if (slideIndex < 0) {slideIndex = slides.length - 1}
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
        dots[i].className = dots[i].className.replace(" current_active", "");
    }

    slides[slideIndex].style.display = "block";  
    dots[slideIndex].className += " current_active";
    slideIndex++;
    setTimeout(showSlides, 3000); // Change slide every 3 seconds
}

  /*
  * Event Listener for slide change when clicked on arrows
  */ 
  const changeSlide =(slideToIndex)=>{
       slideIndex = slideIndex + slideToIndex;
       if (slideIndex >= slides.length) {slideIndex = 0}    
       if (slideIndex < 0) {slideIndex = slides.length - 1}
       currentSlide();
  }

  /*
  * Get the current slide set and make the dot active
  */ 
  const currentSlide=()=>{ 
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
        dots[i].className = dots[i].className.replace(" current_active", "");
    }
    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " current_active";
  }

  /*
   * Dots renderer to highlight the current active slide as well as quick access 
   */
  const dotsRenderer=(slider,options)=>{
    for(let t=0;t<options.noOfDots;t++){
      const dotElement = document.createElement('div');
      dotElement.classList.add("dot");
      dotElement.onclick= ()=> {slideIndex = t;currentSlide();};
      slider?.appendChild(dotElement);
  }
  }

  /*
  * Content Component to be rendered in the slider
  */
  const contentComponent=(userContentList)=>{
    const slider = document.querySelector(".slide_content");
    userContentList.forEach(content => {
      let element = document.createElement('div');
      element.classList.add('slide');
      element.classList.add('fade_effect');
      element.innerHTML = content;
      slider?.appendChild(element);  
    });
    dotsRenderer(slider,{noOfDots: userContentList.length});
    showSlides();
  }