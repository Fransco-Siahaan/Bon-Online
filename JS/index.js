// Button Tambah
const dataBon = document.getElementById('dataBon');
const tmblBtn = document.getElementById('tombolBTN');

// Function untuk menampilkan form input bon baru
function add() {
    dataBon.classList.add('openBox');
    tmblBtn.classList.add('openBtn');
}

// Tambah list Bon
const added = document.getElementById('added');
const bon = document.getElementById('bon');
const noteBon = document.getElementById('listbon');
const warning = document.createElement('p');

added.onclick = function () {
    const listBon = bon.value.trim();

    if (listBon === '') {
        warning.classList.add('warning-text');
        warning.textContent = 'Catatan Kosong!';
        noteBon.appendChild(warning);
    } else {
        const li = document.createElement('li');
        li.textContent = listBon;
        li.classList.add('list-bon');
        noteBon.appendChild(li);
        bon.value = '';
        warning.remove();
    }
};

// Batal bon
const batalBon = document.getElementById('batalBon');
batalBon.addEventListener('click', function () {
    dataBon.classList.remove('openBox');
    noteBon.innerHTML = '';
    nama.value = '';
    warning.remove();
});

// Delete bon
const deletebon = document.getElementById('hapus-note');
deletebon.addEventListener('click', function () {
    dataBon.classList.remove('openBox');
    warning.remove();
});

// Simpan Bon dan Hasil Bon
const hasilBon = document.getElementById('hasilbon');
const simpanBon = document.getElementById('simpanBon');
const nama = document.getElementById('Nama');

simpanBon.onclick = function () {
    const name = nama.value.trim();
    
    if (name === '' || noteBon.innerHTML === '') {
        warning.textContent = 'Tolong DI ISI!';
        warning.classList.add('warning-text');
        noteBon.appendChild(warning);
    } else {
        const divBon = document.createElement('div');
        divBon.classList.add('new');

        const h1 = document.createElement('h1');
        h1.textContent = name;
        h1.classList.add('org');
        divBon.appendChild(h1);

        const icon = document.createElement('span');
        icon.textContent = "❌";
        icon.classList.add('Iconsph');
        divBon.appendChild(icon);

        icon.addEventListener('click', function () {
            divBon.remove();
            saveToLocalStorage();  // Update storage setelah hapus item
        });

        Array.from(noteBon.children).forEach(item => {
            const ul = document.createElement('ul');
            ul.classList.add('mt-2', 'pb-2', 'pl-2');
            ul.textContent = item.textContent;
            divBon.appendChild(ul);
        });

        hasilBon.appendChild(divBon);
        saveToLocalStorage();

        dataBon.classList.remove('openBox');
        nama.value = '';
        noteBon.innerHTML = '';
        tmblBtn.classList.remove('openBtn');
    }
};

// Fungsi untuk menyimpan data ke localStorage
function saveToLocalStorage() {
    const bonData = [];
    hasilBon.querySelectorAll('.new').forEach(divBon => {
        const name = divBon.querySelector('.org').textContent;
        const items = Array.from(divBon.querySelectorAll('ul')).map(ul => ul.textContent);
        bonData.push({ name, items });
    });
    localStorage.setItem('bonData', JSON.stringify(bonData));
}

// Fungsi untuk memuat data dari localStorage
function loadFromLocalStorage() {
    const bonData = JSON.parse(localStorage.getItem('bonData'));
    if (bonData) {
        bonData.forEach(data => {
            const divBon = document.createElement('div');
            divBon.classList.add('new');

            const h1 = document.createElement('h1');
            h1.textContent = data.name;
            h1.classList.add('org');
            divBon.appendChild(h1);

            const icon = document.createElement('span');
            icon.textContent = "❌";
            icon.classList.add('Iconsph');
            divBon.appendChild(icon);

            icon.addEventListener('click', function () {
                divBon.remove();
                saveToLocalStorage();
            });

            data.items.forEach(item => {
                const ul = document.createElement('ul');
                ul.classList.add('mt-2', 'pb-2', 'pl-2');
                ul.textContent = item;
                divBon.appendChild(ul);
            });

            hasilBon.appendChild(divBon);
        });
    }
}

// Memuat data saat halaman pertama kali dibuka
window.onload = loadFromLocalStorage;
