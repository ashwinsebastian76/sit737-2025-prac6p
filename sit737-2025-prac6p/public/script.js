async function calculate() {
    const val1 = document.getElementById('value1').value;
    const val2 = document.getElementById('value2').value;
    const operation = document.getElementById('operation').value;

    try {
        const response = await fetch(`/${operation}?value1=${val1}&value2=${val2}`);
        const data = await response.json();

        if (response.ok) {
            document.getElementById('result').innerText =
                `${data.value1} ${operation} ${data.value2} = ${data.output}`;
        } else {
            document.getElementById('result').innerText = `Error: ${data.error}`;
        }
    } catch (err) {
        document.getElementById('result').innerText = `Error: Could not connect to backend`;
    }
}
