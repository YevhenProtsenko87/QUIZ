'use strict';

const main = document.querySelector('.main');
const selection = document.querySelector('.selection');
const title = document.querySelector('.main__title');

const getData = () => {
    const dataBase = [
        {
            id: '01',
            theme: 'Тема01',
            result: [
                [40, 'Есть задатки, нужно развиватся'],
                [80, 'Очень хорошо, но есть проблемі'],
                [100, 'Отличній результат']
            ],
            list: [
                {
                    type: 'checkbox',
                qestion: 'Вопрос1',
                answers: ['правильный1', 'правильный2', 'неправильный', 'неправильный'],
                correct: 2,
                },
                {
                    type: 'radio',
                qestion: 'Вопрос2',
                answers: ['правильный1', 'неправильный', 'неправильный', 'неправильный'],
                },
                {
                    type: 'checkdox',
                qestion: 'Вопрос3',
                answers: ['правильный1', 'правильный2', 'неправильный', 'неправильный'],
                correct: 2,
                },
                {
                    type: 'checkdox4',
                qestion: 'Вопрос',
                answers: ['правильный1', 'правильный2', 'неправильный', 'неправильный'],
                correct: 3,
                },
                {
                    type: 'checkdox5',
                qestion: 'Вопрос',
                answers: ['правильный1', 'неправильный', 'неправильный', 'неправильный'],
                correct: 1,
                },
                {
                    type: 'checkdox6',
                qestion: 'Вопрос',
                answers: ['правильный1', 'правильный2', 'неправильный', 'неправильный'],
                correct: 2,
                },
                {
                    type: 'checkdox7',
                qestion: 'Вопрос',
                answers: ['правильный1', 'правильный2', 'неправильный', 'неправильный'],
                correct: 2,
                },
            ]
        },
        {
            id: '02',
            theme: 'Тема02',
            result: [
                [30, 'Есть задатки, нужно развиватся'],
                [60, 'Очень хорошо, но есть проблемі'],
                [100, 'Отличній результат']
            ],
            list: [
                {
                    type: 'radio',
                qestion: 'Вопрос',
                answers: ['правильный1', 'правильный2', 'неправильный', 'неправильный'],
                },
                {
                    type: 'radio',
                qestion: 'Вопрос',
                answers: ['правильный1', 'неправильный', 'неправильный', 'неправильный'],
                },
                {
                    type: 'checkdox',
                qestion: 'Вопрос',
                answers: ['правильный1', 'правильный2', 'неправильный', 'неправильный'],
                correct: 2,
                },
                {
                    type: 'checkdox',
                qestion: 'Вопрос',
                answers: ['правильный1', 'правильный2', 'неправильный', 'неправильный'],
                correct: 3,
                },
                {
                    type: 'checkdox',
                qestion: 'Вопрос',
                answers: ['правильный1', 'неправильный', 'неправильный', 'неправильный'],
                correct: 1,
                },
                {
                    type: 'checkdox',
                qestion: 'Вопрос',
                answers: ['правильный1', 'правильный2', 'неправильный', 'неправильный'],
                correct: 2,
                },
            ]
        },
    ];
    return dataBase
}

const hideElem = elem => {
    let opacity = getComputedStyle(elem).getPropertyValue('opacity');

    const animation = () => {
        opacity -= 0.05;
        elem.style.opacity = opacity;

        if (opacity > 0) {
            requestAnimationFrame(animation)
        } else {
            elem.style.display = 'none';
        }
    };
    requestAnimationFrame(animation);
};

const renderTheme = themes => {
    const list = document.querySelector('.selection__list');
    list.textContent = '';

    const buttons = [];

    for (let i = 0; i < themes.length; i += 1) {
        const li = document.createElement('li');
        li.className = 'selection__item';

        const button = document.createElement('button');
        button.className = 'selection__theme';
        button.dataset.id = themes[i].id;
        button.textContent = themes[i].theme;

        li.append(button);
        list.append(li);

        buttons.push(button);
    }
    return buttons;
};

const createAnswer = data => {
    const type = data.type;

    return data.answers.map(item => {
        const lable = document.createElement('label');
        lable.className = 'answer';

        const input =  document.createElement('input');
        input.type = type;
        input.name = 'answern';
        input.className = `answer__${type}`;

        const text = document.createTextNode(item);

        lable.append(input, text);

        return lable;
    });
}

const renderQuiz = quiz => {
    hideElem(title);
    hideElem(selection);

    const questionBox = document.createElement('div');
    questionBox.className = 'main__box main__box_question';
    
    main.append(questionBox);

    let qestionCount = 0;

    const showQustion = () => {
        const data = quiz.list[qestionCount];
        qestionCount += 1;

        questionBox.textContent = '';

        const form = document.createElement('form');
        form.className = 'main__form-question';
        form.dataset.count = `${qestionCount}/${quiz.list.length}`;

        const fieldset = document.createElement('fieldset');
        const legend = document.createElement('legend');
        legend.className = 'main__subtitle';
        legend.textContent = data.qestion;

        const answers = createAnswer(data);

        const button = document.createElement('button');
        button.className = 'main__btn qustion__next';
        button.type = 'sudmit';
        button.textContent = 'Подтвердить';

        fieldset.append(legend, ...answers);
        form.append(fieldset, button);

        questionBox.append(form);

        form.addEventListener('submit', () => {
            submit.preventDefault();

            let ok = false;
            const answer = [...form.answer].map(imput => {
                if (imput.checked) ok = true;
                return imput.checked ? imput.value : false;
            });
            if (ok) {
                console.log(answer);
            } else {
                console.error('no answer');
            }
        })
    };
    showQustion();
};

const addClick = (buttons, data) => {
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const quiz = data.find(item => item.id === btn.dataset.id);
            renderQuiz(quiz)
        });
    })
};

const initQuiz = () => {

    const data = getData();
    const buttons = renderTheme(data);

    addClick(buttons, data);

};

initQuiz();
