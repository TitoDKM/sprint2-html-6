document.getElementById('search-input').addEventListener('keyup', handleSearch);

function handleSearch(e) {
	const filter = e.target.value.toLowerCase();
	let students = document.getElementById('table-body').getElementsByTagName('tr');

	for(let i = 0; i < students.length; i++) {
		let hasMatch = false;
		
		let fields = students[i].getElementsByTagName("td");
		for(let j = 0; j < fields.length; j++) {
			const fieldText = fields[j].innerText.toLowerCase();
			if(fieldText.indexOf(filter) > -1)
				hasMatch = true;
		}

		if(hasMatch)
			students[i].style.display = "";
		else
			students[i].style.display = "none";
	}
}

const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

// do the work...
document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
    const table = document.getElementById('table-body');
    Array.from(table.querySelectorAll('tr:nth-child(n+1)'))
        .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
        .forEach(tr => table.appendChild(tr) );
})));