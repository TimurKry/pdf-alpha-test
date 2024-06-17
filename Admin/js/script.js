document.addEventListener('DOMContentLoaded', function() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const mainContent = document.querySelector('.main-content');

    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.dataset.section;
            updateContent(section);
        });
    });

    mainContent.addEventListener('click', function(event) {
        const card = event.target.closest('.document-link');
        if (card) {
            window.location.href = '/PDF_reading_and_filling/form.html';
            //window.location.href='http://localhost:3000/';
        }
    });

    function updateContent(section) {
        let content = '';

        switch(section) {
            case 'Мой профиль':
                content = '<h1>Мой профиль</h1><p>Здесь отображается информация о вашем профиле.</p>' +
                    '<div class="card"><span class="material-icons">account_circle</span><div><strong>Имя:</strong> Иван Иванов</div></div>' +
                    '<div class="card"><span class="material-icons">email</span><div><strong>Email:</strong> ivanov@example.com</div></div>';
                break;
            case 'Документы для заполнения':
                content = '<h1>Документы для заполнения</h1>' +
                    '<div class="card document-link"><span class="material-icons">description</span><div>Документ 1</div></div>';
                break;
            case 'Заполненные документы':
                content = '<h1>Заполненные документы</h1>' +
                    '<div class="card"><span class="material-icons">assignment_turned_in</span><div>Документ 1</div></div>';
                break;
            case 'Настройки':
                content = '<h1>Настройки</h1><p>Здесь вы можете изменить настройки вашей учетной записи.</p>' +
                    '<div class="card"><span class="material-icons">vpn_key</span><div>Изменить пароль</div></div>' +
                    '<div class="card"><span class="material-icons">notifications</span><div>Управление уведомлениями</div></div>';
                break;
            case 'Выход из системы':
                content = '<h1>Выход из системы</h1><p>Вы вышли из системы.</p>';
                break;
            default:
                content = '<h1>Добро пожаловать!</h1><p>Выберите опцию в меню для начала работы.</p>';
        }

        mainContent.innerHTML = content;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const mainContent = document.querySelector('.main-content');
    const documentLinks = document.querySelectorAll('.document-link');

    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.dataset.section;
            updateContent(section);
        });
    });

    documentLinks.forEach(link => {
        link.addEventListener('click', () => {
            window.location.href = '/';
        });
    });

    function updateContent(section) {
        let content = '';

        switch(section) {
            case 'Мой профиль':
                content = '<h1>Мой профиль</h1><p>Здесь отображается информация о вашем профиле.</p>' +
                    '<div class="card"><span class="material-icons">account_circle</span><div><strong>Имя:</strong> Иван Иванов</div></div>' +
                    '<div class="card"><span class="material-icons">email</span><div><strong>Email:</strong> ivanov@example.com</div></div>';
                break;
            case 'Документы для заполнения':
                content = '<h1>Документы для заполнения</h1>' +
                    '<div class="card"><span class="material-icons">description</span><div class="document-link">Документ 1</div></div>';
                break;
            case 'Заполненные документы':
                content = '<h1>Заполненные документы</h1>' +
                    '<div class="card"><span class="material-icons">assignment_turned_in</span><div>Документ 1</div></div>' +
                    '<div id="download-link" style="display:block;">' +
                    '<a href="/uploads/Filled_BIG_Mitgliedsantrag.pdf" download="Filled_BIG_Mitgliedsantrag.pdf">Скачать заполненный документ</a>' +
                    '</div>';
                break;
            case 'Настройки':
                content = '<h1>Настройки</h1><p>Здесь вы можете изменить настройки вашей учетной записи.</p>' +
                    '<div class="card"><span class="material-icons">vpn_key</span><div>Изменить пароль</div></div>' +
                    '<div class="card"><span class="material-icons">notifications</span><div>Управление уведомлениями</div></div>';
                break;
            case 'Выход из системы':
                content = '<h1>Выход из системы</h1><p>Вы вышли из системы.</p>';
                break;
            default:
                content = '<h1>Добро пожаловать!</h1><p>Выберите опцию в меню для начала работы.</p>';
        }

        mainContent.innerHTML = content;
    }
});
