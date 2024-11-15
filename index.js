import * as Carousel from "./carousel.js";
// import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");
const BASE_URL = 'https://api.thecatapi.com/v1/'


// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_4gKia4a6SuvTXm0jl2FkS8lp4AIcjVnfW1eBBie3CAiyRunN1XzzmZCkeUOravWl";

//Part 1

let initialLoad = async function (){
    await axios.get(`${BASE_URL}breeds`).then(res => {
            console.log(res);
            const breeds = res.data;
            for(let i=0; i<breeds.length; i++){
                breedSelect.innerHTML += `<option id=${breeds[i].id}>${breeds[i].name}</option>`
            }
        }
    ).catch(err => console.log(err))
    breedSelectHandler()  
}



initialLoad()


//Part2

// await axios.get(`${BASE_URL}/breeds/${breedInfo}`
// const carousel = document.getElementsByClassName('carousel')

// let breedSelectHandler = async function (e){
//     let breedInfo = breedSelect.value;
//     console.log(breedInfo);
//     await axios.get(`${BASE_URL}images/search?breed_ids=${breedInfo}`).then(res => {
//         // console.log(res);
//         const images = res.data;
//         for(let i=0; i<images.length; i++){
//             carousel.appendCarousel(carousel.createCard(images[i].url, images[i].id))
//             infoDump.innerHTML += `<h2>${images[i].breeds[0].name}</h2>`
//             infoDump.innerHTML += `<p>${images[i].breeds[0].description}</p>`
//             infoDump.innerHTML += `<p>${images[i].breeds[0].temperament}</p>`
//             infoDump.innerHTML += `<p>${images[i].breeds[0].origin}</p>`
//             infoDump.innerHTML += `<p>${images[i].breeds[0].life_span}</p>`
//         }
//     }).catch(err => console.log(err))
// }


breedSelect.addEventListener("change", breedSelectHandler)

async function breedSelectHandler() {
    const selected = breedSelect.value 
    let response = await axios(
        `https://api.thecatapi.com/v1/images/search?limit=25&%breed_ids=${selected}`,
        { onDownloadProgress: updateProgress }
    ) 
    
    let images = await response.data;
    console.log("images", images)
    gallery(images)
}

async function gallery(images, favorites){
    Carousel.clear();
    images.forEach((image) => {
        let item = Carousel.createCarouselItem(
           image.url,
           breedSelect.value,
           image.id 
        )
        Carousel.appendCarousel(item)
    })

    console.log(images[0])

    if (favorites){
        console.log("favorites")
        infoDump.innerHTML = `
        <h2>favorites<h2>`
    } else if (images[0]){
        console.log("images found")
        infoDump.innerHTML = `
        <h2>${images[0].breeds[0].name}</h2>
        <p>Description: ${images[0].breeds[0].description}</p>
        <p>Temperament: ${images[0].breeds[0].temperament}</p>
        <p>Origin: ${images[0].breeds[0].origin}</p>`
    } else{
        infoDump.innerHTML = "<div class ='text-center'>Information not found</div>"
    }

    Carousel.start()
}



//Part 3, 4, and 5
axios.interceptors.request.use(function (config) {
    progressBar.style.width = "0%"
    config.metadata = { startTime: new Date()}
    document.body.style.cursor = "progress"
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response) {
 
    response.config.metadata.endTime = new Date()
    response.duration = response.config.metadata.endTime - response.config.metadata.startTime
    return response;
  }, function (error) {
    error.config.metadata.endTime = new Date();
    error.duration = error.config.metadata.endTime - error.config.metadata.startTime;
    document.body.style.cursor = "default"
    return Promise.reject(error);
  });



//Part 6

function updateProgress(ProgressEvent){
    console.log(ProgressEvent)

    progressBar.style.width = "100%"
}



/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
  // your code here



}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */


/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
