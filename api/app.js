let selectedCategory = 1000;
let sortByView = false;
const sortButton = document.getElementById('sort-btn')

const catagoryButton = async () => {

    const url = `https://openapi.programming-hero.com/api/videos/categories`;
    const res = await fetch(url);
    const {data} = await res.json();

    const catagoryButton = document.getElementById('catagory_Button_Section');

    data.forEach(element => {
        const categoryId =element.category_id;
        const newButton = document.createElement('button');

        newButton.innerText = element.category;
        newButton.classList.add('px-5','py-2','bg-[rgba(37,37,37,0.15)]','catagory-btn','rounded-md');
        newButton.addEventListener('click',() => {

        sortButton.classList.remove('bg-[#FF1F3D]','text-white');
        sortButton.classList.add('bg-[rgba(37,37,37,0.20)]');

            fetchDataByCatagory(categoryId)
            const catagoryAllButtons = document.querySelectorAll('.catagory-btn');

            for(let btn of catagoryAllButtons){
                btn.classList.remove('bg-[#FF1F3D]')
                btn.classList.add('bg-[rgba(37,37,37,0.15)]')
                btn.classList.remove('text-white');
            }

            newButton.classList.remove('bg-[rgba(37,37,37,0.15)]');
            newButton.classList.add('bg-[#FF1F3D]','text-white');
        });
        catagoryButton.appendChild(newButton);
    });
}




const fetchDataByCatagory = async (id,sortByView) =>{
    selectedCategory = id;
    const url = `https://openapi.programming-hero.com/api/videos/category/${id}`
    const res = await fetch(url);
    const {data} = await res.json();

    // console.log(id);
    const videoSection = document.getElementById('video_section');
    const nothingFound = document.getElementById('nothing_found_section');
    console.log(data);
    if(sortByView){

       const sortVideo = data.sort((a,b) => {
            const totalViewsFirst = a.others.views
            const totalViewsSecond = b.others.views
            const totalViewsFirstNumbers = parseFloat(totalViewsFirst.replace('K','')) || 0 ;
            const totalViewsSecondNumbers = parseFloat(totalViewsSecond.replace('K','')) || 0 ;
            return totalViewsSecondNumbers - totalViewsFirstNumbers;
            // a.others.views - b.others.views
        });
        // console.log(sortVideo);
    }
    if(data.length === 0){
        nothingFound.classList.remove('hidden');
    }
    else{
        nothingFound.classList.add('hidden');
    }

    videoSection.textContent ='';
    data.forEach(element => {
        let time = false;
        // console.log(element);
        const perVideoSection = document.createElement('div');
        
        perVideoSection.innerHTML = `
            <div class="h-[370px] border rounded-xl p-5">
                <div class="relative">
                    <img class="w-[312px] h-[200px] rounded-lg" src="${element.thumbnail}" alt="">
                    ${time ? '<p>hello</p>': '' }
                    <p class="bg-[#171717] text-white p-1 text-xs font-normal absolute bottom-0 right-0 rounded mr-4 mb-2">${Math.floor(element.others.posted_date / 3600) ? Math.floor(element.others.posted_date / 3600) + 'hrs' : ''}  ${Math.floor((element.others.posted_date % 3600) / 60) ? Math.floor((element.others.posted_date % 3600) / 60) + 'min' : ''} </p>
                </div>
                <div class="flex mt-5 gap-x-3">
                    <div class="w-10 h-10">
                        <img class="rounded-full" src="${element.authors[0].profile_picture}" alt="">
                    </div>
                    <div class=" flex flex-col gap-y-4">
                        <h3 class="text-base text-[#171717] font-bold ">${element.title}</h3>
                        <p class="flex items-center gap-x-2 text-[rgba(23,23,23,0.70)]">${element.authors[0].profile_name}<span><img src="img/fi_10629607.png" alt=""></span></p>
                        <p class="text-[rgba(23,23,23,0.70)]">${element.others.views}</p>
                    </div>
                </div>
            </div>
        `;
        videoSection.appendChild(perVideoSection);
    });
    
}

let buttonClick = false;

const sortBy = () => {
    sortByView = true;
    fetchDataByCatagory(selectedCategory,sortByView);
    sortButton.classList.remove('bg-[rgba(37,37,37,0.20)]')
    sortButton.classList.add('bg-[#FF1F3D]','text-white')
}
    

    // console.log(id);
catagoryButton()
fetchDataByCatagory(selectedCategory)