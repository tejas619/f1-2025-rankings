
async function loadStandings(){
  try{
    const res = await fetch('data/standings.json', {cache:'no-store'});
    const data = await res.json();
    renderDrivers(data.drivers);
    renderConstructors(data.constructors);
  }catch(e){
    console.error('Failed to load standings.json', e);
  }
}

function renderDrivers(list){
  const tbody = document.querySelector('#drivers-table tbody');
  tbody.innerHTML = '';
  list.sort((a,b)=>a.position - b.position).forEach(row=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.position}</td><td>${row.name}</td><td>${row.team}</td><td><strong>${row.points}</strong></td>`;
    tbody.appendChild(tr);
  });
}

function renderConstructors(list){
  const tbody = document.querySelector('#constructors-table tbody');
  tbody.innerHTML = '';
  list.sort((a,b)=>a.position - b.position).forEach(row=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.position}</td><td>${row.team}</td><td><strong>${row.points}</strong></td>`;
    tbody.appendChild(tr);
  });
}

// UET Conversion Tracking
function trackDonationClick(amount) {
  if (typeof window.uetq !== 'undefined') {
    window.uetq.push('event', 'donation_click', {
      'event_category': 'engagement',
      'event_label': amount ? `$${amount}` : 'custom',
      'event_value': amount || 0
    });
  }
}

function trackDonationConversion(amount) {
  if (typeof window.uetq !== 'undefined') {
    window.uetq.push('event', 'donation_complete', {
      'revenue_value': amount || 0,
      'currency': 'USD'
    });
  }
}

// Set up donation button tracking
function initDonationTracking() {
  const donateBtn = document.getElementById('donate-btn');
  if (donateBtn) {
    donateBtn.addEventListener('click', function(e) {
      trackDonationClick();
      // Open in new tab and redirect to thank you page after delay
      setTimeout(() => {
        // Store that user initiated donation for thank you page
        sessionStorage.setItem('donation_initiated', 'true');
      }, 100);
    });
  }

  // Amount button tracking
  const amountBtns = document.querySelectorAll('.amount-btn');
  amountBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const amount = this.getAttribute('data-amount');
      trackDonationClick(amount);
      // Open Buy Me a Coffee with pre-selected amount in new tab
      const url = `https://www.buymeacoffee.com/tejas619?amount=${amount}`;
      window.open(url, '_blank');
      // Store donation for potential conversion tracking
      sessionStorage.setItem('donation_initiated', 'true');
      sessionStorage.setItem('donation_amount', amount);
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  loadStandings();
  initDonationTracking();
});
