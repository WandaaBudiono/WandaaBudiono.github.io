document.addEventListener('DOMContentLoaded', function () {

	let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bss-tooltip]'));
	let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl);
	})

	let charts = document.querySelectorAll('[data-bss-chart]');
	for (let chart of charts) {
		chart.chart = new Chart(chart, JSON.parse(chart.dataset.bssChart));
	}
}, false);