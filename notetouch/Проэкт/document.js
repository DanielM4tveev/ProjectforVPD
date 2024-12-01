document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем отправку формы

    const answers = {
        q1: 'const C',
        q2: 't=tg(x/2)',
        q3: 'x+C',
        q4: 'промежуток, на котором необходимо проинтегрировать функцию',
        q5: 'операция нахождения интеграла',
        q6: 'формулы Ньютона - Лейбница',
        q7: ' когда подынтегральное выражение содержит множители функций ln(x); arccos(x); arcsin (x)',
        q8: '-cos(x)+C',
        q9: '-4',
        q10: '4х-х^2/2 + C'
    };

    let score = 0;
    const totalQuestions = Object.keys(answers).length;
    let feedback = '';

    // Проверяем ответы
    for (let i = 1; i <= totalQuestions; i++) {
        const userAnswer = document.querySelector(`input[name="q${i}"]:checked`);
        if (userAnswer) {
            if (userAnswer.value === answers[`q${i}`]) {
                score++;
            } else {
                feedback += `Вопрос ${i}: ваш ответ "${userAnswer.value}", правильный ответ "${answers[`q${i}`]}".<br>`;
            }
        } else {
            feedback += `Вопрос ${i}: вы не ответили на вопрос.<br>`;
        }
    }

    // Выводим результат
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Вы ответили правильно на ${score} из ${totalQuestions} вопросов.<br><br>${feedback}`;
});