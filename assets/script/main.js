// check file is correct format or not [CSV format]--->
const file = document.getElementById('file');
file.addEventListener('change', () => {
    let filename = file.value;
    let extension = filename.split('.').pop().toLowerCase();
    if ("csv" !== extension) {
        file.value = "";
        alert('Please Enter CSV file')
    }

})