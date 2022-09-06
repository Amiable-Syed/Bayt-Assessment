const getUserDefinedContent=()=>{
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
    let response = [];
    for (let t = 0; t < sliderData.length; t++) {
      const {img, name, des, desc} = sliderData[t];
      const slideData = `
          <p class="content_desc"> ${desc} </p>
           <img src="${img}" class="content_img"/>
           <div class="content_name">${name}</div>
           <p class="content_des">${des}</p>
           <button class="btn"> View CV Sample </button>
      `;
      response.push(slideData);
    }
    return response;
  }
  
  window.addEventListener('load', ()=> {
    const userDefinedContent = getUserDefinedContent();
    contentComponent(userDefinedContent);
  })