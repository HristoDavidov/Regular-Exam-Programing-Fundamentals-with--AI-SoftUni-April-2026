// Chart Data
let chart = null;

function initChart() {
    const ctx = document.getElementById('barChart').getContext('2d');
    
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
            datasets: [
                {
                    label: 'Prospects',
                    data: [45, 35, 70, 85, 95, 105],
                    backgroundColor: 'rgba(100, 181, 246, 0.6)',
                    borderColor: 'rgba(100, 181, 246, 1)',
                    borderRadius: 4,
                    borderSkipped: false
                },
                {
                    label: 'Leads',
                    data: [15, 12, 25, 30, 35, 40],
                    backgroundColor: 'rgba(129, 199, 132, 0.6)',
                    borderColor: 'rgba(129, 199, 132, 1)',
                    borderRadius: 4,
                    borderSkipped: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#b0bec5',
                        padding: 15,
                        font: {
                            size: 12,
                            weight: '500'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleColor: '#fff',
                    bodyColor: '#e0e0e0',
                    borderColor: 'rgba(100, 181, 246, 0.5)',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 120,
                    ticks: {
                        color: '#90a4ae',
                        font: {
                            size: 11
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: '#90a4ae',
                        font: {
                            size: 11
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Slider Event Listeners
document.getElementById('leadRate').addEventListener('input', function() {
    document.getElementById('leadRateValue').textContent = this.value + '.00%';
    updateMetrics();
});

document.getElementById('prospectRate').addEventListener('input', function() {
    document.getElementById('prospectRateValue').textContent = this.value + '.00%';
    updateMetrics();
});

// Form Input Event Listeners
document.getElementById('revenue').addEventListener('input', updateMetrics);
document.getElementById('avgOrder').addEventListener('input', updateMetrics);
document.getElementById('campStart').addEventListener('change', updateMetrics);
document.getElementById('campEnd').addEventListener('change', updateMetrics);

// Update Metrics Based on Inputs
function updateMetrics() {
    const revenue = parseFloat(document.getElementById('revenue').value) || 0;
    const avgOrder = parseFloat(document.getElementById('avgOrder').value) || 1;
    const leadRate = parseFloat(document.getElementById('leadRate').value) || 0;
    const prospectRate = parseFloat(document.getElementById('prospectRate').value) || 0;

    // Calculate totals
    const totalOrders = Math.floor(revenue / avgOrder);
    const totalLeads = Math.floor(totalOrders * (leadRate / 100));
    const totalCustomers = Math.floor(totalLeads * (prospectRate / 100));

    // Update card numbers
    document.getElementById('prospectNum').textContent = totalOrders;
    document.getElementById('leadsNum').textContent = totalLeads;
    document.getElementById('customersNum').textContent = totalCustomers;

    // Update progress bars
    const leadsPercentage = totalOrders > 0 ? (totalLeads / totalOrders) * 100 : 0;
    const customersPercentage = totalLeads > 0 ? (totalCustomers / totalLeads) * 100 : 0;

    document.querySelectorAll('.metric-card')[1].querySelector('.progress-bar').style.width = leadsPercentage + '%';
    document.querySelectorAll('.metric-card')[2].querySelector('.progress-bar').style.width = customersPercentage + '%';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initChart();
    updateMetrics();
});
