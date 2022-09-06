/*
* Slides Data 
* img: Image path
* name: name of the person
* des: Designation of the person
* desc: Description about the person
*/ 

const sliderData = [
    {
      img: "./assets/1.jpg",
      name: "Elon Musk",
      des: "CEO of Tesla Motors",
      desc: "\"Elon Reeve Musk FRS is a naturalized American business magnate and investor. He is the founder, CEO, and Chief Engineer at SpaceX.\""
    },
    {
      img: "./assets/2.jpg",
      name: "Jeff Bezos",
      des: "Executive Chairman of Amazon",
      desc: "\"Jeffrey Preston Bezos is an American entrepreneur, media proprietor, investor, computer engineer, and commercial astronaut. He is the founder, executive chairman and former president and CEO of Amazon.\""
    },
    {
      img: "./assets/3.jpg",
      name: "Mark Zuckerberg",
      des: "Chief Executive Officer of Facebook",
      desc: "\"Mark Elliot Zuckerberg is an American media magnate, internet entrepreneur, and philanthropist. He is known for co-founding the social media website Facebook.\""
    }
  ];

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
  const dotsRenderer=(slider)=>{
    for(let t=0;t<sliderData.length;t++){
      const dotElement = document.createElement('div');
      dotElement.classList.add("dot");
      dotElement.onclick= ()=> {slideIndex = t;currentSlide();};
      slider?.appendChild(dotElement);
  }
  }
  /*
  * Content Component to be rendered in the slider
  */
  const contentComponent=()=>{
    const slider = document.querySelector(".slide_content");
    for (let t = 0; t < sliderData.length; t++) {
        const {img, name, des, desc} = sliderData[t];
        const slideData = `
          <div class="slide fade_effect">
            <p class="content_desc"> ${desc} </p>
             <img src="${img}" class="content_img"/>
             <div class="content_name">${name}</div>
             <p class="content_des">${des}</p>
             <button class="btn"> View CV Sample </button>
            </div>
        `;
        slider.innerHTML += slideData;
      }
      dotsRenderer(slider);
  }

window.addEventListener('load', ()=> {
    contentComponent();
    showSlides();

})