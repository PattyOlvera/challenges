function ageInDays(){
    let birthYear = prompt("What year were you born?");
    days = (2021 - birthYear) * 365;
    document.getElementById("resultYear").innerHTML =  '<h3 class="display-6">You have lived ' + days + ' days</h3>';
}

function reset(){
    document.getElementById("resultYear").innerHTML = "";
}