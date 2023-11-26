var apiURL="https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_EGuAPasbAIfCCVDKvZUdyHVj84sr5NHSHPmUvo20fZfTsYrcx6lvskBcJVCq921K";
let pageSize=1;
let currentPage=1;
let animal_details=[];


async function getData(){
    const response = await fetch(apiURL);        
    if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        else{
            return await response.json();
            }
        }
        getData().then((data)=>{
            animal_details=data;
            console.log(animal_details)
            }).catch((error)=>console.log("Error",error))


            async function renderTable(){
                await getData()
            
                var details="";
                //console.log(animal_details)
                animal_details.filter((row,index)=>{
                    let start=(currentPage-1)*pageSize;
                    let end=currentPage*pageSize;
            
                    if(index >= start && index < end) return true;
                }).forEach(animal_details => {
                    details += "<tr>"
                    details += `<td><img src="${animal_details.url}" id="imgItem"></td>`
                    details += `<td><p>CAT ID:${animal_details.id}</p>
                                    <p>CAT HEIGHT:${animal_details.height}</p>
                                    <p>CAT WIDTH:${animal_details.width}</p>
                    </td>`
                    "<tr>"
                })
                document.getElementById("listItems").innerHTML=details
            }
            renderTable();


            function previousPage(){
                if (currentPage > 1) 
                    --currentPage;
                    renderTable();
            }
            function nextPage(){
                if((currentPage*pageSize)<animal_details.length)
                currentPage++;
                renderTable();
            }
