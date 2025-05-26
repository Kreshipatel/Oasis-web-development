function convertTemp() {
  const tempInput = document.getElementById("temperature").value;
  const unit = document.getElementById("unit").value;
  const resultDiv = document.getElementById("result");

  const temp = parseFloat(tempInput);

  if (isNaN(temp)) {
    resultDiv.textContent = "❌ Please enter a valid number!";
    resultDiv.style.color = "#d63031";
    return;
  }

  let converted, outputUnit;

  if (unit === "celsius") {
    converted = (temp * 9 / 5) + 32;
    outputUnit = "°F";
  } else {
    converted = (temp - 32) * 5 / 9;
    outputUnit = "°C";
  }

  resultDiv.style.color = "#0984e3";
  resultDiv.textContent = `✅ Converted Temperature: ${converted.toFixed(2)} ${outputUnit}`;
}
